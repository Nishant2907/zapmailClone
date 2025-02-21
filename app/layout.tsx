'use client'
import './globals.css';
import { Geist, Geist_Mono } from "next/font/google";
import * as React from 'react';
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar';

const AuthProvider = dynamic(
  () => import('@/context/AuthContext').then(mod => mod.AuthProvider),
  { ssr: false },
) // Add dynamic import for AuthProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() // Add pathname hook
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (pathname === '/') {
      // Check if the current path is the root
      const searchParams = window.location.search; // Get any search parameters
      // window.location.href = '/enrichment' // Redirect to /enrichment
      window.location.href = `/dashboard${searchParams}`;
      // Redirect to /email-finder
    }
  }, [pathname])

  // Reset sidebar state on mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastContainer></ToastContainer>

        <AuthProvider>
          <div className="flex min-h-screen">
            {/* <Sidebar /> */}
            <Sidebar
              isCollapsed={isCollapsed}
              onToggle={() => setIsCollapsed(!isCollapsed)}
            />
            <main className="flex-1 px-8 py-3 ml-0">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}