"use client";

import { MapPin, Search, Mic, ChevronDown, Car } from "lucide-react";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────
const userData = {
  location: "Janatha Rd, Palarivattom",
};

const rideCategories = [
  {
    label: "Sedan",
    subtitle: "From ₹199",
    emoji: "🚗",
    bg: "bg-blue-50",
    large: true,
  },
  {
    label: "Auto",
    subtitle: "Nearby 3 min",
    emoji: "🛺",
    bg: "bg-blue-50",
    large: true,
  },
  {
    label: "Outstation",
    subtitle: "",
    emoji: "🚙",
    bg: "bg-blue-50",
    large: true,
  },
  {
    label: "Intercity",
    subtitle: "",
    emoji: "🚐",
    bg: "bg-blue-50",
    large: false,
  },
  {
    label: "Rental",
    subtitle: "",
    emoji: "⏱️",
    bg: "bg-blue-50",
    large: false,
  },
];

const frequentTrips = [
  {
    label: "Kollamkudimugal, Mundampalam",
    subtitle: "Janatha Rd, Palarivattom",
    emoji: "🚗",
  },
  {
    label: "Bourke Road, Alexandri",
    subtitle: "Fort Kochi, Kerala",
    emoji: "🚙",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="relative h-dvh overflow-hidden bg-white">

      {/* ── Fixed Hero Background ── */}
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-bl from-blue-500 via-blue-900 to-black/90 z-0" />

      {/* ── Fixed Top Content ── */}
      <div className="absolute inset-x-0 top-0 z-10 px-4 pt-3">

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={14} className="text-white" />
          <span className="text-white text-[14px] font-medium">{userData.location}</span>
          <ChevronDown size={14} className="text-white" />
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-md">
          <Search size={18} className="text-gray-400 shrink-0" />
          <span className="flex-1 text-gray-400 text-[15px]">Where to?</span>
          <Mic size={18} className="text-blue-500 shrink-0" />
        </div>

        {/* Hero Text + Car */}
        <div className="mt-1 flex items-start justify-center">
          <div className="mt-8 ">
            <p className="text-white text-2xl  leading-tight">Nearby 3 min</p>
            <p className="text-white text-2xl leading-tight">From <span className="font-black font-bold">₹199</span></p>
          </div>
          <div className="text-6xl mb-1">
            <Image src="/userHomePageCar.png" alt="image" width={200} height={200}></Image>
          </div>
        </div>
      </div>

      {/* ── Scrollable Sheet ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 overflow-y-auto rounded-t-3xl bg-white shadow-2xl"
        style={{ top: "220px" }}
      >
        <div className="px-4 pt-4 pb-28">

          {/* Drag Handle */}
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

          {/* Ride Categories Grid */}
          <div className="grid grid-cols-2 gap-3">

            {/* Sedan — large card */}
            <div className="bg-blue-50 rounded-2xl p-4 flex flex-col justify-between min-h-[130px]">
              <div>
                <p className="font-bold text-[15px] text-gray-900">Sedan</p>
                <p className="text-gray-500 text-[12px]">From ₹199</p>
              </div>
              <div className="text-5xl text-right">🚗</div>
            </div>

            {/* Auto — large card */}
            <div className="bg-blue-50 rounded-2xl p-4 flex flex-col justify-between min-h-[130px]">
              <div>
                <p className="font-bold text-[15px] text-gray-900">Auto</p>
                <p className="text-gray-500 text-[12px]">Nearby 3 min</p>
              </div>
              <div className="text-5xl text-right">🛺</div>
            </div>

            {/* Outstation — large card */}
            <div className="bg-blue-50 rounded-2xl p-4 flex flex-col justify-between min-h-[130px]">
              <div>
                <p className="font-bold text-[15px] text-gray-900">Outstation</p>
              </div>
              <div className="text-5xl text-right">🚙</div>
            </div>

            {/* Intercity + Rental stacked */}
            <div className="flex flex-col gap-3">
              <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between flex-1">
                <p className="font-bold text-[15px] text-gray-900">Intercity</p>
                <span className="text-3xl">🚐</span>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between flex-1">
                <p className="font-bold text-[15px] text-gray-900">Rental</p>
                <span className="text-3xl">⏱️</span>
              </div>
            </div>

          </div>

          {/* Frequent Trips */}
          <div className="mt-6">
            <h2 className="text-[17px] font-bold text-gray-900 mb-3">Frequent Trips</h2>
            <div className="flex flex-col gap-3">
              {frequentTrips.map(({ label, subtitle, emoji }) => (
                <button
                  key={label}
                  className="flex items-center gap-3 w-full text-left active:bg-gray-50 transition-colors rounded-xl p-1"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shrink-0">
                    <Car size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-900">{label}</p>
                    <p className="text-[12px] text-gray-400">{subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}