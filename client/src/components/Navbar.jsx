import React, { useState, useEffect, useRef } from "react"; // 1. Import useRef
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../redux/slices/authSlice";
import { getNotifications } from "../redux/slices/notificationSlice"; 

import { 
  LogOut, Home, LayoutDashboard, User, Bell, 
  CheckCircle, AlertTriangle, Info, XCircle 
} from "lucide-react";
import LogoutModal from "./common/LogoutModel";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // 2. Create the Ref
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { notifications = [] } = useSelector(
    (state) => state.notification || {} 
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getNotifications());
    }
  }, [dispatch, user]);

  // 3. Add Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If dropdown is open AND click is NOT inside the ref element
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const isAdmin = user?.Role === "admin"; 

  const handleLogout = () => {
    setShowConfirm(false);
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleToggleNotifications = () => {
    setShowDropdown(!showDropdown);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getNoteStyle = (type) => {
    switch (type) {
      case "success": 
        return { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" };
      case "warning": 
        return { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
      case "alert": 
        return { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
      default: 
        return { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    }
  };

  return (
    <>
      <div className="relative z-[100]">
        <LogoutModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleLogout}
        />
      </div>

      <nav className="fixed top-0 w-full z-50 px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <div onClick={() => navigate("/")} className="group cursor-pointer flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse group-hover:bg-blue-300 transition-colors" />
            <h1 className="text-2xl font-bold tracking-tighter text-white">GlassBoard.</h1>
          </div>

          {/* MIDDLE: LINKS */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-sm">
            <button onClick={() => navigate("/")} className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${isActive("/") ? "bg-blue-600/90 text-white shadow-lg shadow-blue-500/20" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              <Home size={15} /> <span className="mt-0.5">Home</span>
            </button>

            {user && (
              <button onClick={() => navigate("/dashboard")} className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${isActive("/dashboard") ? "bg-blue-600/90 text-white shadow-lg shadow-blue-500/20" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                <LayoutDashboard size={15} /> <span className="mt-0.5">Dashboard</span>
              </button>
            )}
          </div>

          {/* RIGHT: USER ACTIONS */}
          {user ? (
            <div className="flex items-center gap-4">
              
              {!isAdmin && (
                // 4. ATTACH REF HERE (Wraps Button + Dropdown)
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={handleToggleNotifications}
                    className="relative p-2 rounded-full hover:bg-white/10 transition-all text-white/70 hover:text-white"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-[#0f172a]"></span>
                      </span>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-3 w-80 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                      <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
                        <h4 className="text-sm font-bold text-white">Notifications</h4>
                        <span className="text-[10px] text-white/40">{unreadCount > 0 ? `${unreadCount} new` : 'Recent'}</span>
                      </div>

                      <div className="max-h-64 overflow-y-auto custom-scrollbar">
                        {notifications && notifications.length > 0 ? (
                          notifications.map((note) => {
                            const style = getNoteStyle(note.type);
                            const Icon = style.icon;

                            return (
                              <div key={note._id} className={`flex gap-3 p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${note.isRead ? "opacity-60" : "bg-white/[0.02]"}`}>
                                <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${style.bg} ${style.border}`}>
                                   <Icon size={14} className={style.color} />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-200 leading-snug">{note.message}</p>
                                  <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                     <span className={`w-1.5 h-1.5 rounded-full ${style.color.replace('text-', 'bg-')}`}></span>
                                     {new Date(note.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-6 text-center text-white/30 text-xs italic">No notifications found</div>
                        )}
                      </div>
                      
                      
                    </div>
                  )}
                </div>
              )}

              {/* USER DETAILS */}
              <div className="hidden sm:block text-right">
                <p className="text-md font-bold text-white leading-none">{user.fullName}</p>
                <p className="text-[10px] text-blue-300/80 uppercase tracking-widest mt-0.5">{user.Role || "Member"}</p>
              </div>

              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <button onClick={() => navigate("/profile")} className={`relative w-[48px] h-[48px] rounded-full p-[2px] transition-all hover:scale-105 ${isActive("/dashboard/profile") ? "bg-gradient-to-tr from-blue-400 to-purple-500" : "bg-white/10 hover:bg-white/20"}`}>
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center overflow-hidden">
                    {user.avatar ? <img src={user.avatar} alt="User" className="w-full h-full object-cover" /> : <span className="font-bold text-white">{user.fullName.charAt(0).toUpperCase()}</span>}
                  </div>
                </button>

                <button onClick={() => setShowConfirm(true)} className="w-[33px] h-[33px] flex items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all" title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-full text-sm font-semibold text-white transition-all hover:scale-105">
              <User size={16} /> Login
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;