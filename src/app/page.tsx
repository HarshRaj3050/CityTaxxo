'use client'
import { motion } from 'motion/react';
import Link from 'next/link';
import React from 'react'

const page = () => {
  return (
    <div className='bg-black w-dvw h-dvh text-white flex justify-center'>
      <div className='w-full md:max-w-1/2 h-full bg-white text-black'>
        <div className='w-full h-[70%]'>
          
        </div>
        <div className='w-full h-[30%] p-5 '>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl px-10 text-center font-bold'>Welcome to CityTaxxo</h1>
            <p className='px-5 mt-3'>Your go-to destination for smart, fast, and hassle-free shopping</p>
            <Link href='/auth/register' className='w-full'>
              <motion.button whileTap={{scale: 0.95}} className='bg-black w-full h-12 rounded-full mt-6 text-white'>Next</motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page