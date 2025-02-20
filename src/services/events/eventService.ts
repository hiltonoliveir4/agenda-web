import axiosInstance from '@/lib/axios'
import { cleanEmptyValues } from '@/lib/cleanEmptyValues'
import type { Event } from '@/types/event'

export const getEvents = (): Promise<Event[]> => {
  return axiosInstance.get('/events').then(response => response.data)
}

export const getEvent = (id: string): Promise<Event> => {
  return axiosInstance.get(`/events/${id}`).then(response => response.data)
}

export const createEvent = (data: Omit<Event, 'id'>): Promise<Event> => {
  return axiosInstance
    .post('/events', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(response => response.data)
}

export const updateEvent = (id: string, data: Event): Promise<Event> => {
  return axiosInstance
    .put(`/events/${id}`, cleanEmptyValues(data))
    .then(response => response.data)
}

export const deleteEvent = (id: string): Promise<Event> => {
  return axiosInstance.delete(`/events/${id}`).then(response => response.data)
}
