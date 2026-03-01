"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PrintButton() {
  return (
    <Link href="/admin/reports">
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full font-bold px-4 h-9 border-slate-200 hover:bg-slate-50 flex items-center gap-2"
      >
        <FileText className="w-4 h-4" />
        <span>監査レポート管理</span>
      </Button>
    </Link>
  );
}
