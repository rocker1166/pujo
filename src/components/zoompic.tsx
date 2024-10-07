'use client'

import ZoomParallax from '../components/ZoomParallax/index';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis'

export default function Zoompic() {

    useEffect( () => {
        const lenis = new Lenis()
       
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    },[])

    return (
        <main>
            <ZoomParallax />
        </main>
    )
}
