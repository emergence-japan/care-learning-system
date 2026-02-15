"use client";

import { Home, BookOpen, User, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function StaffMobileNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "HOME",
      href: "/",
      icon: Home,
    },
    {
      label: "COURSES",
      href: "/courses",
      icon: BookOpen,
    },
    {
      label: "PROFILE",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-t border-slate-200/40 pb-safe-area-inset-bottom shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full space-y-1.5 group"
            >
              <div
                className={cn(
                  "relative flex items-center justify-center w-12 h-9 rounded-2xl transition-all duration-500",
                  isActive ? "bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100/50" : "bg-transparent text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-all duration-500",
                    isActive ? "scale-110" : "scale-100"
                  )}
                />
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[9px] font-black tracking-[0.1em] transition-colors duration-500",
                  isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
