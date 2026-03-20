"use client";

import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Certificate } from "@/components/reports/certificate";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  staffName: string;
  corporationName: string;
  facilityName: string;
  courseTitle: string;
  sessionLabel: string | null;
  completedAt: string;
}

export function CertificateDownloadButton({
  staffName,
  corporationName,
  facilityName,
  courseTitle,
  sessionLabel,
  completedAt,
}: Props) {
  const t = useTranslations("certificate");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) return null;

  const issuedAt = new Date().toLocaleDateString("ja-JP");
  const fileName = `修了証_${courseTitle}${sessionLabel ? `_${sessionLabel}` : ""}.pdf`;

  const data = { staffName, corporationName, facilityName, courseTitle, sessionLabel, completedAt, issuedAt };

  return (
    <PDFDownloadLink document={<Certificate data={data} />} fileName={fileName}>
      {({ loading }) => (
        <button
          className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-full border border-emerald-200 transition-all whitespace-nowrap"
          disabled={loading}
        >
          <Download className="w-3 h-3" />
          {loading ? t("generating") : t("download")}
        </button>
      )}
    </PDFDownloadLink>
  );
}
