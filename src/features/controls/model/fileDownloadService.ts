import { GridData } from '../../types';
import { trim3DArray } from './fileDownloadUtils';

/**
 * グリッドデータをJSONファイルとしてダウンロードする
 */
export const downloadGridFile = (gridData: GridData): void => {
  const dataToSave = trim3DArray(gridData);
  const blob = new Blob([JSON.stringify(dataToSave, null, '  ')], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'nand.json';
  link.click();
  URL.revokeObjectURL(link.href);
};