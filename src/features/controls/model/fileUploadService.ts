import { GridData, GridSize } from '../../types'

/**
 * アップロードされたJSONファイルを読み込み、新しいグリッドデータを返す
 */
export const loadGridFromFile = (file: File, currentGridData: GridData, gridSize: GridSize): Promise<GridData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const result = e.target?.result
        if (typeof result !== 'string') return reject(new Error('File is not readable'))

        const data = JSON.parse(result) as unknown
        if (!Array.isArray(data)) throw new Error('Invalid JSON format')

        let targetZ = -1,
          targetY = -1,
          targetX = -1
        currentGridData.forEach((layer, z) =>
          layer.forEach((row, y) =>
            row.forEach((cell, x) => {
              if (cell['upload-point']) {
                targetZ = z
                targetY = y
                targetX = x
              }
            })
          )
        )

        if (targetZ === -1) return reject(new Error('Upload point not found'))

        const newGridData: GridData = JSON.parse(JSON.stringify(currentGridData))
        const loadedGrid = data as GridData

        for (let i = 0; i < loadedGrid.length; i++) {
          for (let j = 0; j < loadedGrid[i].length; j++) {
            for (let k = 0; k < loadedGrid[i][j].length; k++) {
              // データを配置するグリッド上の座標を計算
              const z = targetZ + i
              const y = targetY + j
              const x = targetX + k

              // グリッドの範囲外であればスキップ
              if (z >= gridSize.z || y >= gridSize.y || x >= gridSize.x) {
                continue
              }

              const loadedCell = loadedGrid[i][j][k]

              if (typeof loadedCell === 'object' && loadedCell !== null) {
                newGridData[z][y][x] = loadedCell
              }
            }
          }
        }

        resolve(newGridData)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('File reading failed.'))
    reader.readAsText(file)
  })
}
