"use client"

import React, { useCallback, useState } from "react"
import Image from "next/image"
import { CatIcon } from "lucide-react"
import { useDropzone, type FileWithPath } from "react-dropzone"
import { generateClientDropzoneAccept } from "uploadthing/client"

import { useUploadThing } from "@/lib/uploadthings"

import { Button } from "../ui/button"

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [files, setFiles] = useState<File[]>([])
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["image"] ? generateClientDropzoneAccept(["image"]) : undefined,
  })

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
      onChange(fileUrl)
      alert("uploaded successfully!")
    },
    onUploadError: () => {
      alert("error occurred while uploading")
    },
  })

  return (
    <>
      <div className="h-48 w-48 border flex justify-center items-center border-rose-600 p-4 rounded-md">
        {files.length === 0 && (
          <div {...getRootProps()} className="cursor-pointer">
            <div className="flex justify-center py-4">
              <CatIcon size={60} color="pink" />
            </div>
            <input {...getInputProps()} />
            <div className="">Drag or Click Here</div>
          </div>
        )}
        {files.length !== 0 && (
          <Image
            src={URL.createObjectURL(files[0])}
            alt="pet picture"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        )}
      </div>
      <div className="">
        <Button
          onClick={(e) => {
            e.preventDefault()
            startUpload(files)
          }}
          type="button"
          className="px-4 py-1 rounded-md bg-pink-600 text-white w-full mt-2"
          disabled={files.length === 0}
        >
          Upload a photo
        </Button>
      </div>
    </>
  )
}

export default ImageUpload
