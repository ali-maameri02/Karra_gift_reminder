// DashboardLayout.tsx
'use client';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar';
import  Header  from '@/widgets/Header';

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
      />

      <div className="flex flex-1 flex-col">
        <Header collapsed={collapsed} />

        <main
          className={`flex-1 bg-gray-100 pt-20 mt-16 p-4 md:p-6 transition-all duration-300 ${
            collapsed ? 'md:ml-16' : 'md:ml-60'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
