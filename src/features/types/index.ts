import { TILE_STATUS } from '../constants';

// TILE_STATUSオブジェクトの値（'line', 'circuit'など）を型として取り出す
export type TileStatus = typeof TILE_STATUS[keyof typeof TILE_STATUS];

// これが新しいCellの型定義
// 各TileStatusをキーとして持ち、その値がbooleanか未定義であるオブジェクト
export type Cell = {
  [K in TileStatus]?: boolean; // ? はプロパティがなくても良いという意味
};

// 他の型定義は変更なし
export type GridData = Cell[][][];
export type GridSize = { x: number; y: number; z: number; };
export type Coordinate = { z: number; y: number; x: number; };