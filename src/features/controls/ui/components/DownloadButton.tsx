import { FC } from 'react'
// 1. Heroiconsからダウンロード用のアイコンをインポート
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { useGridSimulatorContext } from '@/features/GridSimulatorContext'

const DownloadButton: FC = () => {
  const { handleDownload } = useGridSimulatorContext()

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center justify-center p-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer transition-colors duration-200"
      title="ファイルをダウンロード"
    >
      <ArrowDownTrayIcon className="h-6 w-6" />
    </button>
  )
}

export default DownloadButton
