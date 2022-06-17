import { useState } from "react"

export const useFetching = (callback) => {

  const [isLoading, setIsLoading] = useState(false)

  const fetching = async () => {
    try {
      setIsLoading(true)
      await callback()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading]
}