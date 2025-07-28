import axios from 'axios';

const API_URL = 'https://h849e62b41.execute-api.us-east-1.amazonaws.com/dev';

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    return null;
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

