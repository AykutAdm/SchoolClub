import React from 'react';
import { Rocket, LogIn, LogOut, Shield, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Navigation({ 
  currentPage, 
  onPageChange, 
  onLoginClick,
  onLogout
}: NavigationProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      onLogout?.();
      onPageChange('home');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-gray-950 via-blue-950 to-gray-950 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
          {/* Sol Logo */}
          <button 
            onClick={() => onPageChange('home')}
            className="flex items-center group hover:opacity-80 transition-all duration-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 
                     focus:ring-offset-gray-950 rounded-lg px-2 py-1"
          >
            <img 
              src="/images/logo/bkft.png" 
              alt="BKFT Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="ml-3 text-xl font-['Orbitron'] font-bold bg-gradient-to-r from-white via-blue-100 to-white 
                           bg-clip-text text-transparent">
              BKFT Club
            </span>
          </button>

          {/* Orta - Navigasyon Linkleri */}
          <div className="flex space-x-1">
            <button 
              onClick={() => onPageChange('home')} 
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                currentPage === 'home'
                  ? 'bg-blue-950 text-white font-medium'
                  : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => onPageChange('about')} 
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                currentPage === 'about'
                  ? 'bg-blue-950 text-white font-medium'
                  : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
              }`}
            >
              About Us
            </button>
            <button 
              onClick={() => onPageChange('events')} 
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                currentPage === 'events'
                  ? 'bg-blue-950 text-white font-medium'
                  : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
              }`}
            >
              Events
            </button>
            <button 
              onClick={() => onPageChange('announcements')} 
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                currentPage === 'announcements'
                  ? 'bg-blue-950 text-white font-medium'
                  : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
              }`}
            >
              Announcements
            </button>

            {/* Admin Panel */}
            {user?.role === 'admin' && (
              <button 
                onClick={() => onPageChange('admin')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 flex items-center ${
                  currentPage === 'admin'
                    ? 'bg-blue-950 text-white font-medium'
                    : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
                }`}
              >
                <Shield className="h-4 w-4 mr-1.5" />
                Admin Panel
              </button>
            )}
          </div>

          {/* Sağ - Kullanıcı ve Theme */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-blue-950 hover:bg-blue-900 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-yellow-400" />
              ) : (
                <Moon className="h-4 w-4 text-blue-400" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">
                  Welcome, <strong className="text-white">{user.first_name}</strong>
                </span>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center px-3 py-1.5 rounded-lg bg-blue-950 text-white text-sm
                         hover:bg-blue-900 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick} 
                className="flex items-center px-3 py-1.5 rounded-lg bg-blue-950 text-white text-sm
                       hover:bg-blue-900 transition-all duration-300"
              >
                <LogIn className="h-4 w-4 mr-1.5" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
