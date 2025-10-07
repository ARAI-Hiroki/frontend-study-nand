import { Cell, GridData } from '@/features/types';

/**
 * グリッドの状態をリセットします (burningとignitionを解除)
 */
export const resetGridState = (gridData: GridData): GridData => {
  return gridData.map(layer =>
    layer.map(row =>
      row.map(cell => {
        const newCell: Cell = { ...cell }; // まず現在のセルをコピー

        // もしignitionだったら、それを消してlineを追加する
        if (newCell.ignition) {
          delete newCell.ignition;
          newCell.line = true;
        }

        // burning状態を削除する
        delete newCell.burning;

        return newCell;
      })
    )
  );
};