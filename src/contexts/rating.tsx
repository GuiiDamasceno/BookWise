'use client'

import { useSession } from 'next-auth/react'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface RatingProviderProps {
  children: ReactNode
}

interface RatingContextValue {
  availableForm: boolean
  ratingFormVisible: boolean
  setRatingFormVisible: (visible: boolean) => void
}

export const RatingContext = createContext({} as RatingContextValue)

export function RatingProvider({ children }: RatingProviderProps) {
  const [ratingFormVisible, setRatingFormVisible] = useState(false)
  const [ratingFormAvailable, setRatingFormAvailable] = useState(false)

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      setRatingFormAvailable(true)
    } else {
      setRatingFormAvailable(false)
    }
  }, [session])

  return (
    <RatingContext.Provider
      value={{
        availableForm: ratingFormAvailable,
        ratingFormVisible,
        setRatingFormVisible,
      }}
    >
      {children}
    </RatingContext.Provider>
  )
}

export const useRating = () => useContext(RatingContext)
