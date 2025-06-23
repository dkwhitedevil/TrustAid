import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate('/login');
        return;
      }
      const params = new URLSearchParams(location.search);
      const isRegister = params.get('register') === '1';
      const isSignIn = params.get('signin') === '1';
      let role = localStorage.getItem('pending_google_role');
      // Check if profile already exists
      const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (isRegister) {
        if (profile && profile.role) {
          localStorage.setItem('last_google_role', profile.role);
          alert('You are already registered with this Google account as ' + profile.role + '.');
          // Redirect to dashboard
          switch (profile.role) {
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
          return;
        }
        // If not registered, upsert
        if (role && user.user_metadata?.role !== role) {
          await supabase.auth.updateUser({ data: { ...user.user_metadata, role } });
        }
        await supabase.from('profiles').upsert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.user_metadata?.full_name || '',
          role,
        });
        if (role) localStorage.setItem('last_google_role', role);
      } else if (isSignIn) {
        // Sign in: check if user is registered
        if (!profile || !profile.role) {
          alert('No account found for this Google user. Please sign up first.');
          navigate('/login');
          return;
        }
        localStorage.setItem('last_google_role', profile.role);
        role = profile.role;
      } else {
        // Not registration, just sign in
        if (profile && profile.role) {
          localStorage.setItem('last_google_role', profile.role);
          role = profile.role;
        } else {
          // fallback to user metadata
          role = user.user_metadata?.role;
        }
      }
      // Redirect to dashboard
      switch (role) {
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
    };
    handleCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg font-semibold text-gray-700">Signing you in...</div>
    </div>
  );
};

export default OauthCallback;
