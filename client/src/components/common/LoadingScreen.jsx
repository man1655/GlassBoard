import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] text-white">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center">
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-t-blue-400 border-r-transparent border-b-blue-600 border-l-transparent"
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_20px_2px_rgba(96,165,250,0.8)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-lg font-medium tracking-widest text-blue-200/80 uppercase"
        >
          Loading GlassBoard
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;