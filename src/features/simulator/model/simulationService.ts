import { TILE_STATUS } from '../../constants'; // 定数をインポート

import { Cell, Coordinate, GridData, GridSize } from '../../types'; // Cellをインポート


/**
 * 回路タイルを処理し、出力を更新したグリッドを返す
 */
const processCircuits = (gridData: GridData, gridSize: GridSize): GridData => {
    const newGridData: GridData = JSON.parse(JSON.stringify(gridData));

    for (let z = 0; z < gridData.length; z++) {
        for (let y = 1; y < gridData[z].length; y++) {
            for (let x = 1; x < gridData[z][y].length - 1; x++) {
                const cell = gridData[z][y][x];

                if (!cell.circuit) {
                    continue;
                }

                const topInput = gridData[z][y - 1][x];
                const leftInput = gridData[z][y][x - 1];

                // NAND 回路は ２つの入力がともに 1 のときのみ出力が 0 となる
                const output = !(topInput.burning && leftInput.burning);
                if (newGridData[z][y][x + 1].line) {
                    newGridData[z][y][x + 1].ignition = output;
                    newGridData[z][y][x + 1].burning = output;

                }
                if (newGridData[z][y + 1][x].line) {
                    newGridData[z][y + 1][x].ignition = output;
                    newGridData[z][y + 1][x].burning = output;
                }

            }
        }
    }
    return newGridData;
};


/**
 * 全てのタイルのburning状態をリセットしたグリッドを返す
 */
const resetAllBurningStates = (gridData: GridData): GridData => {
    return gridData.map(layer =>
        layer.map(row =>
            row.map(cell => {
                const newCell = { ...cell };
                delete newCell.burning; // burningプロパティを削除する
                return newCell;
            })
        )
    );
};



/**
 * 延撚過程を処理し、出力を更新したグリッドを返す
 */
const processIgnitions = (gridData: GridData, gridSize: GridSize): GridData => {
    const newGridData: GridData = JSON.parse(JSON.stringify(gridData));
    const { z: maxZ, y: maxY, x: maxX } = gridSize;

    // burn関数の引数をCoordinateオブジェクトに変更
    const burn = (coord: Coordinate): void => {
        const { z, y, x } = coord; // 受け取ったオブジェクトを分割代入

        const effectedCoords: Coordinate[] = [
            { z: z - 1, y, x }, { z: z + 1, y, x }, { z, y: y - 1, x },
            { z, y: y + 1, x }, { z, y, x: x - 1 }, { z, y, x: x + 1 },
        ];

        effectedCoords.forEach(nextCoord => {
            // 境界チェック
            if (nextCoord.z >= 0 && nextCoord.z < maxZ
                && nextCoord.y >= 0 && nextCoord.y < maxY
                && nextCoord.x >= 0 && nextCoord.x < maxX) {

                    const cell = newGridData[nextCoord.z][nextCoord.y][nextCoord.x];

                if (cell.line && !cell.burning) {
                    newGridData[nextCoord.z][nextCoord.y][nextCoord.x].burning = true;
                    burn(nextCoord);
                }
            }
        });
    };

    const ignitionsToProcess: Coordinate[] = [];
    newGridData.forEach((layer, z) => layer.forEach((row, y) => row.forEach((cell, x) => {
        if (cell.ignition) ignitionsToProcess.push({ z, y, x });
    })));

    ignitionsToProcess.forEach(coord => {
        const { z, y, x } = coord;
        if (!newGridData[z][y][x].burning) {
            newGridData[z][y][x].burning = true;
        }
        // burnの呼び出しもCoordinateオブジェクトを渡す
        burn(coord);
    });

    return newGridData;
};


/**
 * シミュレーションを1ステップ進める
 */
export const runSimulationStep = (gridData: GridData, gridSize: GridSize): GridData => {
    // 1. circruitを処理する
    let nextGridData = processCircuits(gridData, gridSize);

    // 2. 全てのburning状態を一旦リセットする
    nextGridData = resetAllBurningStates(nextGridData);

    // 3. ignitionタイルから延焼を開始する
    nextGridData = processIgnitions(nextGridData, gridSize);

    return nextGridData;
};