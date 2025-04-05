import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import BookRecommendation from './pages/BookRecommendation/BookRecommendation';
import BookDetail from './pages/BookDetail/BookDetail';
import BookAnalysis from './pages/BookAnalysis/BookAnalysis';
import MessageBoard from './pages/MessageBoard/MessageBoard';
import NotFound from './pages/NotFound/NotFound';
import UserProfile from './pages/UserProfile/UserProfile';
import Collections from './pages/Collections/Collections';
import ReadingProgress from './pages/ReadingProgress/ReadingProgress';
import Settings from './pages/Settings/Settings';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <ThemeProvider>
          <BookProvider>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/recommendation" element={<BookRecommendation />} />
                  <Route path="/analysis" element={<BookAnalysis />} />
                  <Route path="/books/:id" element={<BookDetail />} />
                  <Route path="/message" element={<MessageBoard />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/reading-progress" element={<ReadingProgress />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BookProvider>
        </ThemeProvider>
      </I18nProvider>
    </AuthProvider>
  );
}

export default App; 