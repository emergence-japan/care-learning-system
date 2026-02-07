import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Care Learning System | Professional Training Platform",
  description: "介護業界向けプロフェッショナル学習管理システム。法令遵守とスキル向上を支援する信頼のプラットフォーム。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.className} antialiased bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
