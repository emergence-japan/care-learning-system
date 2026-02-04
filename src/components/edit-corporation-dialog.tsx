"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCorporation } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { X, Edit, Loader2 } from "lucide-react";

type Props = {
  corporation: {
    id: string;
    name: string;
    maxFacilities: number;
    maxStaff: number;
  };
  onClose: () => void;
};

export function EditCorporationDialog({ corporation, onClose }: Props) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    try {
      await updateCorporation(corporation.id, formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-none animate-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg">法人の設定を変更</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <CardContent className="p-6">
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-corp-name">法人名</Label>
              <Input id="edit-corp-name" name="name" defaultValue={corporation.name} required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-max-facilities">最大施設数</Label>
                <Input id="edit-max-facilities" name="maxFacilities" type="number" defaultValue={corporation.maxFacilities} min={1} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-max-staff">最大スタッフ数</Label>
                <Input id="edit-max-staff" name="maxStaff" type="number" defaultValue={corporation.maxStaff} min={1} required />
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
                キャンセル
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "更新する"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
