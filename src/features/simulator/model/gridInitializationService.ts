import { GridData, Coordinate } from '../../types'

/**
 * 指定されたグリッドデータに、別のグリッドデータを特定の位置からマージする。
 */
export const initializeGridWithData = (baseGrid: GridData, dataToLoad: GridData, position: Coordinate): GridData => {
  const newGridData: GridData = JSON.parse(JSON.stringify(baseGrid))
  const { x: targetX, y: targetY, z: targetZ } = position

  const gridZSize = newGridData.length
  if (gridZSize === 0) return newGridData
  const gridYSize = newGridData[0].length
  if (gridYSize === 0) return newGridData
  const gridXSize = newGridData[0][0].length

  for (let i = 0; i < dataToLoad.length; i++) {
    for (let j = 0; j < dataToLoad[i].length; j++) {
      for (let k = 0; k < dataToLoad[i][j].length; k++) {
        // データを配置するグリッド上の座標を計算
        const z = targetZ + i
        const y = targetY + j
        const x = targetX + k

        // グリッドの範囲外であればスキップ
        if (z >= gridZSize || y >= gridYSize || x >= gridXSize) {
          continue
        }

        const loadedCell = dataToLoad[i][j][k]

        // セルデータが存在すれば、新しいグリッドにコピー
        if (typeof loadedCell === 'object' && loadedCell !== null) {
          newGridData[z][y][x] = loadedCell
        }
      }
    }
  }

  return newGridData
}
