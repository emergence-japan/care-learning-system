import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// 型拡張による競合を避けるため、必要な箇所でキャストを使用します
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user) return null

        const isPasswordCorrect = credentials.password === user.password || 
                                  await bcrypt.compare(credentials.password as string, user.password)

        if (!isPasswordCorrect) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          facilityId: user.facilityId,
          corporationId: user.corporationId,
        } as any
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        (session.user as any).role = token.role
      }
      if (token.facilityId && session.user) {
        (session.user as any).facilityId = token.facilityId
      }
      if (token.corporationId && session.user) {
        (session.user as any).corporationId = token.corporationId
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.facilityId = (user as any).facilityId
        token.corporationId = (user as any).corporationId
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
})