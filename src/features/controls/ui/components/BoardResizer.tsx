import { FC, ChangeEvent } from 'react';
import { useGridSimulatorContext } from '@/features/GridSimulatorContext';

const BoardResizer: FC = () => {
  const {
    gridSize,
    activeZ,
    handleGridSizeChange,
    handleActiveZChange,
  } = useGridSimulatorContext();

  const inputStyle = "w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="flex items-center space-x-4">
        
        {/* --- Board Dimensions --- */}
        <div className="flex items-center space-x-2">
          <label htmlFor="board-x" className="font-medium text-gray-700">X:</label>
          <input
            id="board-x"
            type="number"
            value={gridSize.x}
            onChange={(e) => handleGridSizeChange('x', parseInt(e.target.value) || 1)}
            className={inputStyle}
          />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="board-y" className="font-medium text-gray-700">Y:</label>
          <input
            id="board-y"
            type="number"
            value={gridSize.y}
            onChange={(e) => handleGridSizeChange('y', parseInt(e.target.value) || 1)}
            className={inputStyle}
          />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="board-z" className="font-medium text-gray-700">Z:</label>
          <input
            id="board-z"
            type="number"
            value={gridSize.z}
            onChange={(e) => handleGridSizeChange('z', parseInt(e.target.value) || 1)}
            className={inputStyle}
          />
        </div>
        
        {/* --- Active Layer Selector --- */}
        <div className="flex items-center space-x-2">
           <label htmlFor="active-layer" className="font-medium text-gray-700">Layer:</label>
           <select
            id="active-layer"
            value={activeZ}
            onChange={handleActiveZChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {Array.from({ length: gridSize.z }).map((_, i) => (
              <option key={i} value={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BoardResizer;