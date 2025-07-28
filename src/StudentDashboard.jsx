import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from './api/userApi';
import { Auth } from 'aws-amplify';

const StudentDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userId = user.username;

        const profile = await fetchUserProfile(userId);
        setUserProfile(profile);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load user profile:", error);
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6 font-raleway">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          {userProfile?.avatar && (
            <img
              src={userProfile.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border border-gray-300"
            />
          )}
          <div>
            <h2 className="text-xl font-bold text-blue-800">
              Welcome, {userProfile?.name || 'Student'}
            </h2>
            <p className="text-gray-600">
              Career Interest: {userProfile?.careerInterest || 'Not set yet'}
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-700">
          <p>This is your personalized dashboard. More features will appear here soon.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
