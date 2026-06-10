"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Home, Loader2 } from "lucide-react";
import { createCorporation, createFacility } from "@/lib/actions";
import { useFormAction } from "@/hooks/use-form-action";

interface Props {
  corporations: { id: string; name: string }[];
}

export function OrganizationCreateForms({ corporations }: Props) {
  const corpForm = useFormAction(createCorporation);
  const facilityForm = useFormAction(createFacility);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* New Corporation */}
      <Card className="border-zinc-200 shadow-sm rounded-2xl">
        <CardHeader className="bg-zinc-50/50">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="w-5 h-5 text-red-600" />
            新規法人登録
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form action={corpForm.handleSubmit} className="space-y-4">
            {corpForm.error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in duration-300">
                {corpForm.error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="corp-name">法人名</Label>
              <Input id="corp-name" name="name" placeholder="例: 社会福祉法人 ケア・ライフ" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corp-max-facilities">最大施設数</Label>
              <Input id="corp-max-facilities" name="maxFacilities" type="number" defaultValue={10} min={1} required />
            </div>
            <Button
              type="submit"
              disabled={corpForm.isPending}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 font-bold"
            >
              {corpForm.isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "法人を登録"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* New Facility */}
      <Card className="border-zinc-200 shadow-sm rounded-2xl">
        <CardHeader className="bg-zinc-50/50">
          <CardTitle className="text-lg flex items-center gap-2">
            <Home className="w-5 h-5 text-red-600" />
            新規施設登録
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form action={facilityForm.handleSubmit} className="space-y-4">
            {facilityForm.error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in duration-300">
                {facilityForm.error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="fac-corp">所属法人</Label>
              <select
                id="fac-corp"
                name="corporationId"
                className="w-full h-10 rounded-md border border-zinc-200 px-3 text-sm"
                required
              >
                <option value="">法人を選択してください</option>
                {corporations.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fac-name">施設名</Label>
              <Input id="fac-name" name="name" placeholder="例: ケア・ライフ あさがお" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fac-max-staff">最大スタッフ数</Label>
              <Input id="fac-max-staff" name="maxStaff" type="number" defaultValue={20} min={1} required />
            </div>
            <Button
              type="submit"
              disabled={facilityForm.isPending}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 font-bold"
            >
              {facilityForm.isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "施設を登録"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
