import { ChangeEvent } from 'react'
import { GridData, GridSize } from '../../types'
import { loadGridFromFile } from '../model/fileUploadService'
import { downloadGridFile } from '../model/fileDownloadService'

type UseFileOperationsArgs = {
  gridData: GridData
  gridSize: GridSize
  setGridData: (data: GridData) => void
}

export const useFileOperations = ({ gridData, gridSize, setGridData }: UseFileOperationsArgs) => {
  const handleDownload = () => {
    downloadGridFile(gridData)
  }

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const nextGridData = await loadGridFromFile(file, gridData, gridSize)
      setGridData(nextGridData)
    } catch (error) {
      console.error(error)
      alert((error as Error).message)
    }
  }

  return { handleDownload, handleFileUpload }
}
