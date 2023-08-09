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

  const getDivisionName = (divisionId: string) => {
    return divisions.find((division) => division.id === divisionId)?.name
  }

  const getDistrictName = (districtId: string) => {
    return districts.find((district) => district.id === districtId)?.name
  }

  const getUpazillaName = (upazillaId: string) => {
    return upazillas.find((upazilla) => upazilla.id === upazillaId)?.name
  }

  return {
    getDivisions,
    getDistricts,
    getUpazillas,
  }
}
