'use client';
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft, CloudLightning, Mail, Globe, History, CreditCard, Wallet2, HelpCircle, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from '@/lib/supabase'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, MoreVertical } from "lucide-react";

interface UserProfileProps {
  isCollapsed: boolean;
}


interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    // {
    //   label: "Dashboard",
    //   icon: LayoutDashboard,
    //   href: "/overview",
    //   color: "text-blue-500",
    //   bgColor: "bg-blue-50",
    // },
    {
      label: "Mailboxes",
      icon: Mail,
      href: "/mailboxes",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      label: "Domains",
      icon: Globe,
      href: "/domains",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Export History",
      icon: History,
      href: "/exports",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      label: "Subscriptions",
      icon: CreditCard,
      href: "/subscriptions",
      color: "text-rose-500",
      bgColor: "bg-rose-50",
    },
    {
      label: "Wallet",
      icon: Wallet2,
      href: "/wallet",
      color: "text-teal-500",
      bgColor: "bg-teal-50",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      // if (user) setEmail(user.email)
      // console.log(user);
    }

    fetchUser()
  }, [])

  return (
    <div className="h-screen flex-shrink-0">
      <TooltipProvider delayDuration={0}>
        <div className={cn(
          "relative flex flex-col h-screen border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[80px]" : "w-[240px]",
          "bg-white"
        )}>
          <div
            className={cn(
              "flex items-center  p-4",
              isCollapsed && "justify-center", !isCollapsed && "justify-between"
            )}
          >
            {!isCollapsed ? (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                  <CloudLightning className="h-5 w-5 text-purple-600" />
                </div>
                <span className="font-semibold text-lg">Zapmail</span>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <CloudLightning className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full hover:bg-gray-100",
                isCollapsed && "mx-auto", isCollapsed && "hidden"
              )}
              onClick={onToggle}
            >
              <ChevronLeft className={cn(
                "h-4 w-4 transition-all ",
                isCollapsed && "rotate-180"
              )} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full hover:bg-gray-100",
              isCollapsed && "mx-auto grid", !isCollapsed && "hidden"
            )}
            onClick={onToggle}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-all",
              isCollapsed && "rotate-180"
            )} />
          </Button>

          <ScrollArea className="flex-1 w-full px-3">
            <div className="space-y-2 py-4">
              {routes.map((route) => (
                <Tooltip key={route.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={route.href}
                      className={cn(
                        "flex items-center gap-x-3 px-3 py-2 rounded-xl transition-all",
                        pathname === route.href
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-50",
                        isCollapsed && "justify-center px-2"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg",
                        route.bgColor,
                        isCollapsed ? "w-10 h-10" : "w-9 h-9"
                      )}>
                        <route.icon className={cn(
                          "w-full h-full",
                          route.color
                        )} />
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium">{route.label}</span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right" className="font-medium">
                      {route.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-auto px-3 border-t">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="/help"
                  className={cn(
                    "flex items-center gap-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg bg-gray-100",
                    isCollapsed ? "w-10 h-10" : "w-9 h-9"
                  )}>
                    <HelpCircle className="w-full h-full text-gray-600" />
                  </div>
                  {!isCollapsed && (
                    <span className="font-medium">Help Center</span>
                  )}
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="font-medium">
                  Help Center
                </TooltipContent>
              )}
            </Tooltip>
          </div>

          <div className="mt-auto">

            <div className={`p-3 ${isCollapsed ? "hidden" : "flex items-center gap-4"}`}>
              <div className={`flex items-center ${isCollapsed ? "justify-center" : "flex-1 justify-between"}`}>
                <div className="flex items-center justify-center gap-2">
                  <Avatar className=''>
                    <AvatarFallback className='bg-[#333333] text-white font-semibold text-base'>
                      {getInitials("Nishant Mishra")}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex-1">
                      <h3 className="font-medium">Nishant Mishra</h3>
                      <p className="text-sm text-muted-foreground">nishant@healdns.com</p>
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    <DropdownMenuItem asChild className="flex items-center cursor-pointer">
                      <Link href="/settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className={`p-3 ${isCollapsed ? "" : "hidden"}`}>
              <div className='flex items-center justify-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className='cursor-pointer'>
                      <AvatarFallback className='bg-[#333333] text-white font-semibold text-base'>
                        {getInitials("Nishant Mishra")}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    <DropdownMenuItem asChild className="flex items-center cursor-pointer">
                      <Link href="/settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}

function getInitials(name: string | undefined): string {
  if (!name) return 'EM' // Default fallback
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
  return initials.toUpperCase()
}


const handleLogout = async () => {
  try {
    await supabase.auth.signOut({ scope: 'local' })
    localStorage.clear()
  } catch (error) {
    console.error('Sign-out error:', error)
  } finally {
    clearCookies()
  }
}

const clearCookies = () => {
  const cookies = document.cookie.split('; ')
  cookies.forEach(cookie => {
    const [name] = cookie.split('=')
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
}
