import { Cell, GridData } from '../../types';

const isBlankArr = (subArr: Cell[]): boolean => {
  return subArr.every(cell => Object.keys(cell).length === 0);
};

export const trimRow = (arr: GridData): GridData => {
  let firstNonBlankRow = Infinity;
  for (let z = 0; z < arr.length; z++) {
    for (let y = arr[z].length - 1; y >= 0; y--) {
      if (!isBlankArr(arr[z][y])) {
        firstNonBlankRow = Math.min(firstNonBlankRow, y);
      }
    }
  }

  if (firstNonBlankRow === Infinity) return arr;

  const newArr = JSON.parse(JSON.stringify(arr));
  for (let z = 0; z < newArr.length; z++) {
    newArr[z].splice(0, firstNonBlankRow);
  }
  return newArr;
};

export const trim3DArray = (arr: GridData): GridData => {
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