import { FC } from 'react'
// 1. Heroiconsからダウンロード用のアイコンをインポート
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { useGridSimulatorContext } from '@/features/GridSimulatorContext'

const DownloadButton: FC = () => {
  const { handleDownload } = useGridSimulatorContext()

  return (
    <button
      onClick={handleDownload}
      className="inline-flex cursor-pointer items-center justify-center rounded-md bg-green-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
      title="ファイルをダウンロード"
    >
      <ArrowDownTrayIcon className="h-6 w-6" />
    </button>
  )
}

export default DownloadButton
