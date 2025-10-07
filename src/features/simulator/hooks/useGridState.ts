import { useState } from 'react'
import { GridSize, GridData, Cell } from '../../types'
import { initializeGridWithData } from '../model/gridInitializationService'
import halfAdderData from '../model/half-adder.json'

const createEmptyGrid = (size: GridSize): GridData => {
  return Array.from({ length: size.z }, () =>
    Array.from({ length: size.y }, () => Array.from({ length: size.x }, () => ({})))
  )
}

export const useGridState = (initialGridSize: GridSize) => {
  const [gridSize, setGridSize] = useState<GridSize>(initialGridSize)
  const [gridData, setGridData] = useState<GridData>(() => {
    const emptyGrid = createEmptyGrid(initialGridSize)
    const position = { x: 5, y: 2, z: 0 }
    return initializeGridWithData(emptyGrid, halfAdderData as GridData, position)
  })

  const handleGridSizeChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const newSizeValue = Math.max(1, value)
    const newGridSize = { ...gridSize, [axis]: newSizeValue }

    setGridData((prevGridData) => {
      const newGrid: GridData = []
      for (let z = 0; z < newGridSize.z; z++) {
        const newLayer: Cell[][] = []
        for (let y = 0; y < newGridSize.y; y++) {
          const newRow: Cell[] = []
          for (let x = 0; x < newGridSize.x; x++) {
            newRow.push(prevGridData[z]?.[y]?.[x] || {})
          }
          newLayer.push(newRow)
        }
        newGrid.push(newLayer)
      }
      return newGrid
    })

    setGridSize(newGridSize)
  }

  return {
    gridSize,
    gridData,
    setGridData,
    handleGridSizeChange
  }
}
