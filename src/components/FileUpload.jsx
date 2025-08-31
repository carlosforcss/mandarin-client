import { useRef, useState } from 'react'
import { useUploadFile } from '../lib/hooks'

function FileUpload({ onFileUploaded }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef()
  const uploadFile = useUploadFile()

  const handleFileSelect = (file) => {
    if (file) {
      uploadFile.mutate(file, {
        onSuccess: (response) => {
          if (onFileUploaded) {
            onFileUploaded(response.data)
          }
        },
        onError: (error) => {
          console.error('File upload failed:', error)
        }
      })
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } ${uploadFile.isPending ? 'opacity-50' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e.target.files[0])}
          className="hidden"
          accept="image/*"
        />
        
        {uploadFile.isPending ? (
          <div>Uploading...</div>
        ) : (
          <div>
            <div className="text-gray-600 mb-2">
              Click to select or drag and drop a file
            </div>
            <div className="text-sm text-gray-400">
              Supports images and other file types
            </div>
          </div>
        )}
      </div>
      
      {uploadFile.isError && (
        <div className="mt-2 text-red-600 text-sm">
          Upload failed. Please try again.
        </div>
      )}
      
      {uploadFile.isSuccess && (
        <div className="mt-2 text-green-600 text-sm">
          File uploaded successfully!
        </div>
      )}
    </div>
  )
}

export default FileUpload