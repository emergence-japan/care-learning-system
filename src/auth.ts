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
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    facilityId?: string | null
    corporationId?: string | null
  }

  interface JWT {
    role?: string
    facilityId?: string | null
    corporationId?: string | null
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
        })

        if (!user) return null

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
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.facilityId = user.facilityId
        token.corporationId = user.corporationId
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
})