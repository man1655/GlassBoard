import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Plus, Filter, MoreVertical, Trash2, Edit, Shield, 
  Users, UserCheck, UserX, Mail 
} from 'lucide-react';

// Reuse your existing components to match design
import GlassCard from '../../../components/common/GlassCard';
import StatCard from '../../../components/Dashboard/StatCard';
import UserModal from './UserModal'; 

// Mock Data
const DUMMY_USERS = [
  { id: 1, name: "Jay Patel", email: "jay@glassboard.com", role: "admin", status: "active", plan: "Pro" },
  { id: 2, name: "Sarah Connor", email: "sarah@skynet.com", role: "user", status: "active", plan: "Free" },
  { id: 3, name: "John Doe", email: "john@unknown.com", role: "user", status: "inactive", plan: "Free" },
  { id: 4, name: "Alice Wonderland", email: "alice@hole.com", role: "manager", status: "active", plan: "Enterprise" },
  { id: 5, name: "Bob Builder", email: "bob@fixit.com", role: "user", status: "banned", plan: "Free" },
];

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 1. Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">User Management</h1>
          <p className="text-blue-200/60 mt-1">Manage permissions and view user details.</p>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
        >
          <Plus size={18} /> Add User
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <StatCard icon={Users} label="Total Users" value="1,240" trend={12} color="blue" />
        <StatCard icon={UserCheck} label="Active Users" value="850" trend={5} color="green" />
        <StatCard icon={UserX} label="Banned / Inactive" value="15" trend={-2} color="red" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all">
                <Filter size={16} /> Filter
                </button>
            </div>
        </GlassCard>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="border-b border-white/10 bg-white/5 text-xs uppercase text-white/40 font-bold tracking-wider">
                    <th className="p-6">User Profile</th>
                    <th className="p-6">Role</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Plan</th>
                    <th className="p-6 text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                {DUMMY_USERS.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user, index) => (
                    <motion.tr 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        key={user.id} 
                        className="hover:bg-white/[0.02] transition-colors group"
                    >
                    <td className="p-6">
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{user.name}</p>
                                <p className="text-xs text-white/40">{user.email}</p>
                            </div>
                        </div>
                    </td>

                    <td className="p-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        user.role === 'admin' 
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                        {user.role === 'admin' && <Shield size={10} />}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                    </td>

                    <td className="p-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${
                            user.status === 'active' 
                            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                            : user.status === 'banned'
                            ? 'bg-red-500/10 border-red-500/20 text-red-400'
                            : 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400'
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                                user.status === 'active' ? 'bg-green-400 animate-pulse' : 
                                user.status === 'banned' ? 'bg-red-400' : 'bg-zinc-400'
                            }`} />
                            <span className="capitalize">{user.status}</span>
                        </div>
                    </td>

                    <td className="p-6 text-sm text-zinc-400">
                        {user.plan}
                    </td>

                    <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/5">
                            <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/10">
                            <Trash2 size={16} />
                        </button>
                        </div>
                    </td>
                    </motion.tr>
                ))}
                </tbody>
            </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
                <span>Showing 1-5 of 50 users</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50">Prev</button>
                    <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">Next</button>
                </div>
            </div>
        </GlassCard>
      </motion.div>

      {/* Modal */}
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default UserList;