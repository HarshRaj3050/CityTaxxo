/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ArrowLeft, BadgeCheck, CreditCard, FileCheck, Landmark, Phone, Wallet } from 'lucide-react';
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
          <p className="text-xs text-gray-500 font-medium">Step 3 of 3</p>
          <h1 className="text-2xl font-bold mt-1">Bank & Payout Setup</h1>
          <p className="text-xs text-gray-500 mt-2">Used for partner payouts</p>
        </div>

        {/* Documents Details Form */}
        <div className="mt-8 space-y-6">
            <div>
                <label htmlFor="ahn" className="text-xs font-semibold text-gray-500">Account Holder Name</label>
                <div className="flex items-center gap-2 mt-2">
                    <div className="text-gray-400">
                        <BadgeCheck />
                    </div>
                    <input type="text" id="ahn" placeholder="As per bank records" className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black" />
                </div>
            </div>

            <div>
                <label htmlFor="ban" className="text-xs font-semibold text-gray-500">Bank Account Number</label>
                <div className="flex items-center gap-2 mt-2">
                    <div className="text-gray-400">
                        <CreditCard />
                    </div>
                    <input type="text" id="ban" placeholder="Enter account number " className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black" />
                </div>
            </div>

            <div>
                <label htmlFor="ahn" className="text-xs font-semibold text-gray-500">IFSC Code</label>
                <div className="flex items-center gap-2 mt-2">
                    <div className="text-gray-400">
                        <Landmark />
                    </div>
                    <input type="text" id="ahn" placeholder="HDFC0001234" className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black" />
                </div>
            </div>

            <div>
                <label htmlFor="mb" className="text-xs font-semibold text-gray-500">Mobile Number</label>
                <div className="flex items-center gap-2 mt-2">
                    <div className="text-gray-400 flex items-start gap-2">
                        <Phone /> <p className="pb-2">+91</p>
                    </div>
                    <input type="text" id="mb" placeholder="10 digit mobile number" className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black" />
                </div>
            </div>

            <div>
                <label htmlFor="upi" className="text-xs font-semibold text-gray-500">UPI ID</label>
                <div className="flex items-center gap-2 mt-2">
                    <div className="text-gray-400">
                        <Wallet />
                    </div>
                    <input type="text" id="upi" placeholder="name@upi" className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black" />
                </div>
            </div>
        </div>

        <div className="mt-6 flex items-start gap-3 text-xs text-gray-500">
          <FileCheck size={16} className="mt-0.5" />
          <p>Bank details are verified before first payout. This usually takes 24-48 hours.</p>
        </div>


        <motion.button
          whileTap={{scale: 0.8}}
          onClick={()=>Rounter.push("/user")}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flext justify-center items-center gap-2 disabled:opacity-40 transition"
        >Continue</motion.button>

      </motion.div>

    </div>
  )
}

export default page