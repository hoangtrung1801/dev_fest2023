import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
  onFilesUploaded: (files: File[]) => void 
}

export const ImageDropZone: React.FC<Props> = ({ onFilesUploaded }) => {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: any[]) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }, [])
  
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  const images = files.map(file => (
    <div key={file.name}>
      <img src={""} alt={file.name} />
    </div>
  ))

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        files.length > 0 ? (
          <aside>
            <h4>Images</h4>
            {images}
          </aside>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )
      }
      <button onClick={() => onFilesUploaded(files)}>
        Upload
      </button>
    </div>
  )
}