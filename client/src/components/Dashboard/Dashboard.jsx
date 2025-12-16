import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import Sidebar from './Sidebar';
import AdminOverview from './AdminOverview';
import UserOverview from './UserOverview';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.Role || user?.role || 'Member';

  return (
    <div className="min-h-screen text-white bg-[#0f172a] overflow-x-hidden">
      <div className="bg-gradient-animate fixed inset-0 z-0" />
      
      <Navbar />
      <Sidebar />

      <main className="relative z-10 pt-32 pb-12 px-6 lg:pl-80 lg:pr-12 max-w-[1600px] mx-auto">
        {role === 'admin' ? (
          <AdminOverview user={user} />
        ) : (
          <UserOverview user={user} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;