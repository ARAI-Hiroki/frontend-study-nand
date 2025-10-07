import { Cell, GridData } from '@/features/types'

/**
 * グリッドの状態のリセット (burningとignitionを解除)
 */
export const resetGridState = (gridData: GridData): GridData => {
  return gridData.map((layer) =>
    layer.map((row) =>
      row.map((cell) => {
        const newCell: Cell = { ...cell }

        if (newCell.ignition) {
          delete newCell.ignition
          newCell.line = true
        }

        delete newCell.burning

        return newCell
      })
    )
  )
}
