# 书籍推荐系统 (Book Recommendation System)

![项目标志](web/public/logo192.png)

## 项目概述

书籍推荐系统是一个基于用户阅读历史和偏好的个性化图书推荐平台。系统利用多种推荐算法，为用户提供量身定制的书籍推荐，帮助用户发现新的优质读物，拓展阅读视野。本系统旨在通过精准的个性化推荐，解决用户在海量书籍中难以找到适合自己的好书的问题。

## 功能特点

### 核心推荐功能
- **多算法推荐**：支持10种不同的推荐算法，包括协同过滤、内容推荐、知识图谱、深度学习等
- **个性化定制**：基于用户阅读历史、评分、收藏等行为进行个性化推荐
- **分类筛选**：支持按文学、社科、经管等多种类别筛选图书
- **排序选项**：支持按评分、上架时间等多种方式排序
- **分页浏览**：支持自定义每页显示数量，便于浏览大量书籍

### 用户功能
- **用户认证**：用户注册、登录、个人资料管理
- **阅读管理**：记录阅读进度、设置阅读目标
- **书籍收藏**：收藏喜欢的书籍，方便后续查看
- **社交互动**：评价、点赞、分享心得

### 数据分析
- **阅读分析**：阅读类别分布、阅读时间分析、阅读速度分析
- **个人统计**：完成书籍统计、阅读时长统计、阅读习惯分析
- **社交互动**：评论、点赞、分享等社交行为分析

### 系统特性
- **响应式设计**：适配各种屏幕尺寸，提供良好的移动端体验
- **主题切换**：支持浅色/深色主题切换
- **多语言支持**：支持中英文界面切换
- **无障碍设计**：符合基本的无障碍设计标准

## 技术栈

### 前端
- **框架**：React 18
- **路由**：React Router 6
- **状态管理**：React Context API
- **UI组件**：自定义组件 + Ant Design
- **图表**：ECharts
- **请求**：Axios

### 推荐算法
- 用户协同过滤 (User-Based Collaborative Filtering)
- 物品协同过滤 (Item-Based Collaborative Filtering)
- 内容推荐 (Content-Based Recommendation)
- 知识图谱推荐 (Knowledge Graph-Based Recommendation)
- 深度学习推荐 (Deep Learning-Based Recommendation)
- 自然语言处理推荐 (NLP-Based Recommendation)
- 智能混合推荐 (Hybrid Recommendation)
- 季节性推荐 (Seasonal Recommendation)
- 热门推荐 (Popularity-Based Recommendation)
- 阅读挑战推荐 (Reading Challenge Recommendation)

## 项目结构

```
/web/
  ├── public/            # 静态资源
  └── src/
      ├── components/    # 组件
      │   ├── Auth/      # 认证相关组件
      │   ├── Book/      # 书籍相关组件
      │   ├── Header/    # 页头组件
      │   ├── Footer/    # 页脚组件
      │   ├── Layout/    # 布局组件
      │   ├── MessageBoard/ # 留言板组件
      │   └── Recommendation/ # 推荐算法组件
      ├── context/       # React Context
      │   ├── AuthContext.js  # 认证上下文
      │   ├── BookContext.js  # 书籍上下文
      │   ├── ThemeContext.js # 主题上下文
      │   └── I18nContext.js  # 国际化上下文
      ├── data/          # 模拟数据
      │   └── mockData.js # 书籍数据
      ├── pages/         # 页面组件
      │   ├── Home/      # 首页
      │   ├── BookRecommendation/ # 书籍推荐页
      │   ├── BookDetail/ # 书籍详情页
      │   ├── BookAnalysis/ # 书籍分析页
      │   ├── Collections/ # 书籍收藏页
      │   ├── ReadingProgress/ # 阅读进度页
      │   ├── UserProfile/ # 用户资料页
      │   ├── MessageBoard/ # 留言板页
      │   ├── Settings/  # 设置页
      │   └── NotFound/  # 404页面
      ├── utils/         # 工具函数
      │   ├── recommendationAlgorithms.js # 推荐算法
      │   └── storage.js # 本地存储
      ├── App.js         # 应用根组件
      ├── index.js       # 入口文件
      └── index.css      # 全局样式
```

