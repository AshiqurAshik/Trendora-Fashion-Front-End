import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';

/* ICONS */
const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" y1="2" x2="22" y2="22"/>
  </svg>
);

const Login = () => {
  const { SignInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Firebase login
      const result = await SignInUser(formData.email, formData.password);
      const user = result.user;

      // 2. Firebase ID token
      const idToken = await user.getIdToken();

      // 3. Send to backend
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          firebase_uid: user.uid,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Backend authentication failed');
      }

      // 4. Save JWT
      localStorage.setItem('token', data.token);

      console.log('Firebase UID:', data.user.firebase_uid);
      console.log('JWT:', data.token);

      // 5. Fetch profile (protected route)
      const profileRes = await fetch('http://localhost:5000/profile', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const profile = await profileRes.json();

      // 6. Role-based redirect
      if (profile?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-1/2 relative bg-stone-900 items-center justify-center p-20"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-stone-950/60 z-10" />
          {!imgError ? (
            <img 
              src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale opacity-40"
              alt="Luxury Fabric"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-stone-900 flex items-center justify-center" />
          )}
        </div>

        <div className="relative z-20 text-center">
          <h2 className="text-white text-3xl font-serif italic">
            Enter the realm of bespoke elegance.
          </h2>
        </div>
      </motion.div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8 bg-stone-950">
        <motion.div className="w-full max-w-md">

          <header className="mb-12">
            <h3 className="text-[#B58D7C] text-[10px] tracking-[0.6em] uppercase mb-4">
              Client Portal
            </h3>
            <h1 className="text-white text-4xl font-serif italic">
              Welcome Back
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Email */}
            <div>
              <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none"
                placeholder="email@example.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none"
                placeholder="••••••••"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-stone-600"
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-stone-950 py-5 text-[10px] font-bold tracking-[0.4em] uppercase"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div key="loading">Loading...</motion.div>
                ) : (
                  <motion.span key="text">Authorize Access</motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              to="/register"
              className="text-center text-stone-600 text-[10px] uppercase tracking-[0.2em] pt-8 block"
            >
              Don't have an account?
              <span className="text-white ml-2">Request Membership</span>
            </Link>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;