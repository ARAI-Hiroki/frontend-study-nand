'use client'
import { FC, ReactNode, useRef, useState } from 'react'
import { QuestionMarkCircleIcon, ArrowUpTrayIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { PlayIcon, ForwardIcon } from '@heroicons/react/24/solid'

const HelpItem: FC<{ icon: ReactNode; children: ReactNode }> = ({ icon, children }) => (
  <div className="mb-3 flex items-center space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <p className="text-gray-600">{children}</p>
  </div>
)

const HintButton: FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isClosing, setIsClosing] = useState(false)

  const openModal = () => {
    setIsClosing(false)
    dialogRef.current?.showModal()
  }

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
    }, 200)
  }

  return (
    <>
      <button
        onClick={openModal}
        className="inline-flex cursor-pointer items-center justify-center rounded-md bg-yellow-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
        title="操作方法を表示"
      >
        <QuestionMarkCircleIcon className="h-6 w-6" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setIsClosing(false)}
        className={`max-w-xlg m-auto rounded-xl bg-white p-6 shadow-lg backdrop:bg-black backdrop:opacity-50 ${isClosing ? 'dialog-fade-out' : 'dialog-fade-in'}`}
      >
        <h2 className="mb-4 text-xl font-bold">操作方法</h2>

        <div className="space-y-4">
          <div className="space-y-4">
            <div className="pl-2">
              <HelpItem icon={<strong>X:</strong>}>横幅を調整できます</HelpItem>
              <HelpItem icon={<strong>Y:</strong>}>縦幅を調整できます</HelpItem>
              <HelpItem icon={<strong>Z:</strong>}>レイヤー数を調整できます。立体的な回路を作成できます。</HelpItem>
              <HelpItem icon={<strong>Layer:</strong>}>アクティブなレイヤーを指定します</HelpItem>
            </div>

            <p className="pt-6 text-gray-700">タイルをクリックするとタイルの種類を変更できます。</p>
            <p className="text-gray-700">
              {' '}
              Ctrl + クリックするとタイルを削除できます（ Mac の場合は Command + クリック）
            </p>

            <div className="pl-2">
              <HelpItem icon={<div className="cell line" />}>導線です。信号を伝えます。</HelpItem>
              <HelpItem icon={<div className="cell circuit" />}>
                NAND回路です。左と上が入力、右と下が出力です。
              </HelpItem>
              <HelpItem icon={<div className="cell ignition" />}>
                点火です。ここから隣接する導線に信号が流れます。
              </HelpItem>
              <HelpItem icon={<div className="cell upload-point" />}>
                アップロード地点です。アップロードボタンとあわせて使います。
              </HelpItem>
            </div>

            <p className="pt-6 text-gray-700">コントロール部分にはいくつかのボタンがあります。</p>

            <div className="pl-2">
              <HelpItem icon={<PlayIcon className="h-6 w-6 text-gray-700" />}>
                シミュレーションを１ステップ進めます。
              </HelpItem>
              <HelpItem icon={<ForwardIcon className="h-6 w-6 text-gray-700" />}>
                シミュレーションを継続的に進めます。
              </HelpItem>
              <HelpItem icon={<strong>Reset</strong>}>
                シミュレーションをリセットします。すべての点火が解消されます。
              </HelpItem>
              <HelpItem icon={<ArrowDownTrayIcon className="h-6 w-6 text-green-500" />}>
                現在作成している回路情報をダウンロードできます。
              </HelpItem>
              <HelpItem icon={<ArrowUpTrayIcon className="h-6 w-6 text-blue-500" />}>
                アップロード地点に、回路をアップロードします。
              </HelpItem>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={closeModal}
              className="rounded-md bg-gray-300 px-4 py-2 font-bold text-black transition-colors duration-200 hover:bg-gray-400"
            >
              閉じる
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default HintButton