## 安装与使用

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装步骤

1. 克隆项目到本地
   ```bash
   git clone <repository-url> book-recommendation-system
   cd book-recommendation-system
   ```

2. 安装依赖
   ```bash
   cd web
   npm install
   ```

3. 启动开发服务器
   ```bash
   npm run start
   ```
   > 注意：在Windows PowerShell中，请使用以下命令替代：
   > ```powershell
   > cd web; npm run start
   > ```
   > 因为PowerShell不支持`&&`作为命令分隔符。

4. 构建生产版本
   ```bash
   npm run build
   ```

### 使用说明

1. **首页**：浏览热门推荐、最新上架的书籍
2. **书籍推荐**：选择推荐算法，获取个性化书籍推荐
   - 传统推荐：基于类别、评分等筛选书籍
   - 算法推荐：基于用户行为和偏好进行个性化推荐
3. **书籍详情**：查看书籍详细信息、添加评论、更新阅读进度
4. **数据分析**：查看阅读统计和分析图表
5. **个人中心**：管理收藏书籍、查看阅读进度、更新个人设置

## 功能模块详解

### 首页模块
首页展示热门推荐、最新上架的书籍，以及个性化推荐内容。用户可以快速浏览热门书籍，发现新书。

### 推荐系统模块
系统核心模块，提供多种推荐算法：
1. **智能混合推荐**：综合多种算法的结果
2. **用户协同过滤**：基于相似用户的喜好
3. **物品协同过滤**：基于书籍间的相似关系
4. **基于内容推荐**：分析书籍内容特征与用户兴趣匹配
5. **知识图谱推荐**：利用书籍间的多维关联关系
6. **热门推荐**：结合流行度和个人偏好
7. **深度学习推荐**：使用神经网络分析复杂阅读模式
8. **语义理解推荐**：通过自然语言处理分析书籍内容
9. **季节性推荐**：根据当前季节和节日特点推荐书籍
10. **阅读挑战推荐**：帮助拓展阅读范围的挑战性书籍

### 书籍详情模块
展示书籍详细信息，包括内容简介、作者信息、出版信息、评分等。用户可以:
- 更新阅读进度
- 添加到收藏
- 评价并评分
- 查看其他用户评论

### 数据分析模块
提供个人阅读数据的可视化分析：
- **类别分布**：展示阅读书籍的类别分布
- **阅读趋势**：展示阅读量的变化趋势
- **时间分布**：分析阅读时间段分布
- **阅读速度**：分析阅读速度变化
- **阅读习惯**：分析阅读习惯特点
- **社交互动**：分析社交行为分布
- **效率分析**：分析阅读效率
- **知识积累**：展示知识积累情况
- **阅读偏好**：分析阅读偏好
- **阅读周期**：分析阅读周期规律

### 用户中心模块
用户个人空间，包括：
- **个人资料**：管理个人信息、偏好设置
- **收藏列表**：管理收藏的书籍
- **阅读进度**：查看所有书籍的阅读进度
- **系统设置**：主题设置、通知设置、阅读目标设置

### 留言板模块
用户可以在留言板上发表意见和建议，与其他用户和管理员交流。

## 开发指南

### 添加新推荐算法
1. 在`src/utils/recommendationAlgorithms.js`中添加新算法实现
2. 在`src/components/Recommendation/AlgorithmSelector.js`中添加算法选项
3. 在`src/components/Recommendation/AlgorithmicRecommendation.js`中添加算法处理逻辑

### 添加新分析图表
1. 在`src/pages/BookAnalysis/BookAnalysis.js`中添加数据处理函数
2. 添加图表配置函数
3. 在渲染函数中添加新图表

### 修改样式主题
主题相关设置位于`src/context/ThemeContext.js`和`src/App.css`中的CSS变量。

### 本地化支持
语言设置和翻译内容位于`src/context/I18nContext.js`中。

## 贡献指南

欢迎贡献代码、报告问题或提出改进建议。请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

## 联系方式

项目维护者: contact@bookrec.com

## 致谢

- 感谢所有开源项目的贡献者
- 特别感谢为本项目提供书籍数据和建议的合作伙伴 