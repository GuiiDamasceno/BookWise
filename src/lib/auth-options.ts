import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '../lib/auth/prisma-adapter'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name!,
          email: profile.email!,
          avatar_url: profile.avatar_url,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return {
        ...session,
        user,
        token,
      }
    },
  },
  session: {
    maxAge: 60 * 60 * 24 * 4, // 4 days
    updateAge: 60 * 60 * 24,
  },
}
