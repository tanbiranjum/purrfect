import React from "react"
import L, { LatLngTuple } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

import "leaflet/dist/leaflet.css"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

import ChangeView from "./change-view"

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

type Props = {
  location: number[]
}

const Map = ({ location }: Props) => {
  return (
    <MapContainer
      center={(location as LatLngTuple) || [51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <ChangeView center={location as LatLngTuple} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location as LatLngTuple}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
