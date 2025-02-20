'use client'

import Button from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { useAuth } from '@/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, EyeClosed, Loader, Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const loginSchema = z.object({
  email: z.string().email('O email é inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginSchemaType = z.infer<typeof loginSchema>

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const { handleLogin, loading, error } = useAuth({
    redirectPath: '/events',
  })

  return (
    <div className="w-full flex justify-center items-center min-h-dvh">
      <div className="flex flex-col justify-center bg-gray-800 w-xl p-8 rounded-lg shadow-2xl m-8">
        <h1 className="text-3xl font-semibold">Login</h1>
        <p className="text-base">Comece a criar eventos agora mesmo!</p>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex w-full flex-col py-4 gap-4"
        >
          <div className="space-y-2">
            <InputRoot>
              <InputIcon>
                <Mail className="size-5" />
              </InputIcon>
              <InputField {...register('email')} placeholder="Email" />
            </InputRoot>
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <InputRoot>
              <InputIcon>
                <Lock className="size-5" />
              </InputIcon>
              <InputField
                {...register('password')}
                type="password"
                placeholder="Senha"
              />
              <InputIcon>
                <EyeClosed className="size-5" />
              </InputIcon>
            </InputRoot>
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando' : 'Entrar'}
            {loading ? <Loader /> : <ArrowRight />}
          </Button>
          {error && <p className="text-red-400 text-xs">{error}</p>}
        </form>
      </div>
    </div>
  )
}
