import { updateTileState } from '../gridService'
import { TILE_STATUS, TILE_STATUS_ORDER } from '@/features/constants'
import { GridData } from '@/features/types'

// テスト用の初期グリッドデータを作成するヘルパー関数
const createInitialGrid = (cell: object): GridData => [
  [
    [cell, {}],
    [{}, {}],
  ],
]

describe('gridService', () => {
  describe('updateTileState', () => {
    it('通常クリックでタイルの状態が順番に変わるか', () => {
      // 初期状態は VACANT (空)
      let gridData = createInitialGrid({})
      const coordinate = { z: 0, y: 0, x: 0 }

      // 1回目のクリック: VACANT -> LINE
      gridData = updateTileState(gridData, coordinate, false)
      expect(gridData[0][0][0]).toEqual({ [TILE_STATUS.LINE]: true })

      // 2回目のクリック: LINE -> CIRCUIT
      gridData = updateTileState(gridData, coordinate, false)
      expect(gridData[0][0][0]).toEqual({ [TILE_STATUS.CIRCUIT]: true })

      // 最後の状態からもう一度クリックすると最初の状態 (LINE) に戻るか
      let lastStateGrid = createInitialGrid({ [TILE_STATUS_ORDER[TILE_STATUS_ORDER.length - 2]]: true }) // 最後から2番目
      lastStateGrid = updateTileState(lastStateGrid, coordinate, false) // 最後の状態 (VACANT) になる
      lastStateGrid = updateTileState(lastStateGrid, coordinate, false) // 最初の状態 (LINE) に戻る
      expect(lastStateGrid[0][0][0]).toEqual({ [TILE_STATUS.LINE]: true })
    })

    it('Ctrl (or Command) を押しながらクリックするとタイルが空になるか', () => {

      const initialGrid = createInitialGrid({ [TILE_STATUS.LINE]: true })
      const coordinate = { z: 0, y: 0, x: 0 }

      const newGridData = updateTileState(initialGrid, coordinate, true)

      expect(newGridData[0][0][0]).toEqual({})
    })
  })
})