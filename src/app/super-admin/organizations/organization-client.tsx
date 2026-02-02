"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Building, Home } from "lucide-react";
import { AddOrgUserDialog } from "@/components/add-org-user-dialog";
import { Card, CardContent } from "@/components/ui/card";

type Corp = {
  id: string;
  name: string;
  facilities: {
    id: string;
    name: string;
    users: { id: string; name: string; email: string }[];
  }[];
  users: { id: string; name: string; email: string }[];
};

export function OrganizationClient({ corporations }: { corporations: Corp[] }) {
  const [dialogConfig, setDialogConfig] = useState<{
    corporationId: string;
    facilityId: string | null;
    orgName: string;
    role: "HQ" | "ADMIN";
  } | null>(null);

  return (
    <>
      <div className="space-y-8">
        {corporations.map((corp) => (
          <div key={corp.id} className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-zinc-900 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Corporation</div>
                <h4 className="text-xl font-black">{corp.name}</h4>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setDialogConfig({ corporationId: corp.id, facilityId: null, orgName: corp.name, role: "HQ" })}
                  variant="outline" size="sm" className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg"
                >
                  本部ユーザー追加
                </Button>
              </div>
            </div>

            <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
              <div className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">法人本部（代表者）</div>
              <div className="flex flex-wrap gap-2">
                {corp.users.map(user => (
                  <div key={user.id} className="bg-white border border-zinc-200 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs font-bold text-zinc-700">{user.name}</span>
                    <span className="text-[10px] text-zinc-400">{user.email}</span>
                  </div>
                ))}
                {corp.users.length === 0 && (
                  <p className="text-xs text-zinc-400 italic py-1">本部ユーザーが未登録です</p>
                )}
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {corp.facilities.map((facility) => (
                <Card key={facility.id} className="border-zinc-100 bg-zinc-50/30 rounded-2xl overflow-hidden">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-100">
                          <Home className="w-5 h-5 text-zinc-600" />
                        </div>
                        <h5 className="font-bold text-lg text-zinc-900">{facility.name}</h5>
                      </div>
                      <Button 
                        onClick={() => setDialogConfig({ corporationId: corp.id, facilityId: facility.id, orgName: facility.name, role: "ADMIN" })}
                        variant="ghost" size="sm" className="text-zinc-400 hover:text-red-600 rounded-lg"
                      >
                        <Plus className="w-4 h-4 mr-1" /> 施設長追加
                      </Button>
                                            </div>
                                            
                                            <div className="space-y-2">
                                              <p className="text-[10px] font-bold uppercase text-zinc-400">施設管理者（施設長）</p>
                                              <div className="space-y-1">
                    
                        {facility.users.map(user => (
                          <div key={user.id} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-zinc-100 shadow-sm">
                            <div className="text-sm font-medium">{user.name}</div>
                            <div className="text-[10px] text-zinc-400">{user.email}</div>
                          </div>
                        ))}
                        {facility.users.length === 0 && (
                          <p className="text-xs text-zinc-400 italic">施設管理者が未登録です</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {corp.facilities.length === 0 && (
                <div className="col-span-2 text-center py-10 text-zinc-400 text-sm">
                  この法人には施設が登録されていません。
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {dialogConfig && (
        <AddOrgUserDialog 
          {...dialogConfig} 
          onClose={() => setDialogConfig(null)} 
        />
      )}
    </>
  );
}
