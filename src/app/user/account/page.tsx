"use client";

import Link from "next/link";
import {
  HelpCircle,
  Wallet,
  Shield,
  Mail,
  Star,
  Users,
  Settings,
  Briefcase,
  UserCircle,
  Info,
  Leaf,
} from "lucide-react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


// User Data Variable 
const userData = {
  rating: 5.0,
  co2Saved: 0,
  version: "v1.245.66",
};

const quickActions = [
  { label: "Help",   icon: HelpCircle, href: "/user/account" },
  { label: "Wallet", icon: Wallet,     href: "/user/account" },
  { label: "Safety", icon: Shield,     href: "/user/account" },
  { label: "Inbox",  icon: Mail,       href: "/user/account" },
];

const promoCards = [
  {
    title: "Commute Hub",
    subtitle: "Avoid price spikes on your frequent rides.",
    emoji: "🗺️",
    href: "/user/account",
  },
];

const menuItems = [
  { label: "Family",            subtitle: "Manage adult and senior accounts", icon: Users,     href: "/user/account"  },
  { label: "Settings",                                                        icon: Settings,  href: "/user/settings" },
  { label: "Become a Partner",                                                 icon: Briefcase, href: "/user/partner"  },
  { label: "Legal",                                                            icon: Info,      href: "/user/account"  },
];

export default function AccountPage() {
    const user = useSelector((state: RootState) => state.user);
  return (
    <div className="min-h-auto bg-white text-gray-900 pb-10">

      {/* Header */}
      <div className="px-5 pt-10 pb-4 flex items-start justify-between border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-black tracking-tight leading-tight text-gray-900">
            {user.userData?.name}
          </h1>
          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md">
              <Star size={12} className="fill-gray-900 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">
                {userData.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <UserCircle size={48} className="text-gray-400" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        {quickActions.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-4 active:bg-gray-200 transition-colors"
          >
            <Icon size={20} className="text-gray-900" />
            <span className="text-[15px] font-medium text-gray-900">{label}</span>
          </Link>
        ))}
      </div>

      {/* Promo / Feature Cards */}
      <div className="px-5 mt-5 flex flex-col gap-3">
        {promoCards.map(({ title, subtitle, emoji, href }) => (
          <Link
            key={title}
            href={href}
            className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-4 active:bg-gray-200 transition-colors"
          >
            <div className="flex-1 pr-4">
              <p className="text-[15px] font-semibold leading-snug text-gray-900">{title}</p>
              {subtitle && (
                <p className="text-gray-500 text-[13px] mt-0.5 leading-snug">{subtitle}</p>
              )}
            </div>
            {emoji && (
              <span className="text-3xl shrink-0">{emoji}</span>
            )}
          </Link>
        ))}
      </div>

      {/* CO2 Card */}
      <div className="px-5 mt-3">
        <div className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-4">
          <p className="text-[15px] font-medium text-gray-900">Estimated CO₂ saved</p>
          <div className="flex items-center gap-1.5">
            <Leaf size={16} className="text-green-600 fill-green-600" />
            <span className="text-[15px] font-semibold text-gray-900">
              {userData.co2Saved} g
            </span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="mt-4">
        {menuItems.map(({ label, subtitle, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-4 px-5 py-4 active:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <Icon size={20} className="text-gray-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium leading-snug text-gray-900">{label}</p>
              {subtitle && (
                <p className="text-gray-400 text-[12px] mt-0.5 leading-snug">{subtitle}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Version */}
      <p className="px-5 mt-6 text-gray-400 text-[13px]">{userData.version}</p>
    </div>
  );
}