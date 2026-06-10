import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OrganizationClient } from "./organization-client";
import { OrganizationCreateForms } from "./organization-create-forms";

export default async function OrganizationManagementPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  const corporations = await prisma.corporation.findMany({
    select: {
      id: true,
      name: true,
      isActive: true,
      maxFacilities: true,
      maxStaff: true,
      facilities: {
        select: {
          id: true,
          name: true,
          type: true,
          maxStaff: true,
          isActive: true,
          users: {
            where: { role: { in: ["ADMIN", "STAFF"] } },
            select: { 
              id: true, 
              name: true, 
              loginId: true, 
              role: true,
              enrollments: {
                select: { status: true, courseId: true }
              }
            }
          },
          assignments: {
            select: {
              id: true,
              courseId: true,
              course: { select: { title: true } }
            }
          },
          _count: {
            select: { 
              users: { where: { role: "STAFF" } },
              assignments: true
            }
          }
        }
      },
      users: {
        where: { role: "HQ" },
        select: { id: true, name: true, loginId: true }
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
        <OrganizationCreateForms corporations={corporations.map(c => ({ id: c.id, name: c.name }))} />

        {/* Existing Organizations List */}
        <section className="space-y-6">
          <h3 className="font-bold text-xl text-zinc-900 px-1">登録済み法人・施設一覧</h3>
          
          <OrganizationClient corporations={corporations} />
        </section>
      </main>
    </div>
  );
}
