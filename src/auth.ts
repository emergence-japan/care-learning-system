import NextAuth, { type DefaultSession } from "next-auth"
import type { Adapter } from "next-auth/adapters"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import {
  isLockedOut,
  recordLoginFailure,
  clearLoginFailures,
  LOGIN_LOCKOUT_MESSAGE,
} from "@/lib/login-rate-limit"

// NextAuth の型拡張
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      locale?: string
      facilityId?: string | null
      corporationId?: string | null
      isSuspended?: boolean
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    locale?: string
    facilityId?: string | null
    corporationId?: string | null
    isSuspended?: boolean
  }

  interface JWT {
    role?: string
    locale?: string
    facilityId?: string | null
    corporationId?: string | null
    isSuspended?: boolean
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        loginId: { label: "Login ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.loginId || !credentials?.password) return null

        const loginId = credentials.loginId as string

        // 総当たり攻撃対策：連続失敗でロック
        if (isLockedOut(loginId)) {
          throw new Error(LOGIN_LOCKOUT_MESSAGE)
        }

        const user = await prisma.user.findUnique({
          where: { loginId },
          include: {
            corporation: { select: { isActive: true } },
            facility: { select: { isActive: true } },
          },
        })

        if (!user) {
          recordLoginFailure(loginId)
          return null
        }

        // 退職済み（論理削除）ユーザーはログイン不可。
        // loginId 列挙を防ぐため「存在しない」場合と同じ挙動にする。
        if (user.deletedAt) {
          recordLoginFailure(loginId)
          return null
        }

        // 停止フラグの判定
        const isCorpSuspended = user.corporation ? !user.corporation.isActive : false
        const isFacilitySuspended = user.facility ? !user.facility.isActive : false
        const isSuspended = (isCorpSuspended || isFacilitySuspended) && user.role !== "SUPER_ADMIN"

        // 権限チェック：法人または施設が停止中の場合
        // スタッフ（受講者）は完全にログイン不可
        if (user.role === "STAFF" && isSuspended) {
          throw new Error("所属組織の利用が停止されているため、ログインできません。")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password)

        if (!isPasswordCorrect) {
          recordLoginFailure(loginId)
          return null
        }

        clearLoginFailures(loginId)

        return {
          id: user.id,
          name: user.name,
          loginId: user.loginId,
          role: user.role,
          locale: user.locale,
          facilityId: user.facilityId,
          corporationId: user.corporationId,
          isSuspended,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as string
      }
      if (token.locale !== undefined && session.user) {
        session.user.locale = token.locale as string
      }
      if (token.facilityId !== undefined && session.user) {
        session.user.facilityId = token.facilityId as string | null
      }
      if (token.corporationId !== undefined && session.user) {
        session.user.corporationId = token.corporationId as string | null
      }
      if (token.isSuspended !== undefined && session.user) {
        session.user.isSuspended = token.isSuspended as boolean
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.locale = user.locale
        token.facilityId = user.facilityId
        token.corporationId = user.corporationId
        token.isSuspended = user.isSuspended
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
})