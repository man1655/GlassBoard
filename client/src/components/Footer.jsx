import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-white/10 bg-black/20 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-white tracking-tight mb-1">GlassBoard.</h2>
            <p className="text-xs text-blue-200/50">
                Designed for the MERN Stack Portfolio.
            </p>
        </div>

        <p className="text-sm text-white/40">
            © 2025 GlassBoard Inc. All rights reserved.
        </p>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4">
            <a href="#" className="text-white/40 hover:text-white hover:scale-110 transition-all">
                <Github size={20} />
            </a>
            <a href="#" className="text-white/40 hover:text-blue-400 hover:scale-110 transition-all">
                <Twitter size={20} />
            </a>
            <a href="#" className="text-white/40 hover:text-blue-600 hover:scale-110 transition-all">
                <Linkedin size={20} />
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;