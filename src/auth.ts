
import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./schema"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Resend({
    from: "no-reply@btc-addr-tx.brandoncox.dev"
  })],
  pages: {
    signIn: "/login",
    // verifyRequest: "/verify"
  },
  trustHost: true
})