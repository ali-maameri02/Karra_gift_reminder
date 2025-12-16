'use client';

import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar';
import Header from '@/widgets/Header'; // 👈 import header

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header /> {/* 👈 Add header */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};