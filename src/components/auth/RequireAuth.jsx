import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const RequireAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          setIsAuthenticated(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log('User not authenticated:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? children : null;
};

export default RequireAuth;
