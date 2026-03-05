"use client";

import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { SummaryReport } from "@/components/reports/summary-report";
import { StaffReport } from "@/components/reports/staff-report";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText, Download, User,
  Calendar, CheckCircle
} from "lucide-react";
import type { SummaryData, StaffMember } from "@/types";

interface Props {
  facilityName: string;
  summaryData: SummaryData;
  staffMembers: StaffMember[];
  fiscalYear: number;
}

export function ReportsClient({ facilityName, summaryData, staffMembers, fiscalYear }: Props) {
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const selectedStaff = staffMembers.find(s => s.id === selectedStaffId);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">監査用レポート管理</h2>
          <p className="text-slate-500 font-bold mt-1">
            {facilityName} | {fiscalYear}年度 研修実施記録
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-black border border-blue-100 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {fiscalYear}年度
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Facility Summary Report */}
        <Card className="p-8 border-2 border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
            <FileText className="w-32 h-32 text-blue-600" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            
            <div>
              <h3 className="text-xl font-black text-slate-900">施設全体サマリー</h3>
              <p className="text-sm text-slate-500 font-medium mt-1">
                全法定研修の実施状況、修了率、実施日を一覧化した報告書です。行政への提出に最適です。
              </p>
            </div>

            <div className="pt-4">
              <PDFDownloadLink
                document={<SummaryReport data={summaryData} />}
                fileName={`研修実施状況報告書_${facilityName}_${fiscalYear}年度.pdf`}
              >
                {({ loading }) => (
                  <Button 
                    disabled={loading}
                    className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
                  >
                    <Download className="w-5 h-5" />
                    {loading ? "生成中..." : "PDFをダウンロード"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </Card>

        {/* 2. Individual Staff Report */}
        <Card className="p-8 border-2 border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
            <User className="w-32 h-32 text-emerald-600" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            
            <div>
              <h3 className="text-xl font-black text-slate-900">スタッフ別受講記録</h3>
              <p className="text-sm text-slate-500 font-medium mt-1">
                スタッフごとの修了状況、修了日、行動宣言を含む証明書を生成します。
              </p>
            </div>

            <div className="space-y-4">
              <select 
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border-2 border-slate-100 font-bold text-slate-900 focus:border-emerald-500 focus:ring-0 transition-all"
                value={selectedStaffId || ""}
                onChange={(e) => setSelectedStaffId(e.target.value)}
              >
                <option value="">スタッフを選択してください</option>
                {staffMembers.map(staff => (
                  <option key={staff.id} value={staff.id}>{staff.name}</option>
                ))}
              </select>

              {selectedStaffId && selectedStaff && (
                <PDFDownloadLink
                  document={<StaffReport data={selectedStaff.reportData} />}
                  fileName={`受講記録証明書_${selectedStaff.name}_${fiscalYear}年度.pdf`}
                >
                  {({ loading }) => (
                    <Button 
                      disabled={loading}
                      className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
                    >
                      <Download className="w-5 h-5" />
                      {loading ? "生成中..." : `${selectedStaff.name}様のPDFを生成`}
                    </Button>
                  )}
                </PDFDownloadLink>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-12 bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[120%] bg-blue-500/10 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center shrink-0">
            <CheckCircle className="w-10 h-10 text-blue-400" />
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tight">監査（実地指導）への対応について</h4>
            <p className="text-slate-300 font-bold mt-2 leading-relaxed">
              行政の監査時には、上記よりダウンロードしたPDFを印刷してご提示ください。<br/>
              研修計画（年間スケジュール）との整合性も自動的に反映されています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
