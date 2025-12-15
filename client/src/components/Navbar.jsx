import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';
import { LogOut, Home, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* --- LOGO --- */}
        <div 
            onClick={() => navigate('/')} 
            className="group cursor-pointer flex items-center gap-2"
        >
          <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse group-hover:bg-blue-300 transition-colors" />
          <h1 className="text-2xl font-bold tracking-tighter text-white">
            GlassBoard.
          </h1>
        </div>

        {/* --- MIDDLE LINKS (Desktop) --- */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-sm">
            <button 
                onClick={() => navigate('/')} 
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive('/') 
                    ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
            >
                <Home size={15} /> <span className="mt-0.5">Home</span>
            </button>
            
            {user && (
                <button 
                    onClick={() => navigate('/dashboard')} 
                    className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        isActive('/dashboard') 
                        ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/20' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <LayoutDashboard size={15} /> <span className="mt-0.5">Dashboard</span>
                </button>
            )}
        </div>

        {/* --- RIGHT SECTION (Profile or Login) --- */}
        {user ? (
          <div className="flex items-center gap-4">
             {/* User Details */}
             <div className="hidden sm:block text-right">
                <p className="text-md font-bold text-white leading-none">{user.fullName}</p>
                <p className="text-[10px] text-blue-300/80 uppercase tracking-widest mt-0.5">{user.role || "Member"}</p>
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                {/* Avatar Button */}
                <button 
                  onClick={() => navigate('/profile')}
                  className={`relative w-[48px] h-[48px]   rounded-full p-[2px] transition-all hover:scale-105 ${
                      isActive('/dashboard/profile') 
                      ? 'bg-gradient-to-tr from-blue-400 to-purple-500' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-white">{user.fullName.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-[33px] h-[33px] flex items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
          >
            <User size={16} /> Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;