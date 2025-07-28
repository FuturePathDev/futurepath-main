import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    try {
      await Auth.forgotPassword(email);
      setStep(2);
    } catch (error) {
      console.error('Error sending code:', error);
      alert('Failed to send reset code. Make sure the email is correct.');
    }
  };

  const handleResetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      alert('Password reset successful! You can now log in.');
      setStep(1);
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full font-raleway">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Forgot Password
        </h2>

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendCode}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Reset Code
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Reset Code"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
