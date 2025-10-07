"use client";
import { FC } from 'react';
import Controls from '@/features/controls/ui/Controls';
import GridDisplay from '@/features/simulator/ui/GridDisplay';
import { GridSimulatorProvider } from '@/features/GridSimulatorContext';
import Header from './Header';

// --- メインコンポーネント ---
const HomePage: FC = () => {

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                <GridSimulatorProvider>
                    <GridDisplay />
                    <Controls />
                </GridSimulatorProvider>
            </main>
        </div>
    );
};

export default HomePage;