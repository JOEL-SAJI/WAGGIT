import React, { useEffect, useState } from 'react'

function Eyes() {
    const [rotate, setRotate] = useState(0);
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            let mouseX = e.clientX;
            let mouseY = e.clientY;
            let deltaX = mouseX - window.innerWidth / 2;
            let deltaY = mouseY - window.innerHeight / 2;

            var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            setRotate(angle);
        })
    }, [])
    return (
        <div className='eyes w-full h-screen overflow-hidden'>
            <div data-scroll data-scroll-speed="-.4"className='w-full relative h-full bg-[url("https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-scaled.jpg")] bg-cover bg-center ' >
                <div className='absolute flex gap-10 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] '>
                    <div className='w-[15vw] rounded-full flex items-center justify-center h-[15vw] bg-zinc-100'>
                        <div className='relative w-2/3 h-2/3   rounded-full bg-zinc-900'>
                            <div
                                style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
                                className='line absolute top-1/2 left-1/2 w-2/3 h-2  origin-center'
                            >
                                <div className='w-8 h-8 rounded-full bg-zinc-100 absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2'></div>
                            </div>

                        </div>
                    </div>
                    <div className='w-[15vw] rounded-full flex items-center justify-center h-[15vw] bg-zinc-100'>
                        <div className='relative w-2/3 h-2/3 rounded-full bg-zinc-900'>
                        <div
                                style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
                                className='line absolute top-1/2 left-1/2 w-2/3 h-2  origin-center'
                            >
                                <div className='w-8 h-8 rounded-full bg-zinc-100 absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Eyes