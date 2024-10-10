import React from 'react'

function Footer() {
  return (
    <footer className="bg-amber-500 text-white py-4 px-3 mt-16">
    <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <p className="text-xs text-black md:text-sm">Copyright 2024 &copy; All Rights Reserved</p>
        </div>
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <ul className="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
                <li><a href="/about" className="text-black hover:text-white ">About</a></li>
                <li className="mx-4"><a href="#" className="text-black  hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-black hover:text-white">Terms of Use</a></li>
            </ul>
        </div>
    </div>
</footer>
  )
}

export default Footer