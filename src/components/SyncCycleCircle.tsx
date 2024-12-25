import React, { useEffect, useState } from 'react'

const INCREMENT = 50;
const TOTALCIRCLES = 15;
const TOTALSIZE = INCREMENT * TOTALCIRCLES;


const SyncCycleCircle = () => {
    const [circles, setCircles] = useState<number[]>([])
    useEffect(() => {
        const initialCircles = [];
        for (let i = INCREMENT; i <= TOTALSIZE; i += INCREMENT) {
            initialCircles.push(i);
        }
        setCircles(initialCircles)
    }, [])
    return (
        <div className='h-full w-full flex items-center justify-center animate-spin-slow absolute top-0 left-0'>
            {
                circles.length > 0 && circles.map((size, index) => (
                    <div key={index} style={{
                        transform: `translate(-50%, -50%) rotate(${(index * 35) % 360}deg)`,
                    }} className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        <div style={{ width: size, height: size }} className='circle' >
                            <div />
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default SyncCycleCircle