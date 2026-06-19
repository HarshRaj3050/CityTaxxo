/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/register");
    }
    
    if (status === "authenticated" && !(session?.user as any)?.isEmailVerified) {
      router.push("/auth/register");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="w-screen h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="w-screen h-screen p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {session.user.name}!</h1>

        <div className="bg-white border border-black/10 rounded-lg p-6 space-y-4 shadow-sm">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <p className="text-lg font-medium">{session.user.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="text-lg font-medium">{session.user.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">Role</label>
            <p className="text-lg font-medium capitalize">{(session.user as any)?.role || "user"}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ redirect: true, callbackUrl: "/auth/register" })}
          className="mt-8 w-full h-11 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default page