import { FC } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { ForwardIcon } from '@heroicons/react/24/solid';
import { useGridSimulatorContext } from '@/features/GridSimulatorContext';

const StartButton: FC = () => {
  // 2. 挙動はStepボタンと同じhandleStartを呼び出す
  const { handleStart } = useGridSimulatorContext();

  return (
    <button
      onClick={handleStart}
      className="inline-flex items-center justify-center p-2 bg-gray-700 text-white rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer transition-colors duration-200"

      title="シミュレーションを開始（連続実行）"
    >
      <ForwardIcon className="h-6 w-6" />
    </button>
  );
};

export default StartButton;