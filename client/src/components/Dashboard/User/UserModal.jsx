import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Shield, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/slices/userSlice";

const UserModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const dispatch=useDispatch();
  const { loading } = useSelector((state) => state.users);


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    Role: "User",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
  if (!formData.fullName || !formData.email || !formData.password) {
    alert("All fields are required");
    return;
  }

  dispatch(addUser(formData))
    .unwrap()
    .then(() => {
      onClose();
    })
    .catch((err) => {
      alert(err);
    });
};


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/*  */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600" />

          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 className="text-lg font-bold text-white">Add New User</h3>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            <InputGroup
              icon={User}
              label="Full Name"
              placeholder="e.g. John Doe"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />

            <InputGroup
              icon={Mail}
              label="Email Address"
              placeholder="e.g. john@glassboard.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium ml-1">
                Assign Role
              </label>
              <div className="relative group">
                <Shield
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <select
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none"
                >
                  
                  <option value="Manager" className="bg-[#0f172a]">
                    Member
                  </option>
                  <option value="Admin" className="bg-[#0f172a]">
                    Admin
                  </option>
                </select>
              </div>
            </div>

            {/* Password */}
            <InputGroup
              icon={Lock}
              label="Temporary Password"
              placeholder="••••••••"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button disabled={loading} onClick={handleSubmit} className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all">
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const InputGroup = ({
  icon: Icon,
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
}) => (
  <div className="space-y-1.5">
    <label className="text-xs text-zinc-400 font-medium ml-1">{label}</label>
    <div className="relative group">
      <Icon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        size={18}
      />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all"
      />
    </div>
  </div>
);

export default UserModal;
