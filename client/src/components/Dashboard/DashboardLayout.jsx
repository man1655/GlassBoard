import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';  // Adjust path if needed
import Sidebar from './Sidebar'; // Adjust path if needed

const DashboardLayout = () => {
  return (
    <div className="min-h-screen text-white bg-[#0f172a] overflow-x-hidden font-sans">
      
      {/* 1. Background Gradient (Matches your original design exactly) */}
      <div className="bg-gradient-animate fixed inset-0 z-0 pointer-events-none" />
      
      {/* 2. Fixed Navigation Components */}
      <Navbar />
      <Sidebar />

      {/* 3. Main Content Area 
          - pt-32: Pushes content down below the fixed Navbar
          - lg:pl-80: Pushes content right to respect the Sidebar width
          - max-w-[1600px]: Keeps large screens from looking stretched
      */}
      <main className="relative z-10 pt-32 pb-12 px-6 lg:pl-80 lg:pr-12 max-w-[1600px] mx-auto transition-all duration-300">
        
       
        <Outlet />
        
      </main>
    </div>
  );
};

export default DashboardLayout;