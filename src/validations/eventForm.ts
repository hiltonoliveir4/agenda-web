import z from 'zod'

export const eventSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(6, 'O deve ter pelo menos 6 caracteres'),
  city: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  state: z
    .string()
    .max(2, 'Estado deve ter no máximo 2 caracteres')
    .min(2, 'Estado deve ter no mínimo 2 caracteres'),
  address: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(255, 'Endereço deve ter no máximo 255 caracteres'),
  number: z.string().optional(),
  complement: z
    .string()
    .max(255, 'Complemento deve ter no máximo 255 caracteres')
    .optional(),
  phone: z.string().min(8, 'Telefone deve ter no mínimo 2 caracteres'),
  event_datetime: z
    .string()
    .refine(value => !Number.isNaN(new Date(value).getTime()), {
      message: 'Data e hora inválidas!',
    }),
  image: z.instanceof(FileList, {
    message: 'A imagem é obrigatória',
  }),
})

export type EventSchemaType = z.infer<typeof eventSchema>
