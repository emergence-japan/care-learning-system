import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getSummaryReportData, getStaffReportData } from "@/lib/report-data";
import { ReportsClient } from "./reports-client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = session.user.facilityId;
  if (!facilityId) {
    return <div className="p-20 text-center font-bold">所属施設が未設定です</div>;
  }

  const facility = await prisma.facility.findUnique({
    where: { id: facilityId },
    include: { corporation: true },
  });

  if (!facility) {
    return <div className="p-20 text-center font-bold">施設情報が見つかりません</div>;
  }

  // 年度計算
  const startMonth = facility.corporation?.fiscalYearStartMonth || 4;
  const now = new Date();
  const currentYear = now.getMonth() + 1 >= startMonth ? now.getFullYear() : now.getFullYear() - 1;
  const { year } = await searchParams;
  const selectedYear = year ? parseInt(year) : currentYear;

  // 1. 施設サマリーデータの取得
  const summaryData = await getSummaryReportData(facilityId, selectedYear, startMonth);

  // 2. スタッフ一覧とそれぞれのレポートデータの取得
  const staff = await prisma.user.findMany({
    where: { facilityId, role: "STAFF" },
    orderBy: { name: "asc" },
  });

  const staffWithData = await Promise.all(
    staff.map(async (s) => {
      const reportData = await getStaffReportData(s.id, selectedYear, startMonth);
      return {
        id: s.id,
        name: s.name,
        reportData,
      };
    })
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/admin">
            <Button variant="ghost" className="rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 pr-4 text-slate-500 hover:text-slate-900 font-bold text-sm">
              <ChevronLeft className="w-5 h-5" />
              <span>ダッシュボードへ戻る</span>
            </Button>
          </Link>
          <h1 className="font-black text-xl tracking-tighter text-slate-900 uppercase border-l border-slate-200 pl-6">
            Audit Reports
          </h1>
        </div>
      </header>

      <main className="pb-20">
        <ReportsClient 
          facilityName={facility.name}
          summaryData={JSON.parse(JSON.stringify(summaryData))}
          staffMembers={JSON.parse(JSON.stringify(staffWithData))}
          fiscalYear={selectedYear}
        />
      </main>
    </div>
  );
}
