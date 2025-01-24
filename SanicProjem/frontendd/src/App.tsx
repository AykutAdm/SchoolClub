import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Sayfa geçişleri için ana içerik bileşeni
function AppContent() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage('home');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };

  const renderPage = () => {
    const content = (() => {
      switch (currentPage) {
        case 'about':
          return <AboutPage />;
        case 'events':
          return <EventsPage />;
        case 'announcements':
          return <AnnouncementsPage />;
        case 'admin':
          return user?.role === 'admin' ? <AdminPage /> : <Navigate to="/" replace />;
        default:
          return <HomePage onPageChange={setCurrentPage} />;
      }
    })();

    return <div>{content}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        {renderPage()}
      </main>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginForm onSuccess={() => setIsLoginModalOpen(false)} />
      </Modal>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-gray-100',
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
