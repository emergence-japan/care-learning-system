import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// NextAuth の型拡張
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      facilityId?: string | null
      corporationId?: string | null
      isSuspended?: boolean
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    facilityId?: string | null
    corporationId?: string | null
    isSuspended?: boolean
  }

  interface JWT {
    role?: string
    facilityId?: string | null
    corporationId?: string | null
    isSuspended?: boolean
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        loginId: { label: "Login ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.loginId || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { loginId: credentials.loginId as string },
          include: {
            corporation: { select: { isActive: true } },
            facility: { select: { isActive: true } },
          },
        })

        if (!user) return null

        // 停止フラグの判定
        const isCorpSuspended = user.corporation ? !user.corporation.isActive : false
        const isFacilitySuspended = user.facility ? !user.facility.isActive : false
        const isSuspended = (isCorpSuspended || isFacilitySuspended) && user.role !== "SUPER_ADMIN"

        // 権限チェック：法人または施設が停止中の場合
        // スタッフ（受講者）は完全にログイン不可
        if (user.role === "STAFF" && isSuspended) {
          throw new Error("所属組織の利用が停止されているため、ログインできません。")
        }

        const isPasswordCorrect = credentials.password === user.password || 
                                  await bcrypt.compare(credentials.password as string, user.password)

        if (!isPasswordCorrect) return null

        return {
          id: user.id,
          name: user.name,
          loginId: user.loginId,
          role: user.role,
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
      if (token.facilityId !== undefined && session.user) {
        session.user.facilityId = token.facilityId as any
      }
      if (token.corporationId !== undefined && session.user) {
        session.user.corporationId = token.corporationId as any
      }
      if (token.isSuspended !== undefined && session.user) {
        session.user.isSuspended = token.isSuspended as boolean
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
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