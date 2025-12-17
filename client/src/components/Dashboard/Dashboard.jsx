import React from 'react';
import { useSelector } from 'react-redux';
import AdminOverview from './AdminOverview';
import UserOverview from './UserOverview';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.Role || user?.role || 'Member';

  return (
      <main className="relative z-10   md:max-w-[1600px] mx-auto">
        {role === 'admin' ? (
          <AdminOverview user={user} />
        ) : (
          <UserOverview user={user} />
        )}
      </main>
   
  );
};

export default Dashboard;