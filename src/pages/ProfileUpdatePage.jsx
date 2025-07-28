import React, { useState } from 'react';
import { uploadAvatarToS3 } from '../utils/s3Uploader';

const ProfileUpdatePage = () => {
  const [careerInterest, setCareerInterest] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace with actual userId logic (from context or localStorage)
  const userId = 'user-123';

  const handleCareerChange = (e) => {
    setCareerInterest(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!careerInterest) {
      alert("Please enter your career interest.");
      return;
    }

    setLoading(true);
    let avatarUrl = null;

    try {
      if (avatarFile) {
        avatarUrl = await uploadAvatarToS3(avatarFile, userId);
        if (!avatarUrl) throw new Error("Failed to upload avatar.");
      }

      const payload = {
        userId,
        profile: {
          avatar: avatarUrl || null,
          careerInterest,
        },
      };

      const response = await fetch('https://h849e62b41.execute-api.us-east-1.amazonaws.com/dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        console.error(data);
        alert(data.error || 'Profile update failed.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating your profile.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col items-center justify-center p-6 font-raleway">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Update Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="careerInterest" className="block text-sm font-medium text-gray-700 mb-1">
              Career Interest
            </label>
            <input
              id="careerInterest"
              type="text"
              value={careerInterest}
              onChange={handleCareerChange}
              placeholder="e.g., Software Developer"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Avatar
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            {avatarPreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img src={avatarPreview} alt="Avatar Preview" className="w-32 h-32 rounded-full object-cover border" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
