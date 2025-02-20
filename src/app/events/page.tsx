'use client'

import { Card } from '@/app/events/card'
import IconButton from '@/components/icon-button'
import { Calendar } from '@/components/ui/calendar'
import { useAuth } from '@/hooks/useAuth'
import useEvents from '@/hooks/useEvents'
import type { Event } from '@/types/event'
import { Loader, LogOut, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import ModalEvent from './modalEvent'

export default function Events() {
  const {
    getAllEvents,
    events,
    error,
    loading,
    filteredEvents,
    filterEvents,
    createOrUpdateEvent,
    deleteEvent,
  } = useEvents()
  const { handleSignOut } = useAuth({ redirectPath: '/login' })
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
  const [eventClicked, setEventClicked] = useState<Event | null>(null)

  const handleClickEvent = (id: string | undefined) => {
    if (id) {
      setEventClicked(events.filter(event => event.id === id)[0])
      setModalIsVisible(true)
    }
  }

  const handleCreateNewEvent = () => {
    setEventClicked(null)
    setModalIsVisible(true)
  }

  const handleDeleteEvent = async (id: string | undefined) => {
    if (id) await deleteEvent(id)
  }

  const [date, setDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    getAllEvents()
  }, [getAllEvents])

  useEffect(() => {
    if (date && events.length) filterEvents(date)
  }, [date, filterEvents, events])

  return (
    <div className="w-full p-8 md:w-4xl md:mx-auto flex flex-col relative gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl text-bold">Meus eventos</h1>
        <IconButton onClick={handleSignOut}>
          <LogOut />
        </IconButton>
      </div>
      <div className="flex flex-col md:flex-row justify-start items-center flex-wrap gap-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-fit"
        />
        <button
          type="button"
          onClick={handleCreateNewEvent}
          className="h-72 w-3xs bg-gray-800 rounded-lg flex flex-col justify-center items-center gap-2 text-2xl"
        >
          Adicionar <br />
          novo evento
          <Plus className="size-7" />
        </button>
        {filteredEvents.map(event => (
          <Card
            event={event}
            key={event.id}
            handleClick={handleClickEvent}
            handleDelete={handleDeleteEvent}
          />
        ))}
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white opacity-15 z-50">
          <Loader className="size-10 text-gray-900" />
        </div>
      )}

      <ModalEvent
        event={eventClicked}
        visible={modalIsVisible}
        setVisible={setModalIsVisible}
        handleUpdateOrCreate={createOrUpdateEvent}
      />
    </div>
  )
}
