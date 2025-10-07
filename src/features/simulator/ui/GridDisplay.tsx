import { FC, MouseEvent } from 'react';
import { useGridSimulatorContext } from '../../GridSimulatorContext';
import { Cell } from '../../types';
import { STYLE_CONSTANTS } from '../../constants';

/**
 * セルオブジェクトからclass属性用の文字列を返す
 * @param cell 
 * @returns 
 */
const getClassNameFromCell = (cell: Cell): string => {
  return Object.entries(cell)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(' ');
};

/**
 * レイヤーの不透明度と操作可否を決定するCSSクラスを返す
 * @param zIndex - 現在のレイヤー番号
 * @param activeZ - 選択中のレイヤー番号
 * @returns Tailwind CSSのクラス文字列
 */
const getLayerClasses = (zIndex: number, activeZ: number): string => {
  const diff = Math.abs(zIndex - activeZ);
  switch (diff) {
    case 0:
      // 選択中のレイヤー
      return 'opacity-100';
    case 1:
      // 隣のレイヤー
      return 'opacity-[.20] pointer-events-none';
    default:
      // 2つ以上離れたレイヤー
      return 'opacity-[.10] pointer-events-none';
  }
};

const GridDisplay: FC = () => {
  const { gridData, activeZ, gridSize, handleTileClick } = useGridSimulatorContext();

  const contentHeight = `${gridSize.y * (STYLE_CONSTANTS.TILE_SIZE + STYLE_CONSTANTS.TILE_BORDER * 2) + gridSize.z * STYLE_CONSTANTS.LAYER_OFFSET}px`;
  const contentWidth = `${gridSize.x * (STYLE_CONSTANTS.TILE_SIZE + STYLE_CONSTANTS.TILE_BORDER * 2) + (gridSize.z > 0 ? (gridSize.z - 1) * STYLE_CONSTANTS.LAYER_OFFSET : 0)}px`;

  return (
    <div
      className="w-full max-w-7xl mx-auto overflow-x-auto overflow-y-hidden p-4"
    >
      <div
        id="main-table-wrapper"
        className="relative mx-auto"
        style={{ height: contentHeight, width: contentWidth }}
      >
        {gridData.map((layer, zIndex) => (
          <table
            key={zIndex}
            className={`absolute border-collapse transition-opacity duration-300 ${getLayerClasses(zIndex, activeZ)}`}
            style={{
              top: `${STYLE_CONSTANTS.LAYER_OFFSET * zIndex}px`,
              left: `${STYLE_CONSTANTS.LAYER_OFFSET * zIndex}px`,
              zIndex: gridSize.z - zIndex,
            }}
          >
            <tbody>
              {layer.map((row, yIndex) => (
                <tr key={yIndex}>
                  {row.map((cell, xIndex) => (
                    <td
                      key={xIndex}
                      className={`cell ${getClassNameFromCell(cell) || 'vacant'}`}
                      onClick={(e: MouseEvent<HTMLTableCellElement>) => handleTileClick(zIndex, yIndex, xIndex, e.ctrlKey || e.metaKey)}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default GridDisplay;