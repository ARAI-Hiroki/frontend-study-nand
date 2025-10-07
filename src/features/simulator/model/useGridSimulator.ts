'use client' // フック内で 'use client' 境界内の機能を使うため
import { useState, useEffect, ChangeEvent } from 'react'
import { GridSize } from '../../types'
import { updateTileState } from './gridService' // 追加
import { useFileOperations } from '@/features/controls/hooks/useFileOperations'
import { useGridState } from '../hooks/useGridState'
import { useSimulation } from '../hooks/useSimulations'

export const useGridSimulator = (initialGridSize: GridSize) => {
  const { gridSize, gridData, setGridData, handleGridSizeChange } = useGridState(initialGridSize)
  const { isRunning, handleStart, handleStep, handleStop, handleReset } = useSimulation({
    gridData,
    gridSize,
    setGridData
  })
  const { handleDownload, handleFileUpload } = useFileOperations({ gridData, gridSize, setGridData })

  const [activeZ, setActiveZ] = useState<number>(0)

  // --- 副作用フック ---
  useEffect(() => {
    if (activeZ >= gridSize.z) {
      setActiveZ(Math.max(0, gridSize.z - 1))
    }
  }, [gridSize.z, activeZ])

  const handleActiveZChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveZ(parseInt(e.target.value))
  }

  const handleTileClick = (z: number, y: number, x: number, isCtrlPressed: boolean) => {
    const nextGridData = updateTileState(gridData, { z, y, x }, isCtrlPressed)
    setGridData(nextGridData)
  }

  return {
    gridSize,
    gridData,
    activeZ,
    isRunning,
    handleGridSizeChange,
    handleActiveZChange,
    handleTileClick,
    handleStart,
    handleStep,
    handleStop,
    handleReset,
    handleDownload,
    handleFileUpload
  }
}
