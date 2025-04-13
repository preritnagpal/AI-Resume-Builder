'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
  useKindeBrowserClient
} from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/#services' },
  { name: 'Why choose me', path: '/#why' },
  { name: 'Contact', path: '/#contact' }
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useKindeBrowserClient();
  const pathname = usePathname();

  return (
    <div className="w-full top-0 z-50 bg-[#1a5ce0] shadow-sm border-b-[1px] border-white/10">
      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between h-[100px]">
        
        {/* Left side: Logo + Desktop nav */}
        <div className="flex items-center flex-1 gap-6">
          {/*Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/applicant.png"
              alt="HireLens.ai Logo"
              className="h-7 w-7 md:h-9 md:w-9 object-contain"
            />
            <h5 className="text-white font-bold text-[18px] md:text-[20px] lg:text-[18px] xl:text-[26px]">
              HireLens.ai
            </h5>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex md:ml-10 lg:ml-20 xl:ml-80">
            <nav className="flex items-center gap-6 text-white text-[16px] font-semibold">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative transition-colors duration-300 px-1 ${
                    pathname === item.path
                      ? 'font-semibold text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Right side: Auth + Mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Authenticated: show avatar menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 p-0 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.picture || ""}
                      alt={user?.given_name || "User"}
                    />
                    <AvatarFallback>
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <LogoutLink className="w-full text-red-600 font-medium cursor-pointer">
                    Sign out
                  </LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // If not logged in, show sign in / get started
            <>
              <LoginLink>
                <Button
                  variant="outline"
                  className="text-white border-white/70 hover:border-white hover:text-white bg-[#1a5ce0] hover:bg-[##1a5ce0] text-[14px] md:text-[16px] font-semibold"
                >
                  Sign In
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button
                  variant="outline"
                  className="text-white border-white/70 hover:border-white hover:text-white bg-[#1a5ce0] hover:bg-[#1a5ce0]  text-[14px] md:text-[16px] font-semibold"
                >
                  Get Started
                </Button>
              </RegisterLink>
            </>
          )}

          {/* Hamburger toggle for small screens */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="text-white"
            >
              {mobileMenuOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - shows only when toggled */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1259d6] w-full px-5 pb-4 text-white text-[16px] font-medium space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)} // close menu on click
              className={`block transition-colors duration-300 ${
                pathname === item.path
                  ? 'text-white font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
