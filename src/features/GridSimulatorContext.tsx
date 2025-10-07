'use client'
import { createContext, useContext, FC, ReactNode } from 'react'
import { useGridSimulator } from '@/features/simulator/model/useGridSimulator'

type GridSimulatorContextType = ReturnType<typeof useGridSimulator>
const GridSimulatorContext = createContext<GridSimulatorContextType | undefined>(undefined)

export const GridSimulatorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const simulator = useGridSimulator({ x: 40, y: 15, z: 3 })

  return <GridSimulatorContext.Provider value={simulator}>{children}</GridSimulatorContext.Provider>
}

export const useGridSimulatorContext = () => {
  const context = useContext(GridSimulatorContext)
  if (context === undefined) {
    throw new Error('useGridSimulatorContext must be used within a GridSimulatorProvider')
  }
  return context
}
