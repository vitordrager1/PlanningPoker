import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "@/lib/firestore";
import authConfig from "./auth.config";

const isProduction = process.env.NODE_ENV === "production";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter(firestore),
  trustHost: true,
  session: {
    strategy: "database",
  },
  cookies: {
    sessionToken: {
      name: isProduction
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction, // true em produção (HTTPS), false em dev (localhost)
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub; // ou token.id se você customizou isso
      }
      return session;
    },
  },
  ...authConfig,
});
