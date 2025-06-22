import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Mail, RefreshCw, Shield } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

const OTPVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const { email, password, name, role } = (location.state || {}) as {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
  };
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (newOtp.every(digit => digit !== '') && !isLoading) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    if (newOtp.every(digit => digit !== '')) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleVerify = async (otpCode: string) => {
    setIsLoading(true);
    try {
      if (!email) throw new Error('Email is required for OTP verification.');
      // Use Supabase to verify the OTP (email confirmation)
      const { error } = await supabase.auth.verifyOtp({
        email: email, // ensure email is a string
        token: otpCode,
        type: 'signup',
      });
      if (error) throw error;
      // Now register the user in your DB (if needed)
      await register(email ?? '', password ?? '', name ?? '', role ?? '');
      setIsVerified(true);
      setTimeout(() => {
        navigate('/login', { state: { verified: true } });
      }, 1500);
    } catch (err: any) {
      setIsLoading(false);
      alert(err.message || 'OTP verification failed. Please try again.');
      return;
    }
    setIsLoading(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    setCanResend(false);
    setTimeLeft(60);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsResending(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400 to-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-5 blur-3xl"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg"
            >
              <AnimatePresence mode="wait">
                {isVerified ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="shield"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Shield className="w-10 h-10 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
            >
              {isVerified ? 'Verified!' : 'Verify Your Email'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 leading-relaxed"
            >
              {isVerified 
                ? 'Your email has been successfully verified'
                : `We've sent a 6-digit code to`
              }
            </motion.p>
            {!isVerified && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 mt-2"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span className="font-semibold text-gray-800">{email}</span>
              </motion.div>
            )}
          </div>
          <AnimatePresence mode="wait">
            {!isVerified ? (
              <motion.div
                key="otp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* OTP Input */}
                <div className="mb-8">
                  <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, index) => (
                      <motion.input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                  {/* Loading indicator */}
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2 text-indigo-600 mb-4"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </motion.div>
                        <span className="text-sm font-medium">Verifying...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Resend section */}
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    Didn't receive the code?
                  </p>
                  {canResend ? (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={handleResend}
                      disabled={isResending}
                      className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors disabled:opacity-50"
                    >
                      {isResending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Resend Code
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Resend code in{' '}
                      <span className="font-mono font-semibold text-indigo-600">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <p className="text-gray-600 mb-6">
                  Redirecting you to your dashboard...
                </p>
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-2 h-2 bg-indigo-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Back button */}
          {!isVerified && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mt-6 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to login</span>
            </motion.button>
          )}
        </div>
        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60 blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-60 blur-sm"
        />
      </motion.div>
    </div>
  );
};

export default OTPVerification;
