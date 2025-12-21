'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Moon, Sun, User, LogOut, Settings, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/app/providers/AuthProvider';
import { Link } from 'react-router-dom';

// Mock user
const mockUser = {
  name: 'Natashia Bunny',
  email: 'natasiabunny@mail.com',
  avatar: 'https://i.pravatar.cc/150?img=67',
};

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { logout } = useAuth();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Auto-focus search when expanded on mobile
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  return (
    <header
      className="bg-[#3E236E] text-white h-16 flex items-center px-4 md:px-6 shadow-sm fixed top-3 left-0 w-full md:left-[256px] max-w-[calc(100%-256px)] z-50 transition-all duration-300 rounded-xl"
      style={{ maxWidth: 'calc(100% - 256px)' }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left: Breadcrumbs (responsive collapse) */}
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          <h1 className="text-lg md:text-xl font-bold truncate">Configurations</h1>
          <div className="hidden md:flex items-center gap-1 text-sm text-white/70 flex-shrink-0">
            <span>▶</span>
            <Link to="/admin" className="hover:underline truncate max-w-[120px] md:max-w-none">
              Main Page
            </Link>
            <span>▶</span>
            <span className="font-medium truncate max-w-[100px] md:max-w-none">Sub Page</span>
          </div>
          {/* Mobile breadcrumb fallback */}
          <div className="md:hidden text-xs text-white/70 ml-2 flex-shrink-0">
            <span>Main ▶ Sub</span>
          </div>
        </div>

        {/* Center: Search (collapsible on mobile) */}
        <div className="flex items-center flex-grow mx-2 md:mx-4">
          <div
            className={`relative transition-all duration-300 ${
              isSearchExpanded || window.innerWidth >= 768
                ? 'w-full max-w-md'
                : 'w-10'
            }`}
          >
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70 ${
                  !isSearchExpanded && 'md:hidden'
                }`}
                aria-hidden="true"
              />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder={isSearchExpanded || window.innerWidth >= 768 ? 'Search here...' : ''}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.value) setIsSearchExpanded(false);
                }}
                className={`w-full pl-10 pr-10 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none transition-all ${
                  !isSearchExpanded && 'md:hidden w-10 pl-3 pr-3 placeholder-transparent'
                }`}
              />
              {(!isSearchExpanded || window.innerWidth < 768) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchExpanded(true)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white hover:bg-white/10 md:hidden"
                  aria-label="Expand search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:bg-white/10"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-white hover:bg-white/10 p-1"
                aria-label="User menu"
              >
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="h-8 w-8 rounded-full border-2 border-white/30"
                />
                <div className="hidden md:flex flex-col items-start text-left">
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {mockUser.name}
                  </span>
                  <span className="text-xs text-white/70 truncate max-w-[120px]">
                    {mockUser.email}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-white/70 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 bg-white ">
              <DropdownMenuItem asChild>
                <Link to="/admin/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/support" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 focus:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};