"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => window.print()}
      className="rounded-full font-bold px-4 h-9 border-slate-200 hover:bg-slate-50 flex items-center gap-2 no-print"
    >
      <Printer className="w-4 h-4" />
      <span>監査用PDFを出力</span>
    </Button>
  );
}
