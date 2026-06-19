"use client";
import axios from "axios";
import { CircleDashed, Lock, Mail, User } from "lucide-react";
import { motion } from "motion/react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type stepType = "login" | "signup" | "otp";

const Page = () => {
  const router = useRouter();
  const [step, setStep] = useState<stepType>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const data = useSession();

  const handleSignUp = async () => {
    setLoading(true);
    setErr("");
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(data);
      setStep("otp");
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        setErr(error.response?.data?.message ?? "Something went wrong");
      } else if (error instanceof Error) {
        setErr(error.message || "Something went wrong");
      } else {
        setErr("Something went wrong");
      }
    }
  };

  const handleVerifyEmail = async () => {
    setLoading(true);
    setErr("");

    try {
      const enteredOtp = otp.join("");

      if (!email) {
        setErr("Email is required");
        return;
      }

      if (enteredOtp.length !== 4) {
        setErr("Please enter a valid 4-digit OTP");
        return;
      }

      console.log("Sending:", {
        email,
        otp: enteredOtp,
      });

      const { data } = await axios.post("/api/auth/verify-email", {
        email,
        otp: enteredOtp,
      });

      console.log("Success:", data);

      setStep("login");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        console.log("Response:", error.response?.data);

        setErr(
          error.response?.data?.message ||
            error.response?.data?.messsage || // handles your previous typo
            error.message ||
            "Something went wrong",
        );
      } else {
        setErr("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setErr("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (res?.ok) {
      router.push("/user");
    } else {
      setErr(res?.error || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/user",
    });
  };

  const handleChangeOtp = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      const updated = [...otp];

      if (otp[index]) {
        // Clear current digit
        updated[index] = "";
        setOtp(updated);
      } else if (index > 0) {
        // Move to previous input and clear it
        updated[index - 1] = "";
        setOtp(updated);
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  return (
    <div className="w-dvw h-dvh p-10 ">
      <button
        className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center text-sm gap-3 font-semibold hover:bg-black hover:text-white transition-colors duration-300"
        onClick={handleGoogleLogin}
      >
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
              <button
                className="w-full h-11 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition flex justify-center items-center"
                onClick={handleLogin}
              >
                {loading ? (
                  <CircleDashed
                    size={18}
                    color="white"
                    className="animate-spin"
                  />
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500 ">
              Don&apos;t have a account?{" "}
              <span
                onClick={() => setStep("signup")}
                className="text-black font-medium hover:underline"
              >
                SignUp
              </span>
            </p>
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

              <button
                className="w-full h-11 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition flex justify-center items-center"
                onClick={handleSignUp}
              >
                {loading ? (
                  <CircleDashed
                    size={18}
                    color="white"
                    className="animate-spin"
                  />
                ) : (
                  "Send Otp"
                )}
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500 ">
              Already have an account?{" "}
              <span
                onClick={() => setStep("login")}
                className="text-black font-medium hover:underline"
              >
                Login
              </span>
            </p>
          </motion.div>
        )}
        {step == "otp" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-xl font-semibold">OTP Verification</h1>

            <div className="mt-10 mx-10 flex justify-between gap-2 ">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  value={digit}
                  maxLength={1}
                  className="w-10 h-12 text-center text-xl font-semibold rounded-xl bg-white text-black border border-black/20 outline-none"
                  onChange={(e) => handleChangeOtp(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              ))}
            </div>
            <button
              className="w-full h-11 mt-8 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition flex justify-center items-center"
              onClick={handleVerifyEmail}
            >
              {loading ? (
                <CircleDashed
                  size={18}
                  color="white"
                  className="animate-spin"
                />
              ) : (
                "Verify & Create Account"
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Page;
