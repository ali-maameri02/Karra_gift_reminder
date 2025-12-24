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

const mockUser = {
  name: 'Natashia Bunny',
  email: 'natasiabunny@mail.com',
  avatar: 'https://i.pravatar.cc/150?img=67',
};

interface HeaderProps {
  collapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ collapsed }) => {
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
      className={`
        fixed top-0 z-50 rounded-xl bg-[#3E236E] text-white shadow-sm
        left-0 right-0 w-full
        md:transition-all md:duration-300
        ${collapsed ? 'md:left-24 md:w-[calc(95%-4rem)]' : 'md:left-72 md:w-[calc(95%-15rem)]'}
      `}
    >
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex w-full items-center justify-between gap-3">
          {/* Left: Breadcrumbs */}
          <div className="flex min-w-0 items-center gap-2 md:gap-4">
            <h1 className="truncate text-base font-bold md:text-lg">
              Configurations
            </h1>

            <div className="hidden min-w-0 items-center gap-1 text-sm text-white/70 md:flex">
              <span>▶</span>
              <Link
                to="/admin"
                className="max-w-[120px] truncate hover:underline"
              >
                Main Page
              </Link>
              <span>▶</span>
              <span className="max-w-[120px] truncate font-medium">
                Sub Page
              </span>
            </div>

            <div className="flex-shrink-0 text-xs text-white/70 md:hidden">
              <span>Main ▶ Sub</span>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex flex-1 justify-center px-1">
            <div
              className={[
                'relative w-full max-w-md transition-all duration-300',
                !isSearchExpanded ? 'max-sm:max-w-[44px]' : '',
              ].join(' ')}
            >
              <div className="relative">
                <Search
                  className={[
                    'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70',
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
                    'w-full rounded-lg bg-white/10 py-2 pl-10 pr-10 text-white placeholder-white/70 focus:outline-none transition-all',
                    !isSearchExpanded
                      ? 'max-sm:w-[44px] max-sm:pl-3 max-sm:pr-3 max-sm:text-transparent max-sm:placeholder-transparent max-sm:border-transparent'
                      : '',
                  ].join(' ')}
                />
                {!isSearchExpanded && (
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setIsSearchExpanded(true)}
                    className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 text-white hover:bg-white/10 sm:hidden"
                    aria-label="Expand search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex flex-shrink-0 items-center gap-1 md:gap-3">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={toggleTheme}
              className="text-white hover:bg-white/10"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Link
                to="/admin/notifications"
              >
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="relative text-white hover:bg-white/10"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-red-500" />
            </Button>
</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className="flex items-center gap-2 px-1 text-white hover:bg-white/10"
                  aria-label="User menu"
                >
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="h-8 w-8 rounded-full border-2 border-white/30"
                  />
                  <div className="hidden max-w-[140px] flex-col items-start text-left md:flex">
                    <span className="truncate text-sm font-medium">
                      {mockUser.name}
                    </span>
                    <span className="truncate text-xs text-white/70">
                      {mockUser.email}
                    </span>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-white/70 md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white p-2">
                <DropdownMenuItem asChild>
                  <Link
                    to="/admin/settings"
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/admin/support"
                    className="flex items-center gap-2"
                  >
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
