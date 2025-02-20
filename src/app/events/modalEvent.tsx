import IconButton from '@/components/icon-button'
import type { Event } from '@/types/event'
import { X } from 'lucide-react'
import EventForm from './eventsForm'

interface ModalEventProps {
  event: Event | null
  setVisible: (arg: boolean) => void
  visible?: boolean
  handleUpdateOrCreate: (event: Event) => void
}

export default function ModalEvent({
  event,
  setVisible,
  visible = false,
  handleUpdateOrCreate,
}: ModalEventProps) {
  return (
    <>
      {visible && (
        <div className="w-96 md:w-xl fixed left-1/2 top-8 -translate-x-1/2 bg-gray-800 shadow-2xl rounded-lg flex flex-col p-8 gap-8">
          <div className="flex justify-between">
            <h1 className="text-bold text-lg">
              {event?.name || 'Criar novo evento'}
            </h1>
            <IconButton onClick={() => setVisible(!visible)}>
              <X className="size-5" />
            </IconButton>
          </div>
          <EventForm
            event={event}
            handleCreate={handleUpdateOrCreate}
            setModalVisible={setVisible}
          />
        </div>
      )}
    </>
  )
}
