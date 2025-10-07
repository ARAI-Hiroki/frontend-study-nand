import { TILE_STATUS } from '../constants'

export type TileStatus = (typeof TILE_STATUS)[keyof typeof TILE_STATUS]

export type Cell = {
  [K in TileStatus]?: boolean
}

export type GridData = Cell[][][]
export type GridSize = { x: number; y: number; z: number }
export type Coordinate = { z: number; y: number; x: number }
