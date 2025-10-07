import { FC, ChangeEvent } from 'react';
// useRefをインポートから削除
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useGridSimulatorContext } from '@/features/GridSimulatorContext';

const UploadButton: FC = () => {
  const { handleFileUpload } = useGridSimulatorContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e);
    e.target.value = '';
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <label
        className="relative inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors duration-200"
        title="ファイルをアップロード"
      >
        <ArrowUpTrayIcon className="h-6 w-6" />

        <input
          type="file"
          onChange={handleChange}
          accept=".json"
          className="hidden"
        />
      </label>
    </div>
  );
};

export default UploadButton;