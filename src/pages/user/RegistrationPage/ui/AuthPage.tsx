'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import mobileBanner from '@/assets/mobilebanner.png';
import { LoginCard } from './LoginPage';
import { RegisterCard } from './RegisterPage';

export const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 📱 MAIN BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${mobileBanner})`,
          filter: 'brightness(0.85) saturate(1.2) ',
        }}
      />

      {/* 🌈 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3E236E]/80 via-[#3E236E]/50 to-black/70 backdrop-blur-sm" />

      {/* ✨ Light depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />

      {/* 🧊 Card Switcher */}
      <div className="relative z-20 w-full flex justify-center px-4"              >
        <AnimatePresence mode="wait" >
          {mode === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -40, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 40, rotateY: 8 }}
              transition={{ duration: 0.5 }}
              className='w-full flex justify-center items-center'
            >
              <LoginCard onSwitch={() => setMode('register')} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 40, rotateY: 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -40, rotateY: -8 }}
              transition={{ duration: 0.5 }}
              className='w-full flex justify-center items-center'

            >
              <RegisterCard onSwitch={() => setMode('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
