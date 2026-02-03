"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BookOpen, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Left Side: Visual Experience (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/30 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-600/20 blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-lg space-y-12"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
              <SparklesIcon className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Premium Education</span>
            </div>
            <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
              介護の未来を、<br />
              <span className="text-blue-400 italic">学び</span>から変えていく。
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              ケア・ラーニングは、現場のスタッフが誇りを持って成長できる、プロフェッショナルな学習プラットフォームです。
            </p>
          </div>

          <div className="space-y-6 pt-8 border-t border-white/10">
            <FeatureItem 
              icon={<ShieldCheck className="w-5 h-5 text-blue-400" />}
              title="コンプライアンスの遵守"
              desc="2024年度制度改正に完全準拠した最新のカリキュラム。"
            />
            <FeatureItem 
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              title="現場に寄り添うUX"
              desc="多忙な現場でも、スマートフォンで1分から学べる設計。"
            />
          </div>
        </motion.div>

        {/* Brand Bottom Label */}
        <div className="absolute bottom-12 left-12 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-slate-900 text-xs">CL</div>
          <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">Care Learning System v1.0</span>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50/50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-10 space-y-3">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">ログイン</h1>
            <p className="text-slate-500 font-medium italic">Welcome back to professional growth.</p>
          </div>

          <Card className="p-8 border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0" />
            
            <form action={dispatch} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  className="h-14 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-lg font-medium bg-slate-50/30"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-400">Password</Label>
                  <button type="button" className="text-[10px] font-bold text-blue-600 hover:underline">パスワードを忘れた場合</button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-14 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-lg font-medium bg-slate-50/30"
                />
              </div>

              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center"
                >
                  {errorMessage}
                </motion.div>
              )}

              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-100 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    認証中...
                  </>
                ) : (
                  "システムにログインする"
                )}
              </Button>
            </form>
          </Card>

          {/* Footer Helper */}
          <div className="mt-10 text-center space-y-4">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              © 2024 Emergence Japan. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="p-3 rounded-xl bg-white/5 border border-white/5 transition-colors group-hover:bg-white/10 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
        <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
    </svg>
  );
}
