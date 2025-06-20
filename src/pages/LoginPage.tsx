import { Building, Heart, Shield, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.user_metadata?.role) {
      switch (user.user_metadata.role) {
        case 'donor':
          navigate('/donor');
          break;
        case 'beneficiary':
          navigate('/beneficiary');
          break;
        case 'ngo':
          navigate('/ngo');
          break;
        default:
          navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (isLogin) {
        await login(email, password);
        // Check user role from context after login
        let attempts = 0;
        const checkRoleAndRedirect = () => {
          if (user && user.user_metadata?.role) {
            switch (user.user_metadata.role) {
              case 'donor':
                navigate('/donor');
                return;
              case 'beneficiary':
                navigate('/beneficiary');
                return;
              case 'ngo':
                navigate('/ngo');
                return;
              default:
                navigate('/');
                return;
            }
          } else if (attempts < 5) {
            attempts++;
            setTimeout(checkRoleAndRedirect, 200);
          } else {
            navigate('/');
          }
        };
        checkRoleAndRedirect();
      } else {
        await register(email, password, name, role);
        // Navigate to appropriate dashboard after registration
        switch (role) {
          case 'beneficiary':
            navigate('/beneficiary');
            break;
          case 'ngo':
            navigate('/ngo');
            break;
          case 'donor':
            navigate('/donor');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: 'donor',
      name: 'Donor',
      description: 'Fund verified requests and track impact',
      icon: Heart,
      color: 'text-red-600 bg-red-100'
    },
    {
      id: 'beneficiary',
      name: 'Beneficiary',
      description: 'Request aid and get verified support',
      icon: User,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'ngo',
      name: 'NGO Partner',
      description: 'Validate requests and deliver aid',
      icon: Building,
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the transparent donation revolution
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-center">
              {errorMsg}
            </div>
          )}
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full Name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
              />
            </div>

            {/* Only show role selection when registering */}
            {!isLogin && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Select your role:</label>
                <div className="grid gap-3">
                  {roles.map((roleOption) => (
                    <label key={roleOption.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={roleOption.id}
                        checked={role === roleOption.id}
                        onChange={(e) => setRole(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        role === roleOption.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${roleOption.color}`}>
                            <roleOption.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{roleOption.name}</div>
                            <div className="text-sm text-gray-500">{roleOption.description}</div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;