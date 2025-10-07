import { Cell, Coordinate, GridData } from '@/features/types';
import { TILE_STATUS, TILE_STATUS_ORDER } from '../../constants';

/**
 * 指定された座標のタイルの状態を、定義された順序で次に進めます。
 */
export const updateTileState = (
  gridData: GridData,
  { z, y, x }: Coordinate,
  isCtrlPressed: boolean
): GridData => {
  const newGridData: GridData = JSON.parse(JSON.stringify(gridData));
  const currentCell = newGridData[z][y][x] || {};

  if (isCtrlPressed) {
    // Ctrlキーが押されている場合は、セルを空の状態にする ({})
    newGridData[z][y][x] = {};
    return newGridData;
  }

  // 現在のセルの主要な種類（line, circuitなど）を探す
  let currentTypeIndex = TILE_STATUS_ORDER.findIndex(
    // cellオブジェクトが'line'などのプロパティをキーとして持ち、その値がtrueかを確認
    type => currentCell[type]
  );

  // もし何も種類がなければ (vacant)、indexは-1になるので0から始める
  if (currentTypeIndex === -1) {
    currentTypeIndex = TILE_STATUS_ORDER.length - 1;
  }

  // 次の種類のインデックスを計算
  const nextTypeIndex = (currentTypeIndex + 1) % TILE_STATUS_ORDER.length;
  const nextType = TILE_STATUS_ORDER[nextTypeIndex];

  // 新しいセルオブジェクトを作成
  const newCell: Cell = {};
  
  // burning状態は、クリック操作では変更せず維持する
  if (currentCell.burning) {
    newCell.burning = true;
  }
  
  // 次の種類がvacantでなければ、そのプロパティをtrueにする
  if (nextType !== TILE_STATUS.VACANT) {
      newCell[nextType] = true;
  }

  newGridData[z][y][x] = newCell;
  return newGridData;
};