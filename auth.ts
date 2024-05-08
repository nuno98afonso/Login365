import NextAuth from "next-auth"
import Entra from "next-auth/providers/microsoft-entra-id"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    Entra({
      clientId: process.env.MICROSOFT_ENTRA_ID_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_ENTRA_ID_CLIENT_SECRET,
      tenantId: process.env.MICROSOFT_ENTRA_ID_TENANT_ID,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.name = session.user.name;
      session.user.id = token.sub;
      return session;
    },
  },
});