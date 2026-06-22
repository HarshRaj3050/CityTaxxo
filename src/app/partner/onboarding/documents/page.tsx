/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ArrowLeft, FileCheck, UploadCloud } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'


const page = () => {
  const Rounter = useRouter()
  
  return (
    <div className="min-h-dvh bg-white text-black flex items-start justify-center px-4 pt-10">
      <motion.div 
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.4}}
        className="w-full max-w-xl p-6 sm:p-8">
          
        {/* Header */}
        <div className="relative text-center">
          <button className="absolute left-0 top-[-30] w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-grya-100 transition" onClick={()=> Rounter.back()}><ArrowLeft size={18}></ArrowLeft></button>
          <p className="text-xs text-gray-500 font-medium">Step 2 of 3</p>
          <h1 className="text-2xl font-bold mt-1">Vehicle Documents</h1>
          <p className="text-xs text-gray-500 mt-2">Required for verification</p>
        </div>

        {/* Documents Details Form */}
        <div className="mt-8 space-y-5">
           <motion.label
            whileHover={{scale:1.02}}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black transition">
              <div>
                <p className="text-sm font-semibold">Aadhaar / ID Proof</p>
                <p className="text-xs text-gray-500">Government issued ID</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center"><UploadCloud size={18} /></div>
                <span className="text-xs text-gray-400">Upload</span>
              </div>
           </motion.label>
           <motion.label
            whileHover={{scale:1.02}}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black transition">
              <div>
                <p className="text-sm font-semibold">Driving License</p>
                <p className="text-xs text-gray-500">Valid driving lincese</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center"><UploadCloud size={18} /></div>
                <span className="text-xs text-gray-400">Upload</span>
              </div>
           </motion.label>
           <motion.label
            whileHover={{scale:1.02}}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black transition">
              <div>
                <p className="text-sm font-semibold">Vehicle RC</p>
                <p className="text-xs text-gray-500">Registration Certificate</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center"><UploadCloud size={18} /></div>
                <span className="text-xs text-gray-400">Upload</span>
              </div>
           </motion.label>
        </div>

        <div className="mt-6 flex items-start gap-3 text-xs text-gray-500">
          <FileCheck size={16} className="mt-0.5" />
          <p>Document are securely stored and manually verified by our team.</p>
        </div>

        <motion.button
          whileTap={{scale: 0.8}}
          onClick={()=>Rounter.push("/partner/onboarding/bank")}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flext justify-center items-center gap-2 disabled:opacity-40 transition"
        >Continue</motion.button>

      </motion.div>

    </div>
  )
}

export default page