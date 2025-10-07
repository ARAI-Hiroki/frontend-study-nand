import { FC } from 'react';
import { PauseIcon } from '@heroicons/react/24/solid';
import { useGridSimulatorContext } from '@/features/GridSimulatorContext';

const StopButton: FC = () => {
  const { handleStop } = useGridSimulatorContext();

  return (
    <button
      onClick={handleStop}
      className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer transition-colors duration-200"
      title="シミュレーションを停止"
    >
      <PauseIcon className="h-6 w-6" />
    </button>
  );
};

export default StopButton;