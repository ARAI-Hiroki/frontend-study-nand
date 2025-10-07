import { FC } from 'react'

const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">NAND Simulator</h1>
      </div>
    </header>
  )
}

export default Header
