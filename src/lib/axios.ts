import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://book-wise-sigma.vercel.app/api',
})
