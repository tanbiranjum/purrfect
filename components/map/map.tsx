import React from "react"
import L, { LatLngTuple } from "leaflet"

import "leaflet/dist/leaflet.css"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

import ChangeView from "./change-view"
import dynamic from "next/dynamic"

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

type Props = {
  location: number[]
  className?: string
  children?: React.ReactNode
  zoom?: number
}

const Map = ({ location, className, zoom, children }: Props) => {
  const MapContainer = dynamic(async ()=> (await import('react-leaflet')).MapContainer, {ssr: false})
  const Marker = dynamic(async ()=> (await import('react-leaflet')).Marker, {ssr: false})
  const Popup = dynamic(async ()=> (await import('react-leaflet')).Popup, {ssr: false})
  const TileLayer = dynamic(async ()=> (await import('react-leaflet')).TileLayer, {ssr: false})
  return (
      <MapContainer
        center={(location as LatLngTuple) || [51.505, -0.09]}
        zoom={zoom || 13}
        scrollWheelZoom={false}
        className={`h-80 rounded-lg ${className}`}
      >
        <ChangeView center={location as LatLngTuple} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location as LatLngTuple}>
          <Popup>Purrfect Adoption</Popup>
        </Marker>
        {children}
      </MapContainer>
  )
}

export default Map
