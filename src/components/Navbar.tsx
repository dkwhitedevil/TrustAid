import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, User, Bell, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield className="h-10 w-10 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl group-hover:bg-purple-600/20 transition-colors duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">
                TrustAid
              </span>
              <span className="text-xs text-gray-500 -mt-1">Transparent Giving</span>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                  <div className="relative">
                    <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-xl hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/view-requests"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Browse Requests
                </Link>
                <Link
                  to="/login"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;