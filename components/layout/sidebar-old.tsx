"use client";

import { motion } from "framer-motion";
import {
  Home,
  Menu,
  Settings,
  Users,
  BarChart2,
  MessageSquare,
  Plus,
  Workflow,
  Server,
  Network,
  Library,
  Hash,
  AudioLines,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase'

interface MenuItem {
  icon: React.FC<any>;
  label: string;
  path: string;
  hasPlus?: boolean; // Optional property
}
const menuSections: { title: string | null; items: MenuItem[] }[] = [
  {
    title: null,
    items: [{ icon: Home, label: "Dashboard", path: "/dashboard"},
      { icon: MessageSquare, label: "Mailboxes", path: "/mailboxes"},
      { icon: Workflow, label: "Domains", path: "/domains" },
      { icon: Server, label: "Exports", path: "/exports" },
      { icon: Network, label: "Subscriptions", path: "/subscriptions" },
      { icon: Library, label: "Wallet", path: "/wallet" },
    ],
  }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  // Reset sidebar state on mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="fixed md:sticky top-0 left-0 h-screen bg-white border-r shadow-lg z-40"
      animate={{
        width: isOpen ? 240 : 64,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <div className="py-4 px-3 flex flex-col justify-between h-full">
        <nav className="space-y-4">
          {/* Sidebar Title */}
          <div className="flex gap-4 w-full">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors "
            >
              <Menu className="w-5 h-5" />
            </button>
            <motion.div
              className={`text-2xl font-bold  transition-opacity md:block ${isOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
              Zapmail Clone
            </motion.div>
          </div>

          {/* Menu Items */}
          {menuSections.map((section, index) => (
            <div key={index}>
              {section.title && (
                <motion.p
                  className={`text-xs font-semibold text-gray-500 uppercase px-4 pb-2 ${isOpen ? "block" : "hidden"
                    }`}
                >
                  {section.title}
                </motion.p>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    // href=""
                    className={`flex md:items-start md:justify-start gap-4 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 ${isActive ? "bg-gray-100 text-primary font-medium" : ""
                      } ${isOpen ? "items-start justify-start" : "items-center justify-center"}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 px-0 m-0" />
                    <motion.span
                      className="whitespace-nowrap"
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        transition: { duration: 0.2 },
                      }}
                      style={{
                        display: isOpen ? "block" : "none",
                      }}
                    >
                      {item.label}
                    </motion.span>
                    {item?.hasPlus && (
                      <motion.span
                        animate={{
                          opacity: isOpen ? 1 : 0,
                          transition: { duration: 0.2 },
                        }}
                        style={{
                          display: isOpen ? "block" : "none",
                        }}
                        className="ml-auto my-auto"
                      >
                        <Plus className="w-4 h-4 text-gray-400" />
                      </motion.span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sign Out Button */}
        <div className="flex w-full">
          <button
            className={`flex w-full md:items-start md:justify-start gap-4 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 
              hover:cursor-pointer ${isOpen ? "items-start justify-start" : "items-center justify-center"}`}
              onClick={async () => { handleLogout() }}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 px-0 m-0" />
            <motion.span
              className="whitespace-nowrap "
              animate={{
                opacity: isOpen ? 1 : 0,
                transition: { duration: 0.2 },
              }}
              style={{
                display: isOpen ? "block" : "none",
              }}
            >
              Sign Out
            </motion.span>
          </button>
        </div>
      </div>
    </motion.div>
  );
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