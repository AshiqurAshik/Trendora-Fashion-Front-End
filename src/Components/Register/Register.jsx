import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../Auth/AuthContext';
import Swal from 'sweetalert2';

/* ---------- Icons ---------- */

const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M2 12s3-7 10-7 10 7 10 7" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

/* ---------- Component ---------- */

const Register = () => {
  const { createUser, addProfileInfo } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const nextStep = (e) => {
    e.preventDefault();

    if (step === 3 && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);

    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const result = await createUser(formData.email, password);
      const user = result.user;

      await addProfileInfo(`${formData.firstName} ${formData.lastName}`, '');

      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firebase_uid: user.uid,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          role: 'user',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save user in database');
      }

      await Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: 'Your account has been successfully created!',
        background: '#0f0f0f',
        color: '#ffffff',
        confirmButtonColor: '#B58D7C',
      });

      window.location.href = '/';
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.message,
        background: '#0f0f0f',
        color: '#ffffff',
        confirmButtonColor: '#B58D7C',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center"
      >
        <img
          src="https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=80"
          alt="Men Suit Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center">
          <h2 className="text-white text-3xl font-serif italic">
            Join the world of refined fashion.
          </h2>
        </div>
      </motion.div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div className="w-full max-w-md">

          {/* HEADER */}
          <header className="mb-10">
            <h3 className="text-[#B58D7C] text-[10px] tracking-[0.6em] uppercase mb-3">
              Client Portal
            </h3>
            <h1 className="text-white text-4xl font-serif italic">
              Create Account
            </h1>
          </header>

          {/* FORM */}
          <form onSubmit={nextStep} className="space-y-8">

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >

                {step === 1 && (
                  <>
                    <Input label="First Name" onChange={(e)=>setFormData({...formData, firstName: e.target.value})} />
                    <Input label="Last Name" onChange={(e)=>setFormData({...formData, lastName: e.target.value})} />
                    <Input label="Email Address" type="email" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
                  </>
                )}

                {step === 2 && (
                  <>
                    <Input label="Phone Number" onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
                    <Input label="Address" onChange={(e)=>setFormData({...formData, address: e.target.value})} />
                  </>
                )}

                {step === 3 && (
                  <>
                    <PasswordInput
                      label="Password"
                      value={password}
                      show={showPassword}
                      toggle={() => setShowPassword(!showPassword)}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <PasswordInput
                      label="Confirm Password"
                      value={confirmPassword}
                      show={showPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </>
                )}

              </motion.div>
            </AnimatePresence>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-stone-950 py-5 text-[10px] font-bold tracking-[0.4em] uppercase"
            >
              {isLoading ? 'Processing...' : step === 3 ? 'Register' : 'Next'}
            </button>

            {/* ✅ LOGIN LINK ADDED */}
            <div className="mt-6 text-center">
              <p className="text-stone-500 text-sm">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-[#B58D7C] hover:underline font-medium"
                >
                  Login
                </a>
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

/* ---------- Inputs ---------- */

const Input = ({ label, type = 'text', onChange }) => (
  <div>
    <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500">
      {label}
    </label>
    <input
      type={type}
      className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none"
      onChange={onChange}
    />
  </div>
);

const PasswordInput = ({ label, value, show, toggle, onChange }) => (
  <div className="relative">
    <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500">
      {label}
    </label>

    <input
      type={show ? 'text' : 'password'}
      value={value}
      className="w-full bg-transparent border-b border-stone-800 py-3 pr-10 text-white focus:outline-none"
      onChange={onChange}
    />

    <button
      type="button"
      onClick={toggle}
      className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-600"
    >
      {show ? <IconEyeOff /> : <IconEye />}
    </button>
  </div>
);