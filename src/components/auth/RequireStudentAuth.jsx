import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const RequireStudentAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyStudent = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const email = user.attributes.email;

        // Check if this is a student user (you can customize this check)
        if (email && email.includes('student')) {
          setIsAuthenticated(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Student not authenticated:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    verifyStudent();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? children : null;
};

export default RequireStudentAuth;
