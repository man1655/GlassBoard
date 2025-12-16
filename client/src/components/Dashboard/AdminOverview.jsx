import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserPlus, Server, Activity, TrendingUp, MoreHorizontal, ArrowUpRight 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import StatCard from '../../components/Dashboard/StatCard';
import GlassCard from '../../components/common/GlassCard';
import { fetchDashboardStats, fetchDashboardChart } from '../../redux/slices/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import GlassboardLoader from '../common/LoadingScreen';
import DashboardSkeleton from './DashboardSkeleton';

const AdminOverview = ({ user }) => {
 


  const dispatch = useDispatch();
  const { stats, chartData, isLoading, isError } = useSelector  ((state) => state.dashboard);

  // 2. Fetch on Mount
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchDashboardChart());
  }, [dispatch]);
  const isFirstLoad = isLoading && (!stats.totalUsers || chartData.length === 0);

  if (isFirstLoad) {
    return <DashboardSkeleton />;
  }
  

  return (
    <>
  
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <p className="text-blue-200/60 mt-1">
           Welcome back, Admin <span className="text-white font-semibold">{user?.fullName}</span>.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
      >
        <StatCard icon={Users} label="Total Users" value={stats.totalUsers}  color="blue" />
        <StatCard icon={UserPlus} label="New Signups Today" value={stats.newSignup}  color="purple" />
        <StatCard icon={Activity} label="Active Sessions" value={stats.activeSessions}  color="green" />
      </motion.div>

      {/* Charts & Logs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <GlassCard className="p-8 h-full min-h-[450px] flex flex-col">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2"><TrendingUp size={20} className="text-blue-400" /> User Growth</h3>
                  <select className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-xs text-white/70 outline-none"><option>Last 7 Days</option></select>
               </div>
               <div className="flex-1 w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={chartData}>
                        <defs>
                           <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} itemStyle={{ color: '#fff' }} />
                        <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </GlassCard>
         </motion.div>

        
      </div>
    </>
  );
};

export default AdminOverview;