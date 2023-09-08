"use client"
import { useEffect, useState } from "react"

export const useLocation = () => {
  const [address, setAddress] = useState<string>("")
  const [isValid, setIsValid] = useState(false)
  const [location, setLocation] = useState({
    lat: -1,
    lon: -1,
  })

  const checkValid = ()=> {
    if(location.lat === -1 && location.lon === -1) {
      return setIsValid(false)
    }
    return setIsValid(true)
  }

  useEffect(()=> {
    checkValid()
  }, [address])

  return {
    address,
    setAddress,
    location,
    setLocation,
    isValid
  }
}
