"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { LatLngExpression, LatLngTuple } from "leaflet"

import { distanceInKm } from "@/lib/utils"

import ClientOnly from "./client-only"
import { Button } from "./ui/button"

type Props = {
  lat: number | undefined
  lon: number | undefined
}

interface UserLocation {
  latitude: number | null
  longtitude: number | null
}

const DynamicMap = dynamic(() => import("./map/map"), { ssr: false })

const CurrentLocation = ({ lat, lon }: Props) => {
  const [userLocation, setUserLocation] = useState<UserLocation>()
  const [zoom, setZoom] = useState(13)
  const [polylinePositions, setPolylinePositions] = useState<
    LatLngExpression[]
  >([[lat as number, lon as number]])

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude
    const longtitude = position.coords.longitude
    setUserLocation({ ...userLocation, latitude, longtitude })
    setPolylinePositions((prevPosition) => [
      ...prevPosition,
      [latitude, longtitude],
    ])
    setZoom(7)
  }

  const error = () => {
    alert("There is an error getting your current information!")
  }

  const Marker = dynamic(async () => (await import("react-leaflet")).Marker, {
    ssr: false,
  })
  const Polyline = dynamic(
    async () => (await import("react-leaflet")).Polyline,
    { ssr: false }
  )
  const Popup = dynamic(async () => (await import("react-leaflet")).Popup, {
    ssr: false,
  })

  return (
    <div className="h-full">
      <ClientOnly>
        <DynamicMap
          location={[lat as number, lon as number]}
          zoom={zoom}
          className="h-80 w-full"
        >
          {polylinePositions.length > 1 && (
            <>
              <Marker
                position={
                  [
                    userLocation?.latitude,
                    userLocation?.longtitude,
                  ] as LatLngTuple
                }
              >
                <Popup>Your Location</Popup>
              </Marker>
              <Polyline positions={polylinePositions} color="blue" />
            </>
          )}
        </DynamicMap>
      </ClientOnly>
      {userLocation?.latitude && (
        <p>
          You are approximately {distanceInKm(polylinePositions).toFixed(2)}KM
          far
        </p>
      )}
      <Button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(success, error)
        }}
        className="mt-4"
      >
        Get current location
      </Button>
    </div>
  )
}

export default CurrentLocation
