import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background patterns */}
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<div className="absolute inset-0 bg-[url('/durga-bg-pattern.svg')] opacity-20"></div>
      
      {/* Navigation */}
      
      
      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Celebrate Durga Puja
        </h1>
        <p className="text-xl md:text-2xl text-yellow-100 mb-8 max-w-2xl">
          Immerse yourself in the vibrant pandals and rich traditions of Bengal's biggest festival
        </p>
        <Link href="#" className="bg-red-600 text-white text-lg px-8 py-3 rounded-full hover:bg-red-700 transition transform hover:scale-105">
          Explore Pandals
        </Link>
      </div>
      
      {/* Durga illustration */}
      
      
      {/* Decorative elements */}
      
    </div>
  )
}