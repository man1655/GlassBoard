import React, { useState, useEffect } from 'react';

export default function GlassboardLoader() {
  const letters = "GLASSBOARD".split('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeFloat {
          0%, 100% { opacity: 0.3; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-10px); }
        }
        .letter {
          display: inline-block;
          animation: wave 1.5s ease-in-out infinite;
        }
        .glass-panel {
          backdrop-filter: blur(20px);
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        .floating-shape {
          animation: fadeFloat 3s ease-in-out infinite;
        }
      `}</style>

      <div className="relative">
        {/* Floating shapes */}
        <div className="absolute -top-32 left-0 w-32 h-32 border-4 border-cyan-400/30 rounded-full floating-shape" style={{ animationDelay: '0s' }}></div>
        <div className="absolute -bottom-32 right-0 w-24 h-24 border-4 border-purple-400/30 rounded-full floating-shape" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-0 -right-32 w-20 h-20 border-4 border-pink-400/30 rounded-full floating-shape" style={{ animationDelay: '1s' }}></div>

        {/* Main glass panel */}
        <div className="glass-panel rounded-2xl px-12 py-10 border border-white/20">
          <h1 className="text-6xl font-black">
            {letters.map((letter, i) => (
              <span 
                key={i}
                className="letter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
}