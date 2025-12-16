import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, ShieldCheck, Star, CreditCard, TrendingUp, MoreHorizontal 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import StatCard from '../../components/dashboard/StatCard';
import GlassCard from '../../components/common/GlassCard';

const UserOverview = ({ user }) => {
  // --- USER DATA ---
  const stats = {
    streak: "5 Days",
    profile: "80%",
    balance: "$0.00",
    plan: "Free"
  };

  // User Chart: "My Activity" instead of "User Growth"
  const chartData = [
    { name: 'Mon', hours: 2 }, { name: 'Tue', hours: 4 },
    { name: 'Wed', hours: 1 }, { name: 'Thu', hours: 5 },
    { name: 'Fri', hours: 3 }, { name: 'Sat', hours: 6 },
    { name: 'Sun', hours: 2 },
  ];

  return (
    <>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-blue-200/60 mt-1">
           Hello, <span className="text-white font-semibold">{user?.fullName}</span>. Here is your personal activity.
        </p>
      </motion.div>

      {/* User Stats Grid (Same Design, Different Icons/Data) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
      >
        <StatCard icon={Clock} label="Login Streak" value={stats.streak} subtext="Keep it up!" color="blue" />
        <StatCard icon={ShieldCheck} label="Profile Status" value={stats.profile} subtext="Complete it now" color="purple" />

        <StatCard icon={Star} label="Current Plan" value={stats.plan} subtext="Upgrade to Pro" color="yellow" />
      </motion.div>

      {/* Charts & Personal Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* My Activity Chart */}
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <GlassCard className="p-8 h-full min-h-[450px] flex flex-col">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2"><TrendingUp size={20} className="text-green-400" /> My Activity</h3>
                  <select className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-xs text-white/70 outline-none"><option>This Week</option></select>
               </div>
               <div className="flex-1 w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={chartData}>
                        <defs>
                           <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} itemStyle={{ color: '#fff' }} />
                        <Area type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorHours)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </GlassCard>
         </motion.div>

         {/* Personal Logs */}
         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-1">
            <GlassCard className="p-0 h-full overflow-hidden flex flex-col">
               <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h3 className="text-lg font-bold">My History</h3>
                  <MoreHorizontal size={18} className="text-white/40" />
               </div>
               <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-[400px]">
                  {/* Mock Personal History */}
                  <div className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-xl transition-all cursor-pointer group">
                      <div className="mt-1 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400"><Clock size={16} /></div>
                      <div>
                          <p className="text-sm font-medium text-white">Logged In</p>
                          <p className="text-xs text-blue-200/40 mt-0.5">Just now</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-xl transition-all cursor-pointer group">
                      <div className="mt-1 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400"><ShieldCheck size={16} /></div>
                      <div>
                          <p className="text-sm font-medium text-white">Updated Profile</p>
                          <p className="text-xs text-blue-200/40 mt-0.5">Yesterday</p>
                      </div>
                  </div>
               </div>
               <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                  <button className="w-full py-2 text-xs font-bold text-green-300 border border-green-500/20 rounded-lg">View All History</button>
               </div>
            </GlassCard>
         </motion.div>
      </div>
    </>
  );
};

export default UserOverview;