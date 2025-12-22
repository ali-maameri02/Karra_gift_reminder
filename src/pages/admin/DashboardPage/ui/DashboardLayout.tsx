'use client';

import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar';
import  Header  from '@/widgets/Header';


export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header  />
        <main className="flex-1 p-4 md:p-6 bg-gray-100 pt-20 mt-16 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

