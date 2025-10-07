"use client";
import { FC, ReactNode, useRef, useState } from 'react';
// --- 1. 使用するアイコンをすべてインポート ---
import {
    QuestionMarkCircleIcon,
    ArrowUpTrayIcon,
    ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { PlayIcon, ForwardIcon } from '@heroicons/react/24/solid';


// --- 2. 説明の各行を表示するためのヘルパーコンポーネントを作成 ---
const HelpItem: FC<{ icon: ReactNode; children: ReactNode }> = ({ icon, children }) => (
    <div className="flex items-center space-x-4 mb-3">
        <div className="flex-shrink-0">{icon}</div>
        <p className="text-gray-600">{children}</p>
    </div>
);

const HintButton: FC = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isClosing, setIsClosing] = useState(false);

    const openModal = () => {
        setIsClosing(false);
        dialogRef.current?.showModal();
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            dialogRef.current?.close();
        }, 200);
    };

    return (
        <>
            <button
                onClick={openModal}
                className="inline-flex items-center justify-center p-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer transition-colors duration-200"
                title="操作方法を表示"
            >
                <QuestionMarkCircleIcon className="h-6 w-6" />
            </button>

            <dialog
                ref={dialogRef}
                onClose={() => setIsClosing(false)}
                className={`m-auto p-6 bg-white rounded-xl shadow-lg max-w-xlg backdrop:bg-black backdrop:opacity-50 ${isClosing ? 'dialog-fade-out' : 'dialog-fade-in'}`}
            >
                <h2 className="text-xl font-bold mb-4">操作方法</h2>

                {/* --- 3. ここからがモーダルの内容 --- */}
                <div className="space-y-4">

                    <div className="space-y-4">

                        {/* ボードサイズ調整の説明 */}
                        <div className="pl-2">
                            <HelpItem icon={<strong>X:</strong>}>
                                横幅を調整できます
                            </HelpItem>
                            <HelpItem icon={<strong>Y:</strong>}>
                                縦幅を調整できます
                            </HelpItem>
                            <HelpItem icon={<strong>Z:</strong>}>
                                レイヤー数を調整できます。立体的な回路を作成できます。
                            </HelpItem>
                            <HelpItem icon={<strong>Layer:</strong>}>
                                アクティブなレイヤーを指定します
                            </HelpItem>
                        </div>

                        <p className="text-gray-700 pt-6">タイルをクリックするとタイルの種類を変更できます。</p>

                        {/* タイルの説明 */}
                        <div className="pl-2">
                            <HelpItem icon={<div className="cell line" />}>
                                導線です。信号を伝えます。
                            </HelpItem>
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

                        <p className="text-gray-700 pt-6">コントロール部分にはいくつかのボタンがあります。</p>

                        {/* ボタンの説明 */}
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
                    {/* --- ここまでがモーダルの内容 --- */}

                    <div className="text-right mt-6">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-300 text-black font-bold rounded-md hover:bg-gray-400 transition-colors duration-200"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default HintButton;