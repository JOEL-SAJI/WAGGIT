import React from 'react'
import { MdQuestionMark } from "react-icons/md";
import { useNavigate } from 'react-router-dom';  

function GoTo() {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full bg-[#CDEA68]'>
            <div className='w-full h-3/4 bg-[#CDEA68] text-center text-black'>
                <h1 className='leading-[11vw] text-[13vw] font-["FoundersGrotesk-Semibold"]'>ARE YOU A </h1>
                <h1 className='leading-[11vw] text-[13vw] font-["FoundersGrotesk-Semibold"]'>BUYER</h1>
                <h1 className='leading-[11vw] text-[13vw] font-["FoundersGrotesk-Semibold"]'>OR SELLER <MdQuestionMark className='inline-block mb-[6vw] ml-[-2vw] ' /></h1>
            </div>
            <div className='flex justify-center gap-20'>
                <button onClick={() => window.location.href = 'http://localhost/phpfile/buyer_login.html'} className='py-5 px-12 text-xs font-medium uppercase tracking-widest text-black bg-white border-0 rounded-full shadow-lg transition-all duration-300 ease-in-out cursor-pointer focus:outline-none hover:bg-black hover:shadow-[0px_15px_20px_rgba(46,_229,_157,_0.4)] hover:text-white hover:translate-y-[-7px] active:translate-y-[-1px]'>
                    Buyer
                </button>
                <button onClick={() => window.location.href = 'http://localhost/phpfile/seller_login.html'} className='py-5 px-12 text-xs font-medium uppercase tracking-widest text-black bg-white border-0 rounded-full shadow-lg transition-all duration-300 ease-in-out cursor-pointer focus:outline-none hover:bg-black hover:shadow-[0px_15px_20px_rgba(46,_229,_157,_0.4)] hover:text-white hover:translate-y-[-7px] active:translate-y-[-1px]'>
                    Seller
                </button>

            </div>
        </div>
    )
}

export default GoTo