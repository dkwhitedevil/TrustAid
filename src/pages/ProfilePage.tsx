import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center">You are not logged in.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">Full Name:</span> {user.user_metadata?.full_name || '-'}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {user.user_metadata?.role ? user.user_metadata.role.charAt(0).toUpperCase() + user.user_metadata.role.slice(1) : '-'}
        </div>
        {user.user_metadata?.age && (
          <div>
            <span className="font-semibold">Age:</span> {user.user_metadata.age}
          </div>
        )}
        {user.user_metadata?.bio && (
          <div>
            <span className="font-semibold">Bio:</span> {user.user_metadata.bio}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
