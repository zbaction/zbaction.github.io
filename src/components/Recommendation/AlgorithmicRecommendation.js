import React, { useState, useEffect } from 'react';
import BookCard from '../Book/BookCard';
import { useAuth } from '../../context/AuthContext';
import { bookDetails } from '../../data/mockData';
import {
    userBasedCollaborativeFiltering,
    itemBasedCollaborativeFiltering,
    contentBasedRecommendation,
    personalizedPopularityRecommendation,
    knowledgeBasedRecommendation,
    hybridRecommendation,
    deepLearningRecommendation,
    nlpBasedRecommendation,
    seasonalRecommendation,
    readingChallengeRecommendation,
    createMockUserProfile,
    generateMockKnowledgeGraph
} from '../../utils/recommendationAlgorithms';
import './AlgorithmicRecommendation.css';

/**
 * 算法推荐结果组件
 * 基于选定的算法类型，展示对应的书籍推荐结果
 * 
 * @param {String} algorithm 选中的算法ID
 * @param {Array} books 全部书籍数据
 * @param {Number} limit 推荐数量限制
 * @returns {JSX.Element} 推荐结果组件
 */
const AlgorithmicRecommendation = ({ algorithm = 'hybrid', books = [], limit = 10 }) => {
    const { user } = useAuth();
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [explanation, setExplanation] = useState('');
    const [isLimitedPreview, setIsLimitedPreview] = useState(!user);

    // 为演示目的，创建一些模拟数据
    const createMockData = () => {
        // 使用书籍详情中的数据
        const allBooks = Object.values(bookDetails);

        // 创建模拟用户数据
        const mockUsers = [];

        // 创建20个模拟用户
        for (let i = 1; i <= 20; i++) {
            // 随机选择3-8本书作为已读
            const userReadCount = 3 + Math.floor(Math.random() * 6);
            const ratedBooks = [];

            for (let j = 0; j < userReadCount; j++) {
                const randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
                if (!ratedBooks.find(book => book.id === randomBook.id)) {
                    ratedBooks.push({
                        ...randomBook,
                        rating: 3 + Math.random() * 2 // 3-5分
                    });
                }
            }

            mockUsers.push({
                id: `user${i}`,
                name: `用户${i}`,
                ratedBooks
            });
        }

        // 如果有登录用户，则创建模拟的用户阅读数据
        if (user) {
            user.ratedBooks = allBooks
                .filter(() => Math.random() > 0.7) // 随机选择约30%的书
                .map(book => ({
                    ...book,
                    rating: 3 + Math.random() * 2,
                    userRating: 3 + Math.random() * 2
                }));

            // 创建用户兴趣画像
            user.profile = createMockUserProfile(user, allBooks);
        }

        // 创建模拟知识图谱
        const knowledgeGraph = generateMockKnowledgeGraph(allBooks);

        return { allBooks, mockUsers, knowledgeGraph };
    };

    useEffect(() => {
        // 使用模拟数据
        setLoading(true);
        setIsLimitedPreview(!user);

        // 模拟API请求延迟
        setTimeout(() => {
            const { allBooks, mockUsers, knowledgeGraph } = createMockData();

            // 根据选择的算法生成推荐结果
            let results = [];
            let explanationText = '';

            if (user) {
                // 登录用户：完整的个性化推荐
                switch (algorithm) {
                    case 'userCF':
                        results = userBasedCollaborativeFiltering(user, mockUsers, allBooks, limit);
                        explanationText = '基于与您阅读偏好相似的用户喜欢的书籍';
                        break;
                    case 'itemCF':
                        results = itemBasedCollaborativeFiltering(user.ratedBooks, allBooks, limit);
                        explanationText = '根据您喜欢的书籍特征，推荐相似的其他作品';
                        break;
                    case 'content':
                        results = contentBasedRecommendation(user.profile, allBooks, limit);
                        explanationText = '基于您的阅读偏好与书籍内容特征的匹配度';
                        break;
                    case 'knowledge':
                        results = knowledgeBasedRecommendation(user.ratedBooks, knowledgeGraph, allBooks, limit);
                        explanationText = '利用书籍之间的关联关系，为您推荐相关联的优质作品';
                        break;
                    case 'popular':
                        results = personalizedPopularityRecommendation(user.profile, allBooks, limit);
                        explanationText = '结合您的个人偏好与书籍的整体流行度';
                        break;
                    case 'deepLearning':
                        results = deepLearningRecommendation(user.profile, allBooks, limit);
                        explanationText = '采用先进的神经网络算法，深度分析您的阅读模式';
                        break;
                    case 'nlpBased':
                        results = nlpBasedRecommendation(user.profile, allBooks, limit);
                        explanationText = '通过自然语言处理技术，分析书籍内容与您的阅读偏好的语义关联';
                        break;
                    case 'seasonal':
                        results = seasonalRecommendation(user.profile, allBooks, limit);
                        explanationText = '基于当前季节和节日特点，为您推荐应景且符合个人品味的书籍';
                        break;
                    case 'readingChallenge':
                        results = readingChallengeRecommendation(user.profile, user.ratedBooks, allBooks, limit);
                        explanationText = '为您推荐能够拓展阅读范围，提升阅读体验的挑战性书籍';
                        break;
                    case 'hybrid':
                    default:
                        results = hybridRecommendation(user, mockUsers, allBooks, limit);
                        explanationText = '综合多种推荐算法，为您提供最全面的个性化推荐';
                        break;
                }
            } else {
                // 未登录用户：根据算法提供有限的非个性化推荐
                switch (algorithm) {
                    case 'popular':
                        // 热门推荐 - 基于评分和人气
                        results = allBooks
                            .sort((a, b) => {
                                const aPopularity = a.averageRating * a.ratingCount;
                                const bPopularity = b.averageRating * b.ratingCount;
                                return bPopularity - aPopularity;
                            })
                            .slice(0, limit);
                        explanationText = '热门书籍推荐 (登录后可获得个性化推荐)';
                        break;
                    case 'seasonal':
                        // 季节推荐 - 随机选择带有季节标签的书籍
                        const currentSeason = ['春季', '夏季', '秋季', '冬季'][Math.floor(Math.random() * 4)];

                        // 模拟季节相关书籍
                        const seasonalKeywords = {
                            '春季': ['成长', '新生', '希望', '爱情'],
                            '夏季': ['冒险', '旅行', '激情', '青春'],
                            '秋季': ['怀旧', '收获', '思考', '历史'],
                            '冬季': ['内省', '温暖', '家庭', '哲思']
                        };

                        const keywords = seasonalKeywords[currentSeason];

                        // 随机为一些书籍打上季节标签
                        results = allBooks
                            .filter(book => {
                                // 模拟与季节关键词的匹配度
                                const tags = book.tags || [];
                                return tags.some(tag => keywords.includes(tag)) || Math.random() > 0.8;
                            })
                            .sort(() => Math.random() - 0.5)
                            .slice(0, limit);

                        explanationText = `${currentSeason}推荐 (仅展示部分功能，登录后获取完整个性化推荐)`;
                        break;
                    case 'hybrid':
                    default:
                        // 综合推荐 - 组合热门、经典和最新上架
                        const topRated = [...allBooks].sort((a, b) => b.averageRating - a.averageRating).slice(0, 5);
                        const popular = [...allBooks].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 3);
                        const random = [...allBooks].sort(() => Math.random() - 0.5).slice(0, 4);

                        // 合并结果并去重
                        const combinedResults = [];
                        const addedIds = new Set();

                        for (const book of [...topRated, ...popular, ...random]) {
                            if (!addedIds.has(book.id) && combinedResults.length < limit) {
                                combinedResults.push(book);
                                addedIds.add(book.id);
                            }
                        }

                        results = combinedResults;
                        explanationText = '为您推荐的好书 (登录后将获得更个性化的推荐)';
                        break;
                }
            }

            setRecommendedBooks(results);
            setExplanation(explanationText);
            setLoading(false);
        }, 800);
    }, [algorithm, user, limit]);

    // 生成不同算法的推荐结果说明
    const getAlgorithmDescription = () => {
        if (!user) {
            switch (algorithm) {
                case 'popular':
                    return '热门推荐算法根据书籍的平均评分和评价人数，计算出整体受欢迎程度，为您呈现当前最受读者喜爱的优质作品。登录后您将获得结合个人兴趣的热门书籍推荐。';
                case 'seasonal':
                    return '季节性阅读推荐会根据当前的季节、节日和时令特点，推荐应景的书籍。登录后系统将结合您的阅读偏好，提供更符合您个人口味的季节性推荐。';
                case 'hybrid':
                default:
                    return '综合推荐为您精选了高评分、受欢迎和多样化的图书。这只是基础推荐的一小部分功能，登录后您将体验到基于您个人阅读历史和偏好的全面个性化推荐。';
            }
        }

        switch (algorithm) {
            case 'userCF':
                return '基于用户的协同过滤算法通过分析与您阅读偏好相似的用户群体，推荐他们喜欢但您尚未阅读的书籍。这种方法能够发现与您口味相似的读者喜爱的作品。';
            case 'itemCF':
                return '基于物品的协同过滤算法分析书籍之间的相似关系，找出与您已读并喜爱的书籍相似的其他作品。这种方法专注于书籍特征间的联系，为您提供风格相近的阅读体验。';
            case 'content':
                return '基于内容的推荐算法通过深入分析书籍的内容特征（如主题、风格、语言等）与您的阅读偏好进行匹配，精准定位符合您口味的书籍，发现隐藏的优质作品。';
            case 'knowledge':
                return '基于知识图谱的推荐算法利用书籍之间的多维关联关系（如续集、同系列、相似主题等），帮助您在已读书籍的基础上，探索相关联的优质作品。';
            case 'popular':
                return '个性化流行度推荐算法在考虑书籍整体受欢迎程度的同时，结合您的个人偏好，为您推荐既受大众认可又符合您口味的优质书籍。';
            case 'deepLearning':
                return '深度学习推荐算法利用多层神经网络模型，通过从大量用户行为数据中学习复杂的阅读模式和隐含特征，为您提供高度个性化的精准推荐，能够捕捉到传统算法难以发现的模式。';
            case 'nlpBased':
                return '自然语言处理推荐算法通过深入分析书籍文本内容、用户评论和阅读笔记，理解文本的语义信息和情感倾向，发现内容层面的深度关联，为您推荐内容真正相关的优质书籍。';
            case 'seasonal':
                return '季节性阅读推荐算法会根据当前的季节、节日和时令特点，结合您的阅读偏好，推荐既应景又符合您个人口味的书籍，让您的阅读体验与当下的生活氛围相得益彰。';
            case 'readingChallenge':
                return '个性化阅读挑战推荐算法旨在帮助您拓展阅读视野，它会分析您的阅读历史，推荐那些能够适度挑战您当前阅读范围的优质书籍，同时确保这些书籍依然符合您的基础兴趣，以促进您的阅读成长。';
            case 'hybrid':
            default:
                return '智能混合推荐算法综合了多种推荐方法的优点，通过动态调整不同算法的权重，在准确性、多样性和惊喜度之间取得平衡，为您提供最全面的个性化书籍推荐。';
        }
    };

    return (
        <div className="algorithmic-recommendation">
            <div className="recommendation-header">
                <div className="recommendation-title">{algorithm === 'hybrid' ? '智能混合推荐' :
                    algorithm === 'userCF' ? '基于用户的协同过滤推荐' :
                        algorithm === 'itemCF' ? '基于物品的协同过滤推荐' :
                            algorithm === 'content' ? '基于内容的推荐' :
                                algorithm === 'knowledge' ? '基于知识图谱的推荐' :
                                    algorithm === 'popular' ? '热门书籍推荐' :
                                        algorithm === 'deepLearning' ? '深度学习推荐' :
                                            algorithm === 'nlpBased' ? '自然语言处理推荐' :
                                                algorithm === 'seasonal' ? '季节性阅读推荐' :
                                                    '个性化阅读挑战推荐'
                }</div>

                <div className="recommendation-explanation">
                    {explanation}
                </div>

                {isLimitedPreview && (
                    <div className="limited-preview-badge">
                        预览模式
                    </div>
                )}
            </div>

            <div className="algorithm-description">
                <div className="description-icon">
                    {algorithm === 'hybrid' ? '🔍' :
                        algorithm === 'userCF' ? '👥' :
                            algorithm === 'itemCF' ? '📚' :
                                algorithm === 'content' ? '🧩' :
                                    algorithm === 'knowledge' ? '🌐' :
                                        algorithm === 'popular' ? '🔥' :
                                            algorithm === 'deepLearning' ? '🧠' :
                                                algorithm === 'nlpBased' ? '💬' :
                                                    algorithm === 'seasonal' ? '🍂' :
                                                        '🏆'
                    }
                </div>
                <div className="description-text">{getAlgorithmDescription()}</div>
            </div>

            {loading ? (
                <div className="recommendation-loading">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">正在运行{
                        algorithm === 'hybrid' ? '智能混合' :
                            algorithm === 'userCF' ? '用户协同过滤' :
                                algorithm === 'itemCF' ? '物品协同过滤' :
                                    algorithm === 'content' ? '内容分析' :
                                        algorithm === 'knowledge' ? '知识图谱' :
                                            algorithm === 'popular' ? '热门推荐' :
                                                algorithm === 'deepLearning' ? '深度学习' :
                                                    algorithm === 'nlpBased' ? '自然语言处理' :
                                                        algorithm === 'seasonal' ? '季节性' :
                                                            '阅读挑战'
                    }算法...</div>
                </div>
            ) : (
                <div className="recommendation-results">
                    {recommendedBooks.length > 0 ? (
                        <div className="books-grid">
                            {recommendedBooks.map(book => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-recommendations">
                            <div className="no-data-icon">📚</div>
                            <h3>暂无推荐结果</h3>
                            <p>我们无法基于当前数据生成推荐。请尝试阅读并评价更多书籍，或者选择其他推荐算法。</p>
                        </div>
                    )}
                </div>
            )}

            {!user && (
                <div className="login-prompt enhanced">
                    <div className="prompt-icon">🔒</div>
                    <div className="prompt-text">
                        <p><strong>登录解锁所有高级推荐功能</strong></p>
                        <p>当前您只能体验基础推荐算法和有限的推荐内容。登录后您将获得：</p>
                        <ul className="login-benefits">
                            <li>✓ 基于您阅读历史的个性化推荐</li>
                            <li>✓ 9种高级推荐算法（目前仅开放3种）</li>
                            <li>✓ 更准确的兴趣匹配和内容发现</li>
                            <li>✓ 阅读习惯分析和个性化阅读建议</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlgorithmicRecommendation; 