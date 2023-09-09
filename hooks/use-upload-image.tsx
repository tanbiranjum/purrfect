import { useUploadThing } from '@/lib/uploadthings'
import React, { useState } from 'react'

const useUploadImage = () => {


    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: (
          res:
            | {
                fileUrl: string
                fileKey: string
              }[]
            | undefined
        ) => {
          const fileUrl = res?.map((file: any) => file.fileUrl)[0]
          alert("uploaded successfully!")
        },
        onUploadError: () => {
          alert("error occurred while uploading")
        },
      })

  return {
    startUpload  }
}

export default useUploadImage