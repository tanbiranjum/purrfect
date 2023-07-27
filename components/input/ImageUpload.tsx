"use client"

import React from "react"
import Image from "next/image"

import "@uploadthing/react/styles.css"
import { UploadButton } from "@/lib/uploadthings"

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const onUploadComplete = (res: any) => {
    const fileUrl = res.map((file: any) => file.fileUrl)[0]
    onChange(fileUrl)
    alert("Upload Completed")
  }

  const onUploadError = (error: Error) => {
    console.log("Error: ", error)
    alert(`ERROR! ${error.message}`)
  }

  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={onUploadComplete}
        onUploadError={onUploadError}
      />
      {value && (
        <>
          <Image src={value} alt="pet picture" width={500} height={500} />
        </>
      )}
    </>
  )
}

export default ImageUpload
