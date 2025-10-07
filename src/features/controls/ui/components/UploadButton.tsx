import { FC, ChangeEvent } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useGridSimulatorContext } from '@/features/GridSimulatorContext'

const UploadButton: FC = () => {
  const { handleFileUpload } = useGridSimulatorContext()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col items-start space-y-2">
      <label
        className="relative inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        title="ファイルをアップロード"
      >
        <ArrowUpTrayIcon className="h-6 w-6" />

        <input type="file" onChange={handleChange} accept=".json" className="hidden" />
      </label>
    </div>
  )
}

export default UploadButton
