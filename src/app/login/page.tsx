"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BookOpen, ShieldCheck, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white font-sans overflow-x-hidden">
      
      {/* Visual Experience Section (Top on mobile, Side on desktop) */}
      <div className="w-full lg:w-1/2 relative bg-slate-900 flex items-center justify-center p-8 lg:p-12 overflow-hidden min-h-[45vh] lg:min-h-screen">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/30 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-600/20 blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-lg space-y-8 lg:space-y-12 text-center lg:text-left"
        >
          <div className="space-y-4 lg:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mx-auto lg:mx-0">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Premium Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.2] lg:leading-[1.1] tracking-tight">
              介護の未来を、<br />
              <span className="text-blue-400 italic font-serif">学び</span>から変えていく。
            </h2>
            <p className="text-slate-400 text-sm lg:text-lg leading-relaxed font-medium max-w-sm mx-auto lg:mx-0">
              現場のスタッフが誇りを持って成長できる、プロフェッショナルな学習プラットフォーム。
            </p>
          </div>

          {/* Value Props - Hidden on smallest screens to focus on login */}
          <div className="hidden sm:flex flex-col lg:space-y-6 pt-8 border-t border-white/10 text-left max-w-md mx-auto lg:mx-0">
            <FeatureItem 
              icon={<ShieldCheck className="w-5 h-5 text-blue-400" />}
              title="コンプライアンス遵守"
              desc="最新の制度改正に完全準拠したカリキュラム。"
            />
            <div className="lg:block hidden">
              <FeatureItem 
                icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                title="現場に寄り添うUX"
                desc="スマートフォンで1分から学べる直感的な設計。"
              />
            </div>
          </div>
        </motion.div>

        {/* Brand Label (Desktop only) */}
        <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-slate-900 text-xs">CL</div>
          <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">Care Learning v1.0</span>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-8 -mt-12 lg:mt-0 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 sm:p-10 border-slate-200/60 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] rounded-[3rem] bg-white/95 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0" />
            
            <div className="relative z-10 space-y-8">
              <div className="text-center lg:text-left space-y-2">
                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">ログイン</h1>
                <p className="text-slate-400 text-sm font-medium italic">Welcome back to excellence.</p>
              </div>

              <form action={dispatch} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    className="h-14 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-lg font-medium bg-white shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
                    <button type="button" className="text-[10px] font-bold text-blue-600 hover:underline">忘れた場合</button>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="h-14 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-lg font-medium bg-white shadow-sm"
                  />
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center animate-shake">
                    {errorMessage}
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> 認証中...</>
                  ) : (
                    "システムにログインする"
                  )}
                </Button>
              </form>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              © 2024 Emergence Japan
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-white/5 border border-white/5 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm mb-0.5">{title}</h4>
        <p className="text-slate-500 text-[10px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}