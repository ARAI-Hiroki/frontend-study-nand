import { FC } from 'react'
import { useGridSimulatorContext } from '../../GridSimulatorContext' // Contextフックをインポート
import UploadButton from './components/UploadButton'
import DownloadButton from './components/DownloadButton'
import BoardResizer from './components/BoardResizer'
import StepButton from './components/StepButton'
import StartButton from './components/StartButton'
import StopButton from './components/StopButton'
import HintButton from './components/HintButton'

const Controls: FC = () => {
  const { handleReset, isRunning } = useGridSimulatorContext()

  return (
    <div className="mx-auto my-8 max-w-3xl space-y-6 rounded-xl bg-white p-6 shadow-lg">
      <BoardResizer />

      <hr />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <StepButton />
          {isRunning ? <StopButton /> : <StartButton />}
          <button
            onClick={handleReset}
            className="rounded-md bg-gray-300 px-4 py-2 font-bold text-black transition-colors duration-200 hover:bg-gray-400"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <DownloadButton />
          <UploadButton />
          <HintButton />
        </div>
      </div>
    </div>
  )
}

export default Controls
