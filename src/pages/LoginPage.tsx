import { Building, Heart, Shield, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // On mount, try to fetch role from localStorage (simulate fetching from user profile after login)
  useEffect(() => {
    if (!isRegister) {
      // In a real app, fetch from Supabase user profile after login
      const savedRole = localStorage.getItem('last_google_role');
      if (savedRole) setUserRole(savedRole);
      else setUserRole(null); // Explicitly clear if not found
    } else {
      setUserRole(null); // Clear userRole when switching to register
    }
  }, [isRegister]);

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    if (isRegister) {
      // Check if user already exists with this Google account
      setLoading(true);
      setErrorMsg(null);
      try {
        // Use Supabase to get the user by email if possible (not possible before OAuth)
        // So, after OAuth, in /oauth-callback, check if user already has a profile
        // Here, just proceed to OAuth, but in /oauth-callback, handle duplicate registration
        if (!role) {
          setErrorMsg('Please select a role before signing up with Google.');
          setLoading(false);
          return;
        }
        localStorage.setItem('pending_google_role', role);
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/oauth-callback?register=1` } });
        if (error) throw error;
      } catch (error: any) {
        setErrorMsg(error.message || 'Google sign-up failed');
      } finally {
        setLoading(false);
      }
      return;
    }
    // Sign in flow
    setLoading(true);
    setErrorMsg(null);
    try {
      // Start OAuth flow
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/oauth-callback?signin=1` } });
      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message || 'Google sign-in failed');
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the transparent donation revolution
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={e => e.preventDefault()}>
          {errorMsg && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-center">
              {errorMsg}
            </div>
          )}
          <div className="space-y-4">
            {/* Show role selection only when registering */}
            {isRegister ? (
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
                        aria-checked={role === roleOption.id}
                        aria-label={roleOption.name}
                      />
                      <div
                        className={`p-4 rounded-lg border-2 transition-all ${
                          role === roleOption.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${role === roleOption.id ? 'ring-2 ring-blue-200' : ''}`}
                        tabIndex={0}
                        role="radio"
                        aria-checked={role === roleOption.id}
                        onClick={() => setRole(roleOption.id)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') setRole(roleOption.id);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${roleOption.color}`}>
                            <roleOption.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{roleOption.name}</div>
                            <div className="text-sm text-gray-500">{roleOption.description}</div>
                          </div>
                        </div>
                        {role === roleOption.id && (
                          <div className="mt-2 text-xs text-blue-600 font-semibold">Selected</div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                {role && (
                  <div className="text-xs text-green-700 font-semibold mt-2">Selected role: {roles.find(r => r.id === role)?.name}</div>
                )}
              </div>
            ) : (
              userRole ? (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Your role:</label>
                  <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50 ring-2 ring-blue-200 flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${roles.find(r => r.id === userRole)?.color}`}>
                      {roles.find(r => r.id === userRole)?.icon && React.createElement(roles.find(r => r.id === userRole)?.icon!)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{roles.find(r => r.id === userRole)?.name}</div>
                      <div className="text-sm text-gray-500">{roles.find(r => r.id === userRole)?.description}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <span className="text-xs text-yellow-700">Please register first to continue with Google sign-in.</span>
                </div>
              )
            )}
          </div>
          {/* Google Sign-In Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.7 30.77 0 24 0 14.82 0 6.71 5.8 2.69 14.09l7.98 6.2C12.36 13.6 17.73 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.29c-1.01-2.99-1.01-6.2 0-9.19l-7.98-6.2C.7 17.23 0 20.53 0 24c0 3.47.7 6.77 1.96 9.1l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.15 15.9-5.85l-7.19-5.6c-2 1.34-4.56 2.13-8.71 2.13-6.27 0-11.64-4.1-13.33-9.6l-7.98 6.2C6.71 42.2 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
              {loading ? (isRegister ? 'Processing...' : 'Signing in...') : (isRegister ? 'Sign up with Google' : 'Sign in with Google')}
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;