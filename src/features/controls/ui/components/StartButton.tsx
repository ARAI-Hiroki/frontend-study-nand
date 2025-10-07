import { FC } from 'react'
import { ForwardIcon } from '@heroicons/react/24/solid'
import { useGridSimulatorContext } from '@/features/GridSimulatorContext'

const StartButton: FC = () => {
  const { handleStart } = useGridSimulatorContext()

  return (
    <button
      onClick={handleStart}
      className="inline-flex cursor-pointer items-center justify-center rounded-md bg-gray-700 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
      title="シミュレーションを開始（連続実行）"
    >
      <ForwardIcon className="h-6 w-6" />
    </button>
  )
}

export default StartButton
