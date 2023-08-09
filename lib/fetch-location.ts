import { districts, divisions, upazillas } from "bd-geojs"

export class FetchLocation {
    getDivisions = () => {
        return divisions
    }

    getDistricts = (divisionId: string) => {
        return districts.filter((district) => district.division_id === divisionId)
    }

    getUpazillas = (districtId: string) => {
        return upazillas.filter((upazilla) => upazilla.district_id === districtId)
    }

    getDivisionName = (divisionId: string) => {
        return divisions.find((division) => division.id === divisionId)?.name
    }

    getDistrictName = (districtId: string) => {
        return districts.find((district) => district.id === districtId)?.name
    }

    getUpazillaName = (upazillaId: string) => {
        return upazillas.find((upazilla) => upazilla.id === upazillaId)?.name
    }
}