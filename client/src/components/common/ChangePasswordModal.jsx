import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Key, ShieldCheck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { notify } from '../../utils/notify';
import { changePassword } from '../../redux/slices/authSlice';
// import { changePassword } from '../../redux/slices/authSlice'; // You will need to create this thunk

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return notify.error("New passwords do not match");
    }
    if (formData.newPassword.length < 8) {
      return notify.error("Password must be at least 6 characters");
    }

    setIsLoading(true);

    try {
     
      await dispatch(changePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })).unwrap();

      notify.success("Password updated successfully!");
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      onClose();

    } catch (error) {
      notify.error(error || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-[#0f172a]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-blue-400" size={20} /> Change Password
            </h3>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
           
            <div className="space-y-1.5">
              <label className="text-xs text-blue-200/60 font-medium ml-1">Current Password</label>
              <div className="relative group">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="password" name="currentPassword"
                  value={formData.currentPassword} onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  placeholder="Enter current password"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-xs text-blue-200/60 font-medium ml-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="password" name="newPassword"
                  value={formData.newPassword} onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs text-blue-200/60 font-medium ml-1">Confirm New Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-green-400 transition-colors" size={18} />
                <input 
                  type="password" name="confirmPassword"
                  value={formData.confirmPassword} onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-green-500/50 transition-all"
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-white/5">
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex-1 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ChangePasswordModal;