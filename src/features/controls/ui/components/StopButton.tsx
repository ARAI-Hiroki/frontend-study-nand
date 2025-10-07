import { FC } from 'react'
import { PauseIcon } from '@heroicons/react/24/solid'
import { useGridSimulatorContext } from '@/features/GridSimulatorContext'

const StopButton: FC = () => {
  const { handleStop } = useGridSimulatorContext()

  return (
    <button
      onClick={handleStop}
      className="inline-flex cursor-pointer items-center justify-center rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
      title="シミュレーションを停止"
    >
      <PauseIcon className="h-6 w-6" />
    </button>
  )
}

export default StopButton
