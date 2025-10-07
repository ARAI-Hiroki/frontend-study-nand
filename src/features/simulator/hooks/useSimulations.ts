import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { GridData, GridSize } from '../../types';
import { runSimulationStep } from '../model/simulationService';
import { resetGridState } from '../../controls/model/gridResetService';

const SIMULATION_INTERVAL_MS = 100;

type UseSimulationArgs = {
  gridData: GridData;
  gridSize: GridSize;
  setGridData: Dispatch<SetStateAction<GridData>>;
};

export const useSimulation = ({ gridData, gridSize, setGridData }: UseSimulationArgs) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  const handleStep = useCallback(() => {
    setGridData(currentGrid => runSimulationStep(currentGrid, gridSize));
  }, [gridSize, setGridData]);

  const handleReset = () => {
    setGridData(resetGridState(gridData));
  };

  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(handleStep, SIMULATION_INTERVAL_MS);
    return () => clearInterval(timerId);
  }, [isRunning, handleStep]);

  return { isRunning, handleStart, handleStop, handleStep, handleReset };
};