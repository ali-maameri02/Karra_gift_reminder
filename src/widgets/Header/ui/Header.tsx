'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Moon,
  Sun,
  LogOut,
  Settings,
  Bell,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
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
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  return (
    <header
      className="
        fixed top-0 rounded-xl  left-0 right-0 z-50 bg-[#3E236E] text-white shadow-sm
        md:left-64 md:w-[calc(100%-16rem)]
      "
    >
      <div className="h-16 flex items-center px-4 md:px-6">
        <div className="flex items-center justify-between w-full gap-3">
          {/* Left: Breadcrumbs */}
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <h1 className="text-base md:text-lg font-bold truncate">
              Configurations
            </h1>

            <div className="hidden md:flex items-center gap-1 text-sm text-white/70 min-w-0">
              <span>▶</span>
              <Link
                to="/admin"
                className="hover:underline truncate max-w-[120px]"
              >
                Main Page
              </Link>
              <span>▶</span>
              <span className="font-medium truncate max-w-[120px]">
                Sub Page
              </span>
            </div>

            <div className="md:hidden text-xs text-white/70 flex-shrink-0">
              <span>Main ▶ Sub</span>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 flex justify-center px-1">
            <div
              className={[
                'relative transition-all duration-300',
                'w-full max-w-md',
                !isSearchExpanded ? 'max-sm:max-w-[44px]' : '',
              ].join(' ')}
            >
              <div className="relative">
                <Search
                  className={[
                    'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70',
                    !isSearchExpanded ? 'max-sm:hidden' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search here..."
                  onFocus={() => setIsSearchExpanded(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.value) setIsSearchExpanded(false);
                  }}
                  className={[
                    'w-full py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none transition-all',
                    'pl-10 pr-10',
                    !isSearchExpanded
                      ? 'max-sm:w-[44px] max-sm:pl-3 max-sm:pr-3 max-sm:placeholder-transparent max-sm:text-transparent max-sm:border-transparent'
                      : '',
                  ].join(' ')}
                />
                {!isSearchExpanded && (
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setIsSearchExpanded(true)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-white hover:bg-white/10 sm:hidden"
                    aria-label="Expand search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={toggleTheme}
              className="text-white hover:bg-white/10"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="text-white hover:bg-white/10 relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className="flex items-center gap-2 text-white hover:bg-white/10 px-1"
                  aria-label="User menu"
                >
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="h-8 w-8 rounded-full border-2 border-white/30"
                  />
                  <div className="hidden md:flex flex-col items-start text-left max-w-[140px]">
                    <span className="text-sm font-medium truncate">
                      {mockUser.name}
                    </span>
                    <span className="text-xs text-white/70 truncate">
                      {mockUser.email}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/70 hidden md:block" />
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
      </div>
    </header>
  );
};

