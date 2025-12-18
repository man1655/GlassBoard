import React from 'react';
import { motion } from 'framer-motion';

const DashboardLoader = () => {
  return (
    // Full Screen Overlay with Blur
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f172a]/60 backdrop-blur-xl">
      
      {/* Animation Container */}
      <div className="relative w-24 h-24">
        
        {/* 1. Outer Ring (Spinning Clockwise) */}
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' }}
        />
        
        {/* 2. Inner Ring (Spinning Counter-Clockwise) */}
        <motion.div 
          className="absolute inset-3 rounded-full border-4 border-transparent border-b-blue-300 border-l-purple-300 opacity-70"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* 3. Center Glowing Orb (Pulsing) */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
                className="w-3 h-3 bg-white rounded-full"
                animate={{ 
                    scale: [1, 1.5, 1], 
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 0px rgba(255,255,255,0)"
                    ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
        </div>
      </div>

      {/* Loading Text */}
      <motion.div 
        className="mt-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-white font-bold tracking-wider text-lg">GLASSBOARD</h3>
        <div className="flex gap-1">
             <motion.span 
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
             />
             <motion.span 
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
             />
             <motion.span 
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
             />
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardLoader;