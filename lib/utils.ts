import { type ClassValue, clsx } from "clsx"
import { LatLngExpression } from "leaflet";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function distanceInKm(positions: any) {
  const [lat1, lon1] = positions[0]
  const [lat2, lon2] = positions[1]
  // Radius of the Earth in kilometers
  const R = 6371;

  // Convert latitude and longitude to radians
  const lat1Radians = lat1 * Math.PI / 180;
  const lon1Radians = lon1 * Math.PI / 180;
  const lat2Radians = lat2 * Math.PI / 180;
  const lon2Radians = lon2 * Math.PI / 180;

  // Calculate the distance between the two points
  const d = Math.acos(
    Math.sin(lat1Radians) * Math.sin(lat2Radians) +
      Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.cos(lon2Radians - lon1Radians)
  );

  // Return the distance in kilometers
  return d * R;
}