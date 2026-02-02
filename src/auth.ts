import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

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

        // 開発初期なので簡易比較。本来は bcrypt.compare を使用
        // シードデータに合わせて、平文比較かハッシュ比較かを合わせます
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
        // @ts-ignore
        session.user.role = token.role
      }
      if (token.facilityId && session.user) {
        // @ts-ignore
        session.user.facilityId = token.facilityId
      }
      if (token.corporationId && session.user) {
        // @ts-ignore
        session.user.corporationId = token.corporationId
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = user.role
        // @ts-ignore
        token.facilityId = (user as any).facilityId
        // @ts-ignore
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
