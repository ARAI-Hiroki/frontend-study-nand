import { FC } from 'react'

const Header: FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">NAND Simulator</h1>
      </div>
    </header>
  )
}

export default Header
