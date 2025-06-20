import React from 'react'

function about() {
  return (
    <div className='w-full p-20 bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl text-black '>
        <h1 className='font-["Neue Montreal"] text-[3vw] leading-[4vw]'>
        A trusted platform where pet lovers can buy, sell, or adopt furry, feathered, and scaly friends. Whether you're looking for a new companion or finding a loving home for your pet, we make the process safe, simple, and heartfelt. Join a community that cares — because every pet deserves a perfect home.
        </h1>
        <div className='w-full flex gap-5 border-t-[1px] pt-10 mt-20 border-[#a1b562]'>
            <div className='w-1/2'>
               <h1 className='text-6xl '>Our Approach</h1>
               <button className='mt-10 py-5 px-12 text-xs font-medium uppercase tracking-widest text-black bg-white border-0 rounded-full shadow-lg transition-all duration-300 ease-in-out cursor-pointer focus:outline-none hover:bg-black hover:shadow-[0px_15px_20px_rgba(46,_229,_157,_0.4)] hover:text-white hover:translate-y-[-7px] active:translate-y-[-1px]'>
                    Read more
                </button>
            </div>
            <div className='w-1/2 h-[70vh] rounded-4xl bg-[url(https://images.unsplash.com/photo-1678203778548-5fa399d8e7fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  bg-cover bg-center '> </div>
        </div>
    </div>
  )
}

export default about