/**
 * シミュレーション内で使用されるタイルの状態を定義する定数オブジェクト。
 */
export const TILE_STATUS = {
  /** 導線。信号(burning)が伝播できる経路。 */
  LINE: 'line',

  /** * 回路（NANDゲート）。上と左のタイルからの入力を受け取り、右のタイルに出力する。
   */
  CIRCUIT: 'circuit',

  /** * 点火源。この状態を持つタイルから信号(burning)の伝播が開始される。
   */
  IGNITION: 'ignition',

  /** * アップロードポイント。ファイルから読み込んだグリッドデータを配置する際の基点。
   */
  UPLOAD_POINT: 'upload-point',

  /** 何も配置されていない空の状態。 */
  VACANT: 'vacant',

  /** 燃焼中（信号が伝播している状態）。 */
  BURNING: 'burning',
} as const;

export const TILE_STATUS_ORDER = [
  TILE_STATUS.LINE,
  TILE_STATUS.CIRCUIT,
  TILE_STATUS.IGNITION,
  TILE_STATUS.UPLOAD_POINT,
  TILE_STATUS.VACANT,
] as const;

export const STYLE_CONSTANTS = {
  TILE_SIZE: 20, 
  TILE_BORDER: 1, // px
  LAYER_OFFSET: 3, // px
} as const;