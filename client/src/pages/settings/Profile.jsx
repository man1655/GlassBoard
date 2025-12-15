import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Lock, Camera, Save, Shield, 
  Bell, LogOut, LayoutDashboard 
} from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general'); // 'general' or 'security'
  const [loading, setLoading] = useState(false);

  // Mock User Data
  const [userData, setUserData] = useState({
    fullName: 'Alex Developer',
    email: 'alex@glassboard.com',
    role: 'Admin',
    avatar: null
  });

  // Mock Password Data
  const [passData, setPassData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      alert("Settings Updated Successfully!");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-blue-500 selection:text-white pb-20">
      
      {/* BACKGROUND (Same as Landing) */}
      <div className="bg-gradient-animate fixed inset-0 z-0" />
      
      {/* NAVBAR (Simplified for Dashboard) */}
      <nav className="relative z-50 px-6 py-4 bg-black/10 backdrop-blur-md border-b border-white/10 mb-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div 
            onClick={() => navigate('/dashboard')}
            className="text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
            GlassBoard.
          </div>
          <button onClick={() => navigate('/')} className="text-sm text-blue-200/60 hover:text-white transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-8">
        
        {/* --- LEFT SIDEBAR (Navigation) --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/4"
        >
          <GlassCard className="p-4 space-y-2">
            <div className="text-center mb-6 pt-4">
              <div className="relative w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center overflow-hidden">
                   {userData.avatar ? <img src={userData.avatar} alt="User" /> : <User className="w-8 h-8 text-blue-200" />}
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-blue-500 rounded-full hover:bg-blue-400 transition-colors shadow-lg">
                  <Camera className="w-3 h-3 text-white" />
                </button>
              </div>
              <h3 className="font-bold text-lg">{userData.fullName}</h3>
              <p className="text-xs text-blue-200/50 uppercase tracking-widest">{userData.role}</p>
            </div>

            <div className="border-t border-white/10 my-4" />

            {/* Sidebar Buttons */}
            <button 
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'general' ? 'bg-blue-500/20 border border-blue-400/30 text-white' : 'hover:bg-white/5 text-blue-200/60'}`}
            >
              <User className="w-5 h-5" /> General
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'security' ? 'bg-blue-500/20 border border-blue-400/30 text-white' : 'hover:bg-white/5 text-blue-200/60'}`}
            >
              <Shield className="w-5 h-5" /> Security
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-blue-200/60 transition-all">
              <Bell className="w-5 h-5" /> Notifications
            </button>
          </GlassCard>
        </motion.div>


        {/* --- RIGHT CONTENT AREA --- */}
        <div className="w-full md:w-3/4">
          
          {/* TAB 1: GENERAL PROFILE */}
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-1">Profile Information</h2>
                <p className="text-blue-200/50 mb-8 text-sm">Update your account's public profile information.</p>
                
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-100/80">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-5 h-5 text-blue-300/30" />
                        <input 
                          type="text" 
                          value={userData.fullName}
                          onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-400/50 focus:bg-black/30 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-100/80">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-blue-300/30" />
                        <input 
                          type="email" 
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-400/50 focus:bg-black/30 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio / About */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100/80">Bio</label>
                    <textarea 
                      rows="4"
                      placeholder="Tell us about yourself..."
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-400/50 focus:bg-black/30 transition-all outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
                      <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </GlassCard>
            </motion.div>
          )}

          {/* TAB 2: SECURITY (CHANGE PASSWORD) */}
          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-1">Security Settings</h2>
                <p className="text-blue-200/50 mb-8 text-sm">Ensure your account is secure by setting a strong password.</p>

                <form onSubmit={handleSave} className="space-y-6 max-w-lg">
                  
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100/80">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 w-5 h-5 text-blue-300/30" />
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-400/50 focus:bg-black/30 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="border-t border-white/5 my-2" />

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100/80">New Password</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-3.5 w-5 h-5 text-blue-300/30" />
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-400/50 focus:bg-black/30 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100/80">Confirm New Password</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-3.5 w-5 h-5 text-blue-300/30" />
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-400/50 focus:bg-black/30 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
                      <Shield className="w-4 h-4" /> Update Password
                    </button>
                  </div>

                </form>
              </GlassCard>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;