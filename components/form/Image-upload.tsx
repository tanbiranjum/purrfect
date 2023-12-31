"use client"

import React, { useCallback } from "react"
import Image from "next/image"
import { CatIcon } from "lucide-react"
import { useDropzone, type FileWithPath } from "react-dropzone"
import { generateClientDropzoneAccept } from "uploadthing/client"

interface ImageUploadProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const ImageUpload: React.FC<ImageUploadProps> = ({ files, setFiles }) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["image"] ? generateClientDropzoneAccept(["image"]) : undefined,
  })

  return (
    <div className="flex h-48 w-48 items-center justify-center rounded-md border-2">
      {files.length === 0 && (
        <div {...getRootProps()} className="cursor-pointer p-4">
          <div className="flex justify-center py-4">
            <Image
              src={"/images/pet-house.png"}
              alt="pet icon"
              height={94}
              width={94}
              className="rounded-md"
            />
          </div>
          <input {...getInputProps()} />
          <div className="rounded-full bg-slate-400 px-2 py-1 text-sm font-semibold text-white">
            Drag or Click Here
          </div>
        </div>
      )}
      {files.length !== 0 && (
        <Image
          src={URL.createObjectURL(files[0])}
          alt="pet picture"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      )}
    </div>
  )
}

export default ImageUpload
