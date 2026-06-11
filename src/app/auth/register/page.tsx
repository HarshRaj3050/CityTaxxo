"use client";
import { Lock, Mail, User } from "lucide-react";
import { motion } from "motion/react";
import { div } from "motion/react-client";
import Image from "next/image";
import { useState } from "react";

type stepType = "login" | "signup" | "otp";

const Page = () => {
  const [step, setStep] = useState<stepType>("login");

  return (
    <div className="w-dvw h-screen p-10 ">
      <button className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center text-sm gap-3 font-semibold hover:bg-black hover:text-white transition-colors duration-300">
        <Image src="/google-logo.png" alt="Google" width={20} height={20} />
        Continue with Google
      </button>

      <div className="flex items-center gap-4 my-6">
        <span className="flex-1 h-px bg-black/10"></span>
        <span className="text-xs">OR</span>
        <span className="flex-1 h-px bg-black/10"></span>
      </div>

      <div>
        {step == "login" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-xl font-semibold">Wecome Back</h1>

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                <Mail size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                <Lock size={18} className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
              <button className="w-full h-11 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition">Login</button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500 ">Don&apos;t have a account? <span onClick={()=>setStep('signup')} className="text-black font-medium hover:underline">SignUp</span></p>
          </motion.div>
        )}
        {step == "signup" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-xl font-semibold">Create Account</h1>

            <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                <User size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                <Mail size={18} className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                <Lock size={18} className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
              <button className="w-full h-11 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition">Sign Up</button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500 ">Already have an account? <span onClick={()=>setStep('login')} className="text-black font-medium hover:underline">Login</span></p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Page;
