import { FC } from 'react';
import { useGridSimulatorContext } from '../../GridSimulatorContext'; // Contextフックをインポート
import UploadButton from './components/UploadButton';
import DownloadButton from './components/DownloadButton';
import BoardResizer from './components/BoardResizer';
import StepButton from './components/StepButton';
import StartButton from './components/StartButton';
import StopButton from './components/StopButton';
import HintButton from './components/HintButton';


const Controls: FC = () => {

  const {
    handleReset, isRunning
  } = useGridSimulatorContext();

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg space-y-6">
      
      <BoardResizer />

      <hr />

      <div className="flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <StepButton />
           {isRunning ? <StopButton /> : <StartButton />}
          <button 
            onClick={handleReset} 
            className="px-4 py-2 bg-gray-300 text-black font-bold rounded-md hover:bg-gray-400 transition-colors duration-200"
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
  );
};

export default Controls;