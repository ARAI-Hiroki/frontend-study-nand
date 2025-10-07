"use client"; // フック内で 'use client' 境界内の機能を使うため
import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { GridSize, GridData, Cell } from '../../types';
import { updateTileState } from './gridService'; // 追加
import { useFileOperations } from '@/features/controls/hooks/useFileOperations';
import { useGridState } from '../hooks/useGridState';
import { useSimulation } from '../hooks/useSimulations';

const SIMULATION_INTERVAL_MS = 100; // 0.1秒ごと。この数値を調整して速度を変更


/**
 * 指定されたサイズの空のグリッドデータを生成するヘルパー関数
 */
const createEmptyGrid = (size: GridSize): GridData => {
  return Array.from({ length: size.z }, () =>
    Array.from({ length: size.y }, () =>
      Array.from({ length: size.x }, () => ({}))
    )
  );
};

// カスタムフックの定義
export const useGridSimulator = (initialGridSize: GridSize) => {


  const { gridSize, gridData, setGridData, handleGridSizeChange } = useGridState(initialGridSize);
  const { isRunning, handleStart, handleStep, handleStop, handleReset } = useSimulation({ gridData, gridSize, setGridData });
  const { handleDownload, handleFileUpload } = useFileOperations({ gridData, gridSize, setGridData });


  const [activeZ, setActiveZ] = useState<number>(0);

  // --- 副作用フック ---
  useEffect(() => {
    if (activeZ >= gridSize.z) {
      setActiveZ(Math.max(0, gridSize.z - 1));
    }
  }, [gridSize.z, activeZ]);


  const handleActiveZChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveZ(parseInt(e.target.value));
  };


  const handleTileClick = (z: number, y: number, x: number, isCtrlPressed: boolean) => {
    const nextGridData = updateTileState(gridData, { z, y, x }, isCtrlPressed);
    setGridData(nextGridData);
  };


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
    handleFileUpload,
  };
};