'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FilePlus2, LineChart, Search, LayoutList, StickyNote, Clock } from 'lucide-react';
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
  useKindeBrowserClient
} from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DropdownLink {
  label: string;
  description: string;
  icon: React.ReactNode;
  disabled: boolean;
  comingSoon?: boolean;
  href?: string;
}

interface DropdownItem {
  title: string;
  key: string;
  links: DropdownLink[];
}

const dropdownItems: DropdownItem[] = [
  {
    title: 'Resume Tools',
    key: 'resumeTools',
    links: [
      {
        label: 'AI Resume Builder',
        description: 'Build a standout resume with AI, including ATS checks and editing.',
        icon: <FilePlus2 className="text-blue-600" size={18} />,
        disabled: false,
        href: '/dashboard'
      },
      {
        label: 'Resume Checker',
        description: 'Free ATS scan, review, and score. Optimize your resume in 1 minute.',
        icon: <LineChart className="text-red-500" size={18} />,
        disabled: false,
        href: '/ats-score'
      },
      {
        label: 'Bullet Point Generator',
        description: 'Create impactful, job-winning bullet points with AI.',
        icon: <LayoutList className="text-purple-500" size={18} />,
        disabled: false,
        href: '/bullet-generator'
      },
      {
        label: 'Summary Generator',
        description: 'Instantly craft professional, ATS-ready resume summaries.',
        icon: <StickyNote className="text-orange-500" size={18} />,
        disabled: false,
        href: '/summary-generator'
      }
    ]
  },
  {
    title: 'Cover Letters',
    key: 'coverLetters',
    links: [
      {
        label: 'Cover Letter Generator',
        description: 'Create personalized cover letters tailored to your job in seconds with AI.',
        comingSoon: true,
        icon: <Clock className="text-gray-400" size={18} />,
        disabled: true
      }
    ]
  },
  {
    title: 'Job Toolkit',
    key: 'jobToolkit',
    links: [
      {
        label: 'Job Letter Generator',
        description: 'Craft professional job-related letters easily.',
        comingSoon: true,
        icon: <Clock className="text-gray-400" size={18} />,
        disabled: true
      }
    ]
  },
  {
    title: 'Other Tools',
    key: 'otherTools',
    links: [
      {
        label: 'LinkedIn Review',
        description: 'Analyze and improve your LinkedIn profile.',
        comingSoon: true,
        icon: <Clock className="text-gray-400" size={18} />,
        disabled: true
      },
      {
        label: 'Portfolio Analyzer',
        description: 'Get insights to improve your portfolio.',
        comingSoon: true,
        icon: <Clock className="text-gray-400" size={18} />,
        disabled: true
      }
    ]
  }
];

const hoverColors = [
  'hover:bg-yellow-100',
  'hover:bg-red-100',
  'hover:bg-green-100',
  'hover:bg-purple-100',
  'hover:bg-blue-100',
  'hover:bg-orange-100',
  'hover:bg-indigo-100'
];

const NavBar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, isAuthenticated } = useKindeBrowserClient();
  const router = useRouter();

  const toggleDropdown = (key: string) => {
    setOpenDropdown(prev => (prev === key ? null : key));
  };

  const handleLinkClick = (href: string) => {
    if (!isAuthenticated) {
      router.push(`/api/auth/login?post_login_redirect_url=${encodeURIComponent(href)}`);
      return false;
    }
    return true;
  };

  return (
    <div className="shadow-sm w-full sticky top-0 bg-white dark:bg-white z-[9999]">
      <div className="w-full mx-auto max-w-7xl p-3 px-5 flex items-center justify-between">
        <div className="flex items-center flex-1 gap-9">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/applicant.png"
              alt="HireLens.ai Logo"
              className="h-8 w-8 object-contain"
            />
            <h5 className="text-[#0000FF] font-bold md:text-[16px] lg:text-[18px] xl:text-[20px] text-primary">HireLens.ai</h5>
          </Link>

          <div className="hidden lg:flex lg:ml-3 xl:ml-40">
            <ul className="flex items-center gap-3 text-[16px] font-semibold text-grey dark:text-gray-600 h-[35px]">
              {dropdownItems.map((item) => (
                <li key={item.key} className="relative">
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors duration-200 ${
                      openDropdown === item.key ? 'bg-[#E8E9E8] text-black' : 'hover:bg-[#E8E9E8] hover:text-black'
                    }`}
                  >
                    {item.title}
                    {openDropdown === item.key ? (
                      <ChevronUp className="w-4 h-4 transition-transform duration-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform duration-0" />
                    )}
                  </button>

                  {openDropdown === item.key && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[400px] bg-white rounded-md shadow-md overflow-hidden z-50">
                      <ul className="flex flex-col items-start text-sm text-black w-full">
                        {item.links.map((link, index) => (
                          <li key={index} className="w-full">
                            {link.href && !link.disabled ? (
                              <Link
                                href={link.href}
                                onClick={(e) => {
                                  if (!handleLinkClick(link.href!)) {
                                    e.preventDefault();
                                  }
                                  setOpenDropdown(null);
                                }}
                                className="w-full"
                              >
                                <div className={`flex justify-between items-center w-full px-4 py-4 transition-colors duration-200 ${
                                  hoverColors[index % hoverColors.length]
                                }`}>
                                  <div className="flex flex-col text-left w-[85%]">
                                    <span className="text-[16px] font-semibold leading-tight">{link.label}</span>
                                    <span className="text-[12px] text-gray-500 mt-1 leading-tight">{link.description}</span>
                                    {link.comingSoon && (
                                      <span className="flex items-center gap-1 text-[12px] text-gray-500 mt-1">
                                        <Clock size={14} className="text-gray-400" /> Coming Soon
                                      </span>
                                    )}
                                  </div>
                                  <div className="ml-2 flex-shrink-0">
                                    {link.icon}
                                  </div>
                                </div>
                              </Link>
                            ) : (
                              <div className={`flex justify-between items-center w-full px-4 py-4 transition-colors duration-200 ${
                                link.disabled ? 'cursor-default opacity-60' : hoverColors[index % hoverColors.length]
                              }`}>
                                <div className="flex flex-col text-left w-[85%]">
                                  <span className="text-[16px] font-semibold leading-tight">{link.label}</span>
                                  <span className="text-[12px] text-gray-500 mt-1 leading-tight">{link.description}</span>
                                  {link.comingSoon && (
                                    <span className="flex items-center gap-1 text-[12px] text-gray-500 mt-1">
                                      <Clock size={14} className="text-gray-400" /> Coming Soon
                                    </span>
                                  )}
                                </div>
                                <div className="ml-2 flex-shrink-0">
                                  {link.icon}
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.picture || ""} alt={user?.given_name || "User"} />
                    <AvatarFallback>
                      {user?.given_name?.[0]}{user?.family_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <LogoutLink className="w-full text-red-600 font-medium cursor-pointer">
                    Sign out
                  </LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <LoginLink>
                <Button variant="outline" className="text-[14px] h-[35px] text-white bg-black hover:bg-black hover:text-white">
                  Sign In
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button className="bg-[#0000FF] hover:bg-[#0000FF] text-[14px] h-[35px]">
                  Get Started
                </Button>
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;