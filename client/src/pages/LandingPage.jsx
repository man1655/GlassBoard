import React, { useRef, useEffect } from "react"; // <--- Added useEffect
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  ArrowRight,
  Github,
  Activity,
  Bell,
  Settings,
  Database,
  Server,
  Code,
  Layers,
  Box,
  LogOut 
} from "lucide-react";
import GlassCard from "../components/common/GlassCard";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


// --- 1. IMPORT getMe HERE ---
import { logout, reset, getMe } from '../redux/slices/authSlice'; 
import { notify } from "../utils/notify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ... (Keep your animation variants here) ...
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { scrollYProgress } = useScroll();
  
  // Get token and user from Redux
  const { user, token } = useSelector((state) => state.auth);

  
  useEffect(() => {
    
    if (token && !user) {
      dispatch(getMe());
    }
  }, [dispatch, token, user]);
  // ------------------------------------------------

  // ... (Keep all your useTransforms and animation logic) ...
  const boxY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const boxRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const boxX = useTransform(scrollYProgress, [0, 0.5, 1], [300, -900, 300]);
  const aboutRef = useRef(null);
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutOpacity = useTransform(aboutProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const aboutY = useTransform(aboutProgress, [0.2, 0.5, 0.8], [100, 0, -100]);
  const aboutScale = useTransform(aboutProgress, [0.2, 0.5, 0.8], [0.8, 1, 0.8]);
  const background = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [
      "linear-gradient(to bottom right, #0f172a, #0ea5e9)",
      "linear-gradient(to bottom right, #2e1065, #7c3aed)",
      "linear-gradient(to bottom right, #4a044e, #e879f9)",
      "linear-gradient(to bottom right, #881337, #f43f5e)",
      "linear-gradient(to bottom right, #450a0a, #ea580c)",
  ]);

  // ... (Keep your features, techStack arrays and handleLogout) ...
  const features = [
    { icon: <LayoutDashboard className="w-8 h-8 text-blue-300" />, title: "Real-Time Overview", desc: "Live metrics and interactive charts that update instantly without refreshing." },
    { icon: <Users className="w-8 h-8 text-purple-300" />, title: "User Management", desc: "Full CRUD operations. Add, edit, delete, and manage user roles effortlessly." },
    { icon: <ShieldCheck className="w-8 h-8 text-cyan-300" />, title: "RBAC Security", desc: "Role-Based Access Control ensures only Admins can access sensitive data." },
    { icon: <Activity className="w-8 h-8 text-pink-300" />, title: "Activity Logs", desc: "Track every action. See who logged in, who updated data, and when." },
    { icon: <Bell className="w-8 h-8 text-orange-300" />, title: "Smart Notifications", desc: "Get real-time alerts for critical system events and user activities." },
    { icon: <Settings className="w-8 h-8 text-cyan-300" />, title: "Profile Controls", desc: "Users can manage their own profiles, passwords, and preferences securely." },
  ];
  const techStack = [
    { name: "React.js", icon: <Code /> },
    { name: "Node.js", icon: <Server /> },
    { name: "MongoDB", icon: <Database /> },
    { name: "Express", icon: <Layers /> },
    { name: "Tailwind", icon: <LayoutDashboard /> },
    { name: "Framer", icon: <Activity /> },
  ];
 

  return (
    <div className="relative min-h-screen text-white selection:bg-blue-500 selection:text-white">
      <motion.div className="bg-gradient-animate fixed inset-0 z-0" style={{ background: background }} />

      <div className="relative z-10">
        <motion.div
          style={{ y: boxY, x: boxX, rotate: boxRotate }}
          className="fixed top-[20%] right-[30%] z-0 hidden lg:flex items-center justify-center w-24 h-24 bg-white/5 border border-white/20 backdrop-blur-sm rounded-3xl shadow-2xl pointer-events-none"
        >
          <Box className="w-10 h-10 text-white/50" />
        </motion.div>

       <Navbar/>

        {/* ... (Keep the rest of your HERO, ABOUT, FUNCTIONALITY sections exactly the same) ... */}
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6 inline-block">Full Stack MERN Solution</span>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight drop-shadow-2xl">
                Where Data Meets <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-orange-300">Modern Transparency</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                A professional admin dashboard built for performance. Manage users, visualize analytics, and secure your data with a beautiful glassmorphism interface.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                {/* 4. CONDITIONAL MAIN BUTTON */}
                <button
                  onClick={() => navigate(user ? "/dashboard" : "/register")}
                  className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  {user ? "Go to Dashboard" : "Get Started"} <ArrowRight className="w-5 h-5" />
                </button>
                
                <a href="https://github.com/man1655/GlassBoard" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 rounded-full transition-all text-white font-medium flex items-center gap-2">
                  <Github className="w-5 h-5" /> View Source Code
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Keeping the rest of the sections short for brevity (You already have them) */}
        <section ref={aboutRef} className="py-20 px-6 min-h-[50vh] flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div style={{ opacity: aboutOpacity, y: aboutY, scale: aboutScale }}>
              <GlassCard className="py-12 border-blue-400/30">
                <h2 className="text-3xl font-bold mb-6">About The Project</h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  GlassBoard is a comprehensive <strong>Admin Dashboard System </strong> It combines a robust Node.js backend with a highly interactive React frontend, featuring authentication, data visualization, and real-time updates—all wrapped in a modern, frosted-glass aesthetic.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </section>
        
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Core Functionality</h2>
              <p className="text-white/60">Everything you need to manage your application.</p>
            </motion.div>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <GlassCard className="h-full hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="p-3 bg-white/5 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">{feature.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl font-bold text-center mb-12">Powered By Modern Tech</motion.h2>
            <div className="flex flex-wrap justify-center gap-8">
              {techStack.map((tech, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}>
                  <GlassCard className="flex flex-col items-center justify-center w-32 h-32 hover:border-blue-400/50 transition-colors">
                    <div className="text-white/80 mb-2">{tech.icon}</div>
                    <span className="font-semibold">{tech.name}</span>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;