import { Cell, Coordinate, GridData } from '@/features/types'
import { TILE_STATUS, TILE_STATUS_ORDER } from '../../constants'

/**
 * 指定された座標のタイルの状態を、定義された順序で次に進める。
 */
export const updateTileState = (gridData: GridData, { z, y, x }: Coordinate, isCtrlPressed: boolean): GridData => {
  const newGridData: GridData = JSON.parse(JSON.stringify(gridData))
  const currentCell = newGridData[z][y][x] || {}

  if (isCtrlPressed) {
    newGridData[z][y][x] = {}
    return newGridData
  }

  let currentTypeIndex = TILE_STATUS_ORDER.findIndex((type) => currentCell[type])

  if (currentTypeIndex === -1) {
    currentTypeIndex = TILE_STATUS_ORDER.length - 1
  }

  const nextTypeIndex = (currentTypeIndex + 1) % TILE_STATUS_ORDER.length
  const nextType = TILE_STATUS_ORDER[nextTypeIndex]

  const newCell: Cell = {}

  if (currentCell.burning) {
    newCell.burning = true
  }

  if (nextType !== TILE_STATUS.VACANT) {
    newCell[nextType] = true
  }

  newGridData[z][y][x] = newCell
  return newGridData
}
