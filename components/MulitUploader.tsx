'use client'
import { useCallback, useState } from 'react'
import { useUploadThing } from '@/lib/uploadthing'
import { useDropzone } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface MultiUploaderProps {
  onFilesUploaded: (files: File[]) => void
}

export function MultiUploader({ onFilesUploaded }: MultiUploaderProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles)
      onFilesUploaded(acceptedFiles)
    },
    [onFilesUploaded]
  )

  const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
    onClientUploadComplete: () => {
      alert('Uploaded successfully!')
    },
    onUploadError: () => {
      alert('Error occurred while uploading')
    },
    onUploadBegin: () => {
      alert('Upload has begun')
    },
  })

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo.config)
    : []

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  })

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <div className="grid grid-cols-2 place-items-center h-52 border-2 rounded-md flex-col">
        {files.length ? (
          files.map((item, index) => (
            <Image
              key={index}
              src={URL.createObjectURL(item)} // Create a temporary URL
              alt={item.name}
              height={100}
              width={100}
              className="aspect-video w-full"
              objectFit="cover"
            />
          ))
        ) : (
          <p className="col-span-2">Upload Property Images</p>
        )}
      </div>
      {files.length > 0 && (
        <Button
          type="button"
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => startUpload(files)}
        >
          Upload {files.length} files
        </Button>
      )}
    </div>
  )
}
