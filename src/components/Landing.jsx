import { motion } from 'framer-motion';
import React from 'react'
import { FaArrowUp } from "react-icons/fa6";

function Landing() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-0.3" className='w-full h-screen bg-white text-zinc-900  pt-5'>
        <div className='textstructure mt-40 px-20'>
         {["CONNECTING PETS","WITH LOVING","FAMILIES"].map((item,index)=>{
          return(
            <div className='masker'>
              <div className='w-fit flex items-center'>
                {index==1 && (<motion.div initial={{width:0}} animate={{width:"9vw"}} transition={{ease:[0.76, 0, 0.24, 1],duration:1.2}}className='w-[9vw] rounded-md mr-5 h-[5.5vw] relative top-[0.5vw] bg-[url(https://images.unsplash.com/photo-1696112528638-8ef6a6fca582?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center'></motion.div>)}
              <h1 className='uppercase text-9xl leading-[7vw] font-["FoundersGrotesk-Semibold"]'>{item}</h1>
              </div>  
            </div>
          )
         })}
            
        </div>
        <div className='border-t-[1px] border-zinc-300 mt-20 flex justify-between items-center py-5 px-20 '>
          {["For Sellers","For Buyers"].map((item,index)=><p className='text-md font-mediumtracking-tight leading-none'>{item}</p>)}
          <div className='Go to flex items-center gap-5'>
             <div className='px-5 py-2 border-[2px] border-zinc-500 font-medium text-sm capitalize rounded-full'>Go to Shop</div>
             <div className='w-10 h-10 flex items-center justify-center border-[2px] border-zinc-500 rounded-full'>
              <span className='rotate-45'>
              <FaArrowUp/>
              </span>
             </div>
          </div>
        </div>
    </div>
  )
}

export default Landing