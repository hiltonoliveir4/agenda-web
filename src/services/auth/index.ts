import axiosInstance from '@/lib/axios'
import axios from 'axios'
import NextAuth, { type DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface User {
    token?: string
  }

  interface Session {
    access_token?: string
    user: {
      id: number
    } & DefaultSession['user']
  }
}

const api_url = process.env.NEXT_PUBLIC_API_URL || ' http://localhost:8000'

export const { signIn, signOut, auth, handlers } = NextAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  providers: [
    Credentials({
      id: 'credentials',
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize({ email, password }) {
        try {
          const response = await axios.post(`${api_url}/api/login`, {
            email,
            password,
          })

          if (!response.status) return null

          if (response.data.user) {
            return {
              id: response.data.user.id,
              name: response.data.user.name,
              email: response.data.user.email,
              token: response.data.access_token,
            }
          }
        } catch {
          return null
        }

        return null
      },
    }),
    CredentialsProvider({
      id: 'register',
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
        confirmPassword: { label: 'confirmPassword', type: 'password' },
        name: { label: 'Name' },
      },
      async authorize({ email, password, confirmPassword, name }) {
        try {
          const response = await axios.post(`${api_url}/api/register`, {
            email,
            password,
            password_confirmation: confirmPassword,
            name,
          })

          if (!response.status) return null

          console.log('response', response)

          if (response.data.user) {
            return {
              id: response.data.user.id,
              name: response.data.user.name,
              email: response.data.user.email,
              token: response.data.access_token,
            }
          }
        } catch {
          return null
        }

        return null
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.token
      }
      return token
    },
    async session({ session, token }) {
      session.access_token = `${token.access_token}`
      return session
    },
  },
})
