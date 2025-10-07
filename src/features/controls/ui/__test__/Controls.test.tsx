import { render, screen } from '@testing-library/react'
import Controls from '../Controls'
import { GridSimulatorContext } from '@/features/GridSimulatorContext'
import { useGridSimulator } from '@/features/simulator/model/useGridSimulator'

// Context のモック
const mockSimulatorContext: ReturnType<typeof useGridSimulator> = {
  // Controlsコンポーネントが使用するプロパティや関数をここで定義する
  isRunning: false,
  handleReset: jest.fn(),
  gridSize: { x: 10, y: 10, z: 1 },
  gridData: [],
  activeZ: 0,
  handleGridSizeChange: jest.fn(),
  handleActiveZChange: jest.fn(),
  handleTileClick: jest.fn(),
  handleStart: jest.fn(),
  handleStep: jest.fn(),
  handleStop: jest.fn(),
  handleDownload: jest.fn(),
  handleFileUpload: jest.fn(),
}

describe('Controls Component', () => {
  it('すべてのボタンが表示されるか', () => {
    // 1. render関数でテスト対象のコンポーネントを描画
    //    Contextに依存しているため、Providerでラップしてモックの値を渡す
    render(
      <GridSimulatorContext.Provider value={mockSimulatorContext}>
        <Controls />
      </GridSimulatorContext.Provider>
    )

    // "Reset" ボタンが存在することを確認
    const resetButton = screen.getByRole('button', { name: /reset/i })
    expect(resetButton).toBeInTheDocument()

    // "1ステップ進める" ボタン (StepButton) が存在することを確認
    const stepButton = screen.getByTitle('1ステップ進める')
    expect(stepButton).toBeInTheDocument()

    // isRunning が false なので "Start" ボタンが存在することを確認
    const startButton = screen.getByTitle('シミュレーションを開始（連続実行）')
    expect(startButton).toBeInTheDocument()
    
    // "Stop" ボタンは存在しないことを確認
    const stopButton = screen.queryByTitle('シミュレーションを停止')
    expect(stopButton).not.toBeInTheDocument()

    // "Download" ボタンが存在することを確認
    const downloadButton = screen.getByTitle('ファイルをダウンロード')
    expect(downloadButton).toBeInTheDocument()

    // "Upload" ボタンが存在することを確認
    const uploadButton = screen.getByTitle('ファイルをアップロード')
    expect(uploadButton).toBeInTheDocument()
  })

  it('シミュレーション中に停止ボタンが表示されるか', () => {
    // isRunningがtrueの場合のContextのモックを作成
    const runningContext = { ...mockSimulatorContext, isRunning: true }
    
    render(
      <GridSimulatorContext.Provider value={runningContext}>
        <Controls />
      </GridSimulatorContext.Provider>
    )

    // "Stop" ボタンが存在することを確認
    const stopButton = screen.getByTitle('シミュレーションを停止')
    expect(stopButton).toBeInTheDocument()

    // "Start" ボタンは存在しないことを確認
    const startButton = screen.queryByTitle('シミュレーションを開始（連続実行）')
    expect(startButton).not.toBeInTheDocument()
  })
})