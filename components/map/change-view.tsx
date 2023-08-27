import React from "react"
import { useMap } from "react-leaflet"

type Props = {
  center: [number, number]
  zoom: number
}

const ChangeView = ({ center, zoom }: Props) => {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

export default ChangeView
