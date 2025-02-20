import type { Event } from '@/types/event'
import { MapPin, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'

interface CardContainerProps {
  event: Event
  handleClick: (id: string | undefined) => void
  handleDelete: (id: string | undefined) => void
}

export function Card({ event, handleClick, handleDelete }: CardContainerProps) {
  return (
    <div className="relative flex flex-col h-72 w-3xs bg-gray-800 rounded-lg shadow-2xl">
      <Image
        className="w-full h-24 rounded-t-lg object-cover p-1"
        src={`http://localhost:8000/storage/${event.image}`}
        alt={event.name}
        width={100}
        height={100}
      />
      <div className="flex flex-col h-full justify-center px-8">
        <h3 className="font-semibold text-lg py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {event.name}
        </h3>
        <div className="flex flex-col">
          <div className="flex gap-1 items-center border-t-2 pt-2">
            <span>
              <MapPin className="size-4" />
            </span>
            <h4 className="font-semibold text-sm leading-0">Local</h4>
          </div>
          <p className="text-xs text-gray-400 max-h-12">
            {event.city} - {event.state} <br />
            {event.address} {event.number && `, ${event.number}`}{' '}
            {event.complement && `, ${event.complement}`}
          </p>
        </div>
        <h4 className="font-semibold text-sm">
          Contato <span className="text-xs text-gray-400">{event.phone}</span>
        </h4>
        <h4 className="font-semibold text-sm">
          Data{' '}
          <span className="text-xs text-gray-400">{event.event_datetime}</span>
        </h4>
      </div>
      <div className="absolute top-2.5 right-2.5 flex gap-2">
        <button
          type="button"
          className=" p-2 bg-gray-800 rounded-full"
          onClick={() => handleDelete(event.id)}
        >
          <Trash className="size-4 text-red-300" />
        </button>
        <button
          type="button"
          className=" p-2 bg-gray-800 rounded-full"
          onClick={() => handleClick(event.id)}
        >
          <Pencil className="size-4 text-gray-100" />
        </button>
      </div>
    </div>
  )
}
