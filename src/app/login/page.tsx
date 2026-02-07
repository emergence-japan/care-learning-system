"use client";

import { useActionState } from "react";

import { authenticate } from "@/lib/actions";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Card } from "@/components/ui/card";

import { ShieldCheck, CheckCircle2, Loader2, Building2 } from "lucide-react";

import { motion } from "framer-motion";



export default function LoginPage() {

  const [errorMessage, dispatch, isPending] = useActionState(

    authenticate,

    undefined,

  );



  return (

    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans overflow-hidden">

      

      {/* Visual Section - Corporate Style */}

      <div className="w-full lg:w-1/2 relative bg-slate-900 flex flex-col items-center justify-center p-8 lg:p-16 overflow-hidden min-h-[40vh] lg:min-h-screen">

        {/* Abstract Background */}

        <div className="absolute inset-0 opacity-20">

            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-900 to-slate-900 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-slate-800 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        </div>

        

        {/* Grid Pattern Overlay */}

        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ opacity: 0.05 }}></div>



        <motion.div 

          initial={{ opacity: 0, y: 10 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8 }}

          className="relative z-10 max-w-lg w-full space-y-10"

        >

          {/* Logo / Brand Area */}

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 bg-white rounded flex items-center justify-center shadow-lg">

                <Building2 className="w-6 h-6 text-slate-900" />

            </div>

            <span className="text-white font-bold text-xl tracking-tight">Care Learning System</span>

          </div>



          <div className="space-y-6">

            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">

              プロフェッショナルのための<br/>

              <span className="text-slate-300">信頼できる学習基盤</span>

            </h2>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">

              コンプライアンス遵守と組織の成長を支援する、エンタープライズグレードの教育管理プラットフォームへようこそ。

            </p>

          </div>



          {/* Trust Indicators */}

          <div className="pt-8 border-t border-white/10 space-y-4">

            <div className="flex items-center gap-3 text-slate-300">

                <ShieldCheck className="w-5 h-5 text-emerald-500" />

                <span className="text-sm font-medium">セキュリティとコンプライアンス</span>

            </div>

            <div className="flex items-center gap-3 text-slate-300">

                <CheckCircle2 className="w-5 h-5 text-blue-500" />

                <span className="text-sm font-medium">組織別進捗管理とレポート</span>

            </div>

          </div>

        </motion.div>



        <div className="absolute bottom-8 left-8 text-[10px] text-slate-500 font-medium tracking-wider uppercase hidden lg:block">

            Secure Enterprise Connection

        </div>

      </div>



      {/* Login Form Section */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50/50">

        <motion.div 

          initial={{ opacity: 0, scale: 0.98 }}

          animate={{ opacity: 1, scale: 1 }}

          transition={{ duration: 0.5, delay: 0.2 }}

          className="w-full max-w-md"

        >

          <Card className="p-8 md:p-10 border-slate-200 shadow-xl shadow-slate-200/50 bg-white rounded-2xl">

            <div className="mb-8 text-center">

                <h1 className="text-xl font-bold text-slate-900">アカウントにログイン</h1>

                <p className="text-xs text-slate-500 mt-2">組織IDとパスワードを入力してください</p>

            </div>



            <form action={dispatch} className="space-y-5">

              <div className="space-y-1.5">

                <Label htmlFor="loginId" className="text-xs font-semibold text-slate-700">ログインID</Label>

                <Input

                  id="loginId"

                  name="loginId"

                  type="text"

                  placeholder="user_id"

                  required

                  className="h-11 rounded-md border-slate-300 focus:border-slate-900 focus:ring-slate-900/10 transition-all bg-slate-50 focus:bg-white"

                />

              </div>

              <div className="space-y-1.5">

                <div className="flex justify-between items-center">

                    <Label htmlFor="password" className="text-xs font-semibold text-slate-700">パスワード</Label>

                    <a href="#" className="text-[10px] text-slate-500 hover:text-slate-900 hover:underline">パスワードをお忘れですか？</a>

                </div>

                <Input

                  id="password"

                  name="password"

                  type="password"

                  required

                  className="h-11 rounded-md border-slate-300 focus:border-slate-900 focus:ring-slate-900/10 transition-all bg-slate-50 focus:bg-white"

                />

              </div>



              {errorMessage && (

                <div className="p-3 rounded-md bg-red-50 text-red-600 text-xs font-medium flex items-center gap-2 justify-center">

                   <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />

                   {errorMessage}

                </div>

              )}



              <Button 

                type="submit" 

                disabled={isPending}

                className="w-full h-11 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md shadow-slate-900/10 transition-all mt-2"

              >

                {isPending ? (

                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> 認証中...</>

                ) : (

                  "ログイン"

                )}

              </Button>

            </form>

          </Card>



          <p className="mt-8 text-center text-[10px] text-slate-400 font-medium">

            © 2026 Emergence Japan. All rights reserved.

          </p>

        </motion.div>

      </div>

    </div>

  );

}
