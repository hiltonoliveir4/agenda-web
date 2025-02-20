'use client'

import Button from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import type { Event } from '@/types/event'
import { type EventSchemaType, eventSchema } from '@/validations/eventForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, File as IconFile, MapPin, Phone, Text } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface EventFormProps {
  event?: Event | null
  handleCreate: (event: Event) => void
  setModalVisible: (arg: boolean) => void
}

export default function EventForm({
  event,
  handleCreate,
  setModalVisible,
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
  })

  const submit = async (values: EventSchemaType) => {
    try {
      const event = {
        ...values,
        image: values.image[0],
      }

      handleCreate(event)
      setModalVisible(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        <input type="hidden" {...register('id')} defaultValue={event?.id} />
        <div className="space-y-2 w-full">
          <InputRoot>
            <InputIcon>
              <IconFile className="size-5" />
            </InputIcon>
            <label htmlFor="image" className="text-gray-400">
              Escolha sua imagem
            </label>
            <InputField
              {...register('image')}
              id="image"
              type="file"
              className="hidden"
            />
          </InputRoot>
          {errors.image && (
            <p className="text-red-400 text-xs">{`${errors.image.message}`}</p>
          )}
        </div>
        <div className="space-y-2 w-full">
          <InputRoot>
            <InputField
              {...register('event_datetime')}
              id="event_datetime"
              type="datetime-local"
              defaultValue={event?.event_datetime}
            />
          </InputRoot>
          {errors.event_datetime && (
            <p className="text-red-400 text-xs">{`${errors.event_datetime.message}`}</p>
          )}
        </div>
      </div>
      <div className="w-full space-y-2">
        <InputRoot>
          <InputIcon>
            <Text className="size-5" />
          </InputIcon>
          <InputField
            {...register('name')}
            placeholder="Nome do evento"
            defaultValue={event?.name}
          />
        </InputRoot>
        {errors.name && (
          <p className="text-red-400 text-xs">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        <div className="w-full space-y-2">
          <InputRoot>
            <InputIcon>
              <MapPin className="size-5" />
            </InputIcon>
            <InputField
              {...register('city')}
              placeholder="Cidade"
              defaultValue={event?.city}
            />
          </InputRoot>
          {errors.city && (
            <p className="text-red-400 text-xs">{errors.city.message}</p>
          )}
        </div>
        <div className="w-full space-y-2">
          <InputRoot>
            <InputIcon>
              <MapPin className="size-5" />
            </InputIcon>
            <InputField
              {...register('state')}
              placeholder="Estado"
              defaultValue={event?.state}
            />
          </InputRoot>
          {errors.state && (
            <p className="text-red-400 text-xs">{errors.state.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        <div className="w-full space-y-2">
          <InputRoot>
            <InputIcon>
              <MapPin className="size-5" />
            </InputIcon>
            <InputField
              {...register('address')}
              placeholder="Endereço"
              defaultValue={event?.address}
            />
          </InputRoot>
          {errors.address && (
            <p className="text-red-400 text-xs">{errors.address.message}</p>
          )}
        </div>
        <div className="w-full space-y-2">
          <InputRoot>
            <InputIcon>
              <MapPin className="size-5" />
            </InputIcon>
            <InputField
              {...register('number')}
              placeholder="Numero"
              defaultValue={event?.number}
            />
          </InputRoot>
          {errors.number && (
            <p className="text-red-400 text-xs">{errors.number.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        <div className="w-full space-y-2">
          <InputRoot>
            <InputIcon>
              <MapPin className="size-5" />
            </InputIcon>
            <InputField
              {...register('complement')}
              placeholder="Complemento"
              defaultValue={event?.complement}
            />
          </InputRoot>
          {errors.complement && (
            <p className="text-red-400 text-xs">{errors.complement.message}</p>
          )}
        </div>
        <div className="w-full space-y-2">
          <InputRoot>
            <InputIcon>
              <Phone className="size-5" />
            </InputIcon>
            <InputField
              {...register('phone')}
              placeholder="Telefone"
              defaultValue={event?.phone}
            />
          </InputRoot>
          {errors.phone && (
            <p className="text-red-400 text-xs">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <Button type="submit">
        Salvar
        <ArrowRight />
      </Button>
    </form>
  )
}
