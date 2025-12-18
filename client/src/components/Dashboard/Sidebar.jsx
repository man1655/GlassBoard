import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ShieldCheck,
  Zap,
  Bell,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logout, reset } from "../../redux/slices/authSlice"; // Make sure this path is correct
import { notify } from "../../utils/notify"
import LogoutModal from "../common/LogoutModel";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState (false);
 

  // 1. Get User Role safely
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.Role || user?.role || "Member";
  const isAdmin = userRole === "admin";

  const allMenuItems = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      path: "/dashboard",
      allowedRoles: ["admin", "Member"],
    },
    {
      icon: Users,
      label: "User Management",
      path: "/dashboard/users",
      allowedRoles: ["admin"],
    },
  
    {
      icon: Bell,
      label: "Notifications",
      path: "/dashboard/notification",
      allowedRoles: ["admin"],
    },
    {
      icon: FileText,
      label: "Activity Logs",
      path: "/dashboard/logs",
      allowedRoles: ["admin"],
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/dashboard/profile",
      allowedRoles: ["admin", "Member"],
    },
  ];

  const visibleMenuItems = useMemo(() => {
    return allMenuItems.filter((item) => item.allowedRoles.includes(userRole));
  }, [userRole]);

  const handleLogout = () => {
    setShowLogoutModal(false);
    dispatch(logout());
    dispatch(reset());
    notify.success("Logged out successfully!");
    navigate("/");
  };

  return (
    
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 border-r border-white/5 bg-[#0a0a0a] z-50 overflow-hidden"
    >
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header / Logo Area */}
      <div className="pt-8 pb-6 px-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Zap size={20} className="text-white fill-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg tracking-tight">
            GlassBoard
          </h1>
          
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 px-2">
          Main Menu
        </p>

        {visibleMenuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div key={item.path} className="relative group">
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all relative z-10 ${
                  isActive
                    ? "text-blue-400"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                      : "group-hover:scale-110"
                  }`}
                />
                <span
                  className={`font-medium text-sm tracking-wide ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-auto shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-4 mt-auto">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 relative overflow-hidden group"
        >
          {/* FIX 1: Added 'pointer-events-none' so clicks pass through the gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
              {user?.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-white font-semibold text-sm truncate">
                {user?.fullName || "User"}
              </h4>
              <div className="flex items-center gap-1.5">
                {isAdmin ? (
                  <ShieldCheck size={12} className="text-yellow-500" />
                ) : null}
                <p
                  className={`text-xs capitalize ${
                    isAdmin ? "text-yellow-500 font-medium" : "text-zinc-500"
                  }`}
                >
                  {userRole}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={()=>setShowLogoutModal(true)}
            className="relative z-10 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-xs font-medium text-zinc-400 transition-colors border border-transparent hover:border-red-500/20"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;