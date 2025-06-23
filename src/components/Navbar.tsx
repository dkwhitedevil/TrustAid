import { LogOut, Shield, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [displayUser, setDisplayUser] = useState(user);

  // Only update displayUser after login completes (user context changes)
  useEffect(() => {
    setDisplayUser(user);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              TrustAid
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {displayUser ? (
              <>
                <div className="flex items-center space-x-2">
                  {/* Profile button */}
                  <button
                    onClick={() => navigate('/profile')}
                    className="p-1 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    title="Profile"
                    type="button"
                  >
                    <User className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    {displayUser.user_metadata?.full_name || displayUser.email}
                  </span>
                  {displayUser.user_metadata?.role && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold border border-blue-300">
                      {displayUser.user_metadata.role.charAt(0).toUpperCase() +
                        displayUser.user_metadata.role.slice(1)}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;