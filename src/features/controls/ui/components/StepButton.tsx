import { FC } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useGridSimulatorContext } from '@/features/GridSimulatorContext';

const StepButton: FC = () => {
  const { handleStep } = useGridSimulatorContext();

  return (
    <button
      onClick={handleStep}
      className="inline-flex items-center justify-center p-2 bg-gray-700 text-white rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer transition-colors duration-200"
      title="1ステップ進める"
    >
      <PlayIcon className="h-6 w-6" />
    </button>
  );
};

export default StepButton;