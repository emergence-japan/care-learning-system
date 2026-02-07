"use client";

import { useState } from "react";
import { Menu, X, CalendarDays, ClipboardList, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <CalendarDays className="w-5 h-5" />, label: "年間計画", href: "#annual-plan" },
    { icon: <ClipboardList className="w-5 h-5" />, label: "研修管理", href: "#course-management" },
    { icon: <Users className="w-5 h-5" />, label: "スタッフ管理", href: "#staff-management" },
  ];

  return (
    <div className="lg:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-white hover:bg-white/10"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#120a0a] animate-in slide-in-from-right duration-300">
          <div className="h-24 px-8 flex items-center justify-between border-b border-white/5">
            <span className="font-black text-xl text-white tracking-tighter">Menu</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
            {menuItems.map((item, i) => (
              <a 
                key={i} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all active:scale-95"
              >
                {item.icon}
                <span className="font-bold text-lg">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="p-8 border-t border-white/5">
            <button className="flex items-center gap-4 px-6 py-4 w-full text-red-400 font-bold text-lg">
              <LogOut className="w-5 h-5" />
              <span>ログアウト</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
