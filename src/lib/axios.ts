import axios from 'axios'
import { getSession } from 'next-auth/react'

const api_url = process.env.NEXT_PUBLIC_API_URL || ' http://localhost:8000'

const axiosInstance = axios.create({
  baseURL: `${api_url}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async config => {
    const session = await getSession()

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default axiosInstance
