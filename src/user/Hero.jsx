import React from 'react';
import './User.css';
import imgs from '../image/hero.png'
const Hero = () => {
  return (
    <>
        <div className='w-full bg-[#F6E6D9] pt-[10vh]'>
            <div className='hero gap-8 pl-5'>
               <div className='self-center justify-self-center'>
                 <h1 className='text-[60px] font-extrabold'>E Fashion</h1>
                 <h1 className='text-[40px] font-extrabold'>India's number one brand</h1>
                 <h1 className='text-[40px] font-bold bg-[#FABB1E] text-white pb-2 my-4 w-fit px-4 rounded-lg'>Shop Now</h1>
               </div>
               <div className='self-center justify-self-end mr-20'>
                <img src={imgs} alt="" className='hero_img' />
               </div>
            </div>
        </div>
    </>
  )
}

export default Hero