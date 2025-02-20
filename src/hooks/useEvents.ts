import {
  createEvent,
  deleteEvent as deleteEventAction,
  getEvents,
  updateEvent,
} from '@/services/events/eventService'
import type { Event } from '@/types/event'
import { useCallback, useState } from 'react'

export default function useEvents() {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

  const getAllEvents = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getEvents()

      if (!response) {
        throw new Error('Erro ao buscar os eventos')
      }

      setEvents(response)
    } catch (err: any) {
      console.error(err)
      setError('Ocorreu um erro ao buscar os eventos')
    } finally {
      setLoading(false)
    }
  }, [])

  const filterEvents = useCallback(
    (date: Date) => {
      const filtered = events.filter(event => {
        const eventDate = new Date(event.event_datetime)
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        )
      })
      setFilteredEvents(filtered)
    },
    [events]
  )

  const createOrUpdateEvent = async (event: Event) => {
    try {
      setLoading(true)
      if (event.id) {
        const response = await updateEvent(event.id, event)
        updateEventList(response, event.id)
        return
      }

      const response = await createEvent(event)
      updateEventList(response)
    } catch (err: any) {
      setError('Ocorreu um criar ou atualizar o evento!')
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      setLoading(true)
      const response = await deleteEventAction(id)
      const newEvents = events.filter(event => event.id !== id)
      setEvents([...newEvents])
    } catch (err) {
      setError('Ocorreu ao deletar o evento!')
    } finally {
      setLoading(false)
    }
  }

  const updateEventList = (newEvent: Event, id?: string) => {
    if (!id) {
      setEvents([newEvent, ...events])
      return
    }

    const indice = events.findIndex(event => event.id === newEvent.id)
    events[indice] = newEvent
    setEvents([...events])
  }

  return {
    getAllEvents,
    events,
    filteredEvents,
    filterEvents,
    createOrUpdateEvent,
    deleteEvent,
    error,
    loading,
  }
}
