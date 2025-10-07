import { Cell, GridData } from '../../types';

const isBlankArr = (subArr: Cell[]): boolean => {
  // セルが空オブジェクト{}かどうかをチェックする
  return subArr.every(cell => Object.keys(cell).length === 0);
};

export const trimRow = (arr: GridData): GridData => {
  let firstNonBlankRow = Infinity;
  for (let z = 0; z < arr.length; z++) {
    for (let y = arr[z].length - 1; y >= 0; y--) {
      // isBlankArrを使ってチェックするように修正
      if (!isBlankArr(arr[z][y])) {
        firstNonBlankRow = Math.min(firstNonBlankRow, y);
      }
    }
  }

  if (firstNonBlankRow === Infinity) return arr;

  // 元の配列を直接変更するのではなく、新しい配列を作成して返すように修正
  const newArr = JSON.parse(JSON.stringify(arr));
  for (let z = 0; z < newArr.length; z++) {
    newArr[z].splice(0, firstNonBlankRow);
  }
  return newArr;
};

export const trim3DArray = (arr: GridData): GridData => {
  // transposeとrotateLayer90がCell型を扱えるように修正
  const transpose = (matrix: Cell[][]): Cell[][] => {
    if (!matrix.length || !matrix[0].length) return [];
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
  };
  
  const rotateLayer90 = (layer: Cell[][]): Cell[][] => transpose(layer.reverse());
  const rotate3D90 = (array: GridData): GridData => array.map(rotateLayer90);

  let result: GridData = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < 4; i++) {
    result = rotate3D90(result);
    result = trimRow(result);
  }
  return result;
};