import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../index.css'; 

function LoginModal({ onClose }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        "https://lms-backend-1-yx57.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      
      if (response.ok) {
        await login(data.user, data.access_token);
        handleClose();
        setTimeout(() => {
          navigate(data.user.role === "admin" ? "/admin-dashboard" : "/home", {
            replace: true,
          });
        }, 100);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    handleClose();
    navigate('/register', { replace: true });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative transition-transform duration-300 transform ${isVisible ? 'translate-y-0' : 'translate-y-10'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Welcome Back</h2>
        <p className="mb-8 text-center text-gray-600">Log in to access the labs</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6247]"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6247]"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF6247] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className="w-full mt-4 bg-white text-[#FF6247] px-6 py-3 rounded-lg font-semibold border-2 border-[#FF6247] hover:bg-[#FF6247] hover:text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
        >
          Sign Up
        </button>
        <p className="mt-6 text-center text-sm text-gray-500">
          By continuing, you agree to our <a href="#" className="text-[#FF6247] hover:underline">Terms of Service</a> and <a href="#" className="text-[#FF6247] hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default LoginModal;