import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Shield, Activity, Lock, User, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { notify } from "../../utils/notify";

const UpdateUserModal = ({ isOpen, onClose, user, onUpdateSuccess }) => {
  const dispatch = useDispatch();

  // Default display user in case of missing data
  const displayUser = user || {
    fullName: "Alex Developer",
    email: "alex@glassboard.com",
    Role: "Member",
    status: "active",
  };

  const [role, setRole] = useState(displayUser.Role);
  const [status, setStatus] = useState(displayUser.status);

  useEffect(() => {
    if (user) {
      setRole(user.Role || "Member"); // ensure fallback
      setStatus(user.status || "active");
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    const userId = user._id || user.id;
    const payload = { Role: role, status }; // send backend key

    const result = await dispatch(updateUser({ id: userId, data: payload }));

    if (updateUser.fulfilled.match(result)) {
      notify.success("User updated successfully!");
      if (onUpdateSuccess) onUpdateSuccess();
      onClose();
    } else {
      notify.error(result.payload || "Failed to update user");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-80" />

          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Update Permissions
              </h3>
              <p className="text-xs text-blue-200/50 mt-0.5">
                Modify access level and account status.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Read-only fields */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-200/40 uppercase tracking-widest flex items-center gap-2">
                  User Identity <Lock size={10} />
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                    size={18}
                  />
                  <input
                    type="text"
                    value={displayUser.fullName}
                    disabled
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white/50 cursor-not-allowed select-none focus:outline-none"
                  />
                </div>
              </div>
              <div className="relative group">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                  size={18}
                />
                <input
                  type="email"
                  value={displayUser.email}
                  disabled
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white/50 cursor-not-allowed select-none focus:outline-none"
                />
              </div>
            </div>

            <div className="h-px bg-white/10 w-full" />

            {/* Editable fields */}
            <div className="grid grid-cols-2 gap-4">
              {/* Role */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                  Assign Role
                </label>
                <div className="relative">
                  <Shield
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                    size={18}
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-blue-500/10 border border-blue-500/20 rounded-xl pl-10 pr-2 py-3 text-blue-100 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer hover:bg-blue-500/20 transition-colors"
                  >
                    {/* ADDED CLASS HERE */}
                    <option
                      value="Member"
                      className="bg-[#0f172a] text-gray-300"
                    >
                      Member
                    </option>
                    <option
                      value="admin"
                      className="bg-[#0f172a] text-gray-300"
                    >
                      Admin
                    </option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                  Account Status
                </label>
                <div className="relative">
                  <Activity
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400"
                    size={18}
                  />
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-purple-500/10 border border-purple-500/20 rounded-xl pl-10 pr-2 py-3 text-purple-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer hover:bg-purple-500/20 transition-colors"
                  >
                    {/* ADDED CLASSES HERE (With Colors) */}
                    <option
                      value="active"
                      className="bg-[#0f172a] text-green-400 font-medium"
                    >
                      Active
                    </option>
                    <option
                      value="banned"
                      className="bg-[#0f172a] text-red-400 font-medium"
                    >
                      Banned
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/10 text-white/70 font-semibold hover:bg-white/5 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-[2] py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpdateUserModal;
