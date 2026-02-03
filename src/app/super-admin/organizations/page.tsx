import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building, Home, UserPlus, ChevronLeft, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCorporation, createFacility, createOrgUser } from "@/lib/actions";
import Link from "next/link";
import { OrganizationClient } from "./organization-client";

export default async function OrganizationManagementPage() {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== "SUPER_ADMIN") {
    redirect("/");
  }

  const corporations = await prisma.corporation.findMany({
    include: {
      facilities: {
        include: {
          users: {
            where: { role: "ADMIN" }
          }
        }
      },
      users: {
        where: { role: "HQ" }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-zinc-50 pb-12 font-sans text-zinc-900">
      {/* Header */}
      <header className="bg-red-950 text-white sticky top-0 z-10 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/super-admin">
              <Button variant="ghost" size="icon" className="text-red-200">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-bold text-lg">組織・ユーザー管理</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-10">
        {/* Create Organization Forms */}
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
              <form action={createCorporation} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="corp-name">法人名</Label>
                  <Input id="corp-name" name="name" placeholder="例: 社会福祉法人 ケア・ライフ" required />
                </div>
                <Button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 font-bold">
                  法人を登録
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
              <form action={createFacility} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fac-corp">所属法人</Label>
                  <select 
                    id="fac-corp" 
                    name="corporationId" 
                    className="w-full h-10 rounded-md border border-zinc-200 px-3 text-sm"
                    required
                  >
                    <option value="">法人を選択してください</option>
                    {corporations.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fac-name">施設名</Label>
                  <Input id="fac-name" name="name" placeholder="例: ケア・ライフ あさがお" required />
                </div>
                <Button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 font-bold">
                  施設を登録
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Organizations List */}
        <section className="space-y-6">
          <h3 className="font-bold text-xl text-zinc-900 px-1">登録済み法人・施設一覧</h3>
          
          <OrganizationClient corporations={corporations} />
        </section>
      </main>
    </div>
  );
}
