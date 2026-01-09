import { prisma } from "@/lib/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: { strategy: "jwt" },
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email) return null;

                // Find user in DB
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                })

                if (!user) return null

                // For MVP, if user exists we log them in. 
                // TODO: Add Real Password Check
                return user
            },
        }),
    ],
})
