import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Box } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../../components/common/GlassCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../../redux/slices/authSlice';
import { notify } from '../../utils/notify';

const Login = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      notify.error(message)
    }
    if (isSuccess || user) {
      notify.success("User LogedIn Successfully")
      navigate('/'); 
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password.length<8){
      return notify.error("Password Must Be Greater Than 8 Characters")
    }
    dispatch(loginUser(formData))
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden selection:bg-blue-500 selection:text-white">
      
      <div className="bg-gradient-animate fixed inset-0 z-0" />
      <motion.div 
        animate={{ 
          y: [0, -20, 0], 
          rotate: [0, 10, 0] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="fixed top-[15%] right-[10%] z-0 hidden lg:flex items-center justify-center w-24 h-24 bg-white/5 border border-white/20 backdrop-blur-sm rounded-3xl shadow-2xl pointer-events-none"
      >
         <Box className="w-10 h-10 text-white/50" />
      </motion.div>

      
      <div className="relative z-10 w-full max-w-md px-6">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-block mb-4 group">
            <h1 className="text-3xl font-bold tracking-tighter flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
              GlassBoard.
            </h1>
          </Link>
          <p className="text-blue-100/70">Welcome back! Access your dashboard.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <GlassCard className="border-t border-white/20 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* EMAIL INPUT */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100/80 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-blue-300/50 group-focus-within:text-blue-300 transition-colors" />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="admin@glassboard.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100/80 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-blue-300/50 group-focus-within:text-blue-300 transition-colors" />
                  <input 
                    type="password" 
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>

            </form>

            {/* FOOTER LINKS */}
            <div className="mt-6 text-center text-sm text-blue-200/60">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-300 hover:text-white font-medium underline decoration-blue-300/30 underline-offset-4 transition-colors">
                Register now
              </Link>
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;