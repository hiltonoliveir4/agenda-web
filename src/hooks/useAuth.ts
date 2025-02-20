import axiosInstance from '@/lib/axios'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type AuthProps = {
  redirectPath: string
}

export function useAuth({ redirectPath }: AuthProps) {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (data: {
    email: string
    password: string
  }) => {
    try {
      setLoading(true)
      const response = await signIn('credentials', { ...data, redirect: false })

      if (response?.error) throw new Error('Credenciais inválidas')

      router.push(redirectPath)
    } catch (err: any) {
      console.log(err)
      setError(err.response?.data?.message || 'Ocorreu um erro')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (data: {
    email: string
    password: string
    confirmPassword: string
    name: string
  }) => {
    try {
      setLoading(true)
      const response = await signIn('register', { ...data, redirect: false })

      if (response?.error) throw new Error('Houve um erro ao fazer o registro')

      router.push(redirectPath)
    } catch (err: any) {
      console.log(err)
      setError(err.data || 'Ocorreu um erro ao fazer o registro')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setLoading(true)
      await axiosInstance.post('/logout')
      await signOut()
    } catch (err: any) {
      setError('Ocorreu um erro ao fazer o logout')
    } finally {
      setLoading(false)
    }
  }

  return { handleRegister, handleLogin, error, loading, handleSignOut }
}
