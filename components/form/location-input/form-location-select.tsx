import React, { useState } from "react"

import FormDistrictSelect from "./form-district-select"
import FormDivisionSelect from "./form-division-select"
import FormUpazillaSelect from "./form-upazilla-select"

interface FormLocationSelectProps {
  form: any
}

const FormLocationSelect: React.FC<FormLocationSelectProps> = ({ form }) => {
  const [divisionId, setDivisionId] = useState<string>("1")
  const [districtId, setDistrictId] = useState<string>("1")
  return (
    <>
      <FormDivisionSelect
        form={form}
        name="division"
        label="Division"
        divisionId={divisionId}
        setDivisionId={setDivisionId}
      />
      <FormDistrictSelect
        form={form}
        name="district"
        label="District"
        divisionId={divisionId}
        setDistrictId={setDistrictId}
      />
      <FormUpazillaSelect
        form={form}
        name="upazilla"
        label="Upazilla"
        districtId={districtId}
      />
    </>
  )
}

export default FormLocationSelect
