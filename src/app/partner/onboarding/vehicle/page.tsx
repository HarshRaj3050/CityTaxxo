/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ArrowLeft, Bike, Car } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const VEHICLES = [
  {id: "auto", lable: "Auto", icon: Car, disc: "3 Wheeler"},
  {id: "car", lable: "Car", icon: Car, disc: "4 Wheeler"},
]

const page = () => {
  const Rounter = useRouter()
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
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
          <p className="text-xs text-gray-500 font-medium">Step 1 of 3</p>
          <h1 className="text-2xl font-bold mt-1">Vehicle Details</h1>
          <p className="text-xs text-gray-500 mt-2">Add your vehicle information</p>
        </div>

        {/* Vehicle Details Form */}
        <div className="mt-8 space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-3">Vehicle Type</p>
            <div className="grid grid-cols-2 gap-3">
              {VEHICLES.map((v)=>{
                const Icon = v.icon
                const active = vehicleType==v.id
                const lable = v.lable
                return (
                  <motion.div
                    key={v.id}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.96}}
                    onClick={()=> setVehicleType(v.id)}
                    className={`rounded-2xl border p-4 flex flex-col items-center gap-2 transition 
                                  ${active? "bg-black text-white border-black" : "border-gray-200 hover:border-black"}`}
                    >
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center 
                                        ${active ? "bg-white text-black":"bg-black text-white"}`}>
                        <p className="text-xs text-center"><Icon/></p>
                      </div>
                      <div className="text-sm font-semibold">
                        {v.lable}
                      </div>
                      <p className={`text-xs ${active ? "text-gray-300": "text-gray-500"} `}>{v.disc}</p>
                    </motion.div>
                )
              })}
            </div>
          </div>

          {/* Vehicle Number */}
          <div>
            <label htmlFor="vn" className="text-xs font-semibold text-gray-500">Vehicle Number</label>
            <input 
              type="text" 
              id="vn" 
              onChange={(e)=>setVehicleNumber(e.target.value)}
              value={vehicleNumber}
              placeholder="BR12AB1234" 
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition"/>
          </div>

          {/* Vehicle Model */}
          <div>
            <label htmlFor="vm" className="text-xs font-semibold text-gray-500">Vehicle Model</label>
            <input 
              type="text" 
              id="vm" 
              onChange={(e)=>setVehicleModel(e.target.value)}
              value={vehicleModel}
              required
              placeholder="Mahindra XUV" 
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition"/>
          </div>
        </div>

        <motion.button
          whileTap={{scale: 0.8}}
          onClick={()=>Rounter.push("/partner/onboarding/documents")}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flext justify-center items-center gap-2 disabled:opacity-40 transition"
        >Continue</motion.button>

      </motion.div>

    </div>
  )
}

export default page