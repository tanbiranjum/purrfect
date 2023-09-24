"use client"

import React, { useState } from "react"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { Marker, Polyline, Popup } from "react-leaflet"

import { distanceInKm } from "@/lib/utils"

import Map from "./map/map"
import { Button } from "./ui/button"

type Props = {
  lat: number | undefined
  lon: number | undefined
}

interface UserLocation {
  latitude: number | null
  longtitude: number | null
}

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
  return (
    <div className="h-full">
      <Map
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
      </Map>
      {userLocation?.latitude && (
        <p>You are approximately {distanceInKm(polylinePositions).toFixed(2)}KM far</p>
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
