import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgot, setIsForgot] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await Auth.signIn(identifier, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error signing in');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await Auth.forgotPassword(identifier);
      setResetSent(true);
    } catch (err) {
      setError(err.message || 'Error sending reset email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 p-6 font-raleway">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">FuturePath Sign In</h2>

        {!isForgot ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="text"
              placeholder="Username or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsForgot(true)}
              className="w-full text-sm text-blue-600 mt-2 underline hover:text-blue-800"
            >
              Forgot your password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Username or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Send Password Reset Link
            </button>
            {resetSent && <p className="text-green-600 text-sm mt-2">Reset link sent. Check your inbox.</p>}
            <button
              type="button"
              onClick={() => setIsForgot(false)}
              className="text-sm text-gray-500 underline mt-2"
            >
              Back to Sign In
            </button>
          </form>
        )}

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default SignInPage;

