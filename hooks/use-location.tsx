import { districts, divisions, upazillas } from "bd-geojs"

export const useLocation = () => {
  const getDivisions = () => {
    return divisions
  }

  const getDistricts = (divisionId: string) => {
    return districts.filter((district) => district.division_id === divisionId)
  }

  const getUpazillas = (districtId: string) => {
    return upazillas.filter((upazilla) => upazilla.district_id === districtId)
  }

  return {
    getDivisions,
    getDistricts,
    getUpazillas,
  }
}
