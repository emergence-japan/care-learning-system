"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hqUpdateFacility } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Loader2, Building2 } from "lucide-react";

type Props = {
  facility: {
    id: string;
    name: string;
    maxStaff: number;
  };
};

export function HQEditFacilityDialog({ facility }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    try {
      await hqUpdateFacility(facility.id, formData);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-blue-600">
          <Edit2 className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-8">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black text-slate-900 leading-tight">施設情報を修正</DialogTitle>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Edit Facility Information</p>
            </div>
          </div>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hq-edit-fac-name" className="text-xs font-bold text-slate-500 uppercase tracking-widest">施設名</Label>
            <Input 
              id="hq-edit-fac-name" 
              name="name" 
              defaultValue={facility.name} 
              className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold focus:ring-blue-500"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hq-edit-fac-max-staff" className="text-xs font-bold text-slate-500 uppercase tracking-widest">最大スタッフ数 (定員)</Label>
            <Input 
              id="hq-edit-fac-max-staff" 
              name="maxStaff" 
              type="number" 
              defaultValue={facility.maxStaff} 
              min={1} 
              className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold focus:ring-blue-500"
              required 
            />
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="flex-1 rounded-xl font-bold h-12">
              キャンセル
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 shadow-lg shadow-slate-200"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "更新する"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
