"use client";
import axios from "axios";
import { CircleDashed, Lock, Mail, User } from "lucide-react";
import { motion } from "motion/react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

type stepType = "login" | "signup" | "otp";

const Page = () => {
  const [step, setStep] = useState<stepType>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const data = useSession();

  const handleSignUp = async () => {
    setLoading(true);
    setErr("");
    try {
      const { data } = await axios.post("/api/auth/register", { name, email, password })
      console.log(data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErr(error.response.data.message ?? "Something went wrong");
    }
  }

  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email, password, redirect: false
    })
    console.log(data);
    setLoading(false);
    console.log(res);
  }

  const handleGoogleLogin = async () => {
    await signIn('google')
  }

  return (
    <div className="w-dvw h-screen p-10 ">
      <button className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center text-sm gap-3 font-semibold hover:bg-black hover:text-white transition-colors duration-300"
              onClick={handleGoogleLogin}>
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
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent outline-none text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                <Lock size={18} className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent outline-none text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="w-full h-11 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition flex justify-center items-center" onClick={handleLogin}>{loading ? <CircleDashed size={18} color="white" className="animate-spin" /> : "Login"}</button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500 ">Don&apos;t have a account? <span onClick={() => setStep('signup')} className="text-black font-medium hover:underline">SignUp</span></p>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                <Mail size={18} className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent outline-none text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                <Lock size={18} className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent outline-none text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {err && <p className="text-red-500">*{err}</p>}

              <button className="w-full h-11 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition flex justify-center items-center"
                onClick={handleSignUp}
              >{loading ? <CircleDashed size={18} color="white" className="animate-spin" /> : "Sign Up"}</button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500 ">Already have an account? <span onClick={() => setStep('login')} className="text-black font-medium hover:underline">Login</span></p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Page;
