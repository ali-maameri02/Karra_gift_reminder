'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Moon, Sun, User, LogOut, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/app/providers/AuthProvider';
import { Link } from 'react-router-dom';

// Mock user
const mockUser = {
  name: 'Natashia Bunny',
  email: 'natasiabunny@mail.com',
  avatar: 'https://i.pravatar.cc/150?img=67', // Replace with real avatar later
};

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout } = useAuth();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-[#3E236E] text-white h-16 flex items-center justify-between px-6 shadow-sm w-[80rem] fixed right-5 top-3 rounded-xl">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Configurations</h1>
        <div className="flex items-center gap-1 text-sm text-white/70">
          <span>▶</span>
          <Link to="/admin" className="hover:underline">Main Page</Link>
          <span>▶</span>
          <span className="font-medium">Sub Page</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="relative w-96">
        <Input
          type="text"
          placeholder="Search here..."
          className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1.5 h-6 w-6 text-white hover:bg-white/10"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Right: Theme + Notifications + User */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-white hover:bg-white/10"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 relative"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="h-8 w-8 rounded-full border-2 border-white/30"
              />
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{mockUser.name}</div>
                <div className="text-xs text-white/70">{mockUser.email}</div>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-white/70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 bg-white">
            <DropdownMenuItem asChild>
              <Link to="/admin/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/support" className="flex items-center gap-2">
                <HelpCircleIcon className="h-4 w-4" />
                Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={logout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

// Icons (Lucide React)
const BellIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ChevronDownIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SettingsIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 0 1.14 1.14l.06.06a1.65 1.65 0 0 0 1.82.33l1.54-.51a2 2 0 0 0 1.14-1.14l.06-.06a1.65 1.65 0 0 0 .33-1.82l-.06-.06a2 2 0 0 0-1.14-1.14l-.06-.06a1.65 1.65 0 0 0-1.82-.33l-1.54.51a2 2 0 0 0-1.14 1.14l-.06.06a1.65 1.65 0 0 0-.33 1.82" />
    <path d="M8 14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2" />
  </svg>
);

const HelpCircleIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12" y2="17" />
  </svg>
);