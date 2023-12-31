import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { LatLngExpression } from "leaflet"
import { twMerge } from "tailwind-merge"

dayjs.extend(relativeTime)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function distanceInKm(positions: any) {
  const [lat1, lon1] = positions[0]
  const [lat2, lon2] = positions[1]
  // Radius of the Earth in kilometers
  const R = 6371

  // Convert latitude and longitude to radians
  const lat1Radians = (lat1 * Math.PI) / 180
  const lon1Radians = (lon1 * Math.PI) / 180
  const lat2Radians = (lat2 * Math.PI) / 180
  const lon2Radians = (lon2 * Math.PI) / 180

  // Calculate the distance between the two points
  const d = Math.acos(
    Math.sin(lat1Radians) * Math.sin(lat2Radians) +
      Math.cos(lat1Radians) *
        Math.cos(lat2Radians) *
        Math.cos(lon2Radians - lon1Radians)
  )

  // Return the distance in kilometers
  return d * R
}

export function timeFromNow(date: string): string {
  return dayjs(date).fromNow()
}

export function captilizeWord(word: string): string {
  return word[0].toUpperCase() + word.substring(1)
}

export function ageFormat(age: number): string {
  if (age === 1) {
    return `${age} year old`
  }
  return `${age} years old`
}
