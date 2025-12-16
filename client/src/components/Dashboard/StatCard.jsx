import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';

const StatCard = ({ icon: Icon, label, value, trend, color }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-emerald-500 to-emerald-600",
    cyan: "from-cyan-500 to-cyan-600",
  };

  const bgGlow = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-emerald-500",
    cyan: "bg-cyan-500",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <GlassCard className="p-6 relative overflow-hidden group h-full">
        {/* Ambient Glow */}
        <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity ${bgGlow[color]}`} />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-blue-200/60 text-xs font-bold uppercase tracking-widest">{label}</p>
            <h3 className="text-3xl font-bold text-white mt-2 tracking-tight">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
            <Icon size={22} className="text-white" />
          </div>
        </div>

         
      </GlassCard>
    </motion.div>
  );
};

export default StatCard;