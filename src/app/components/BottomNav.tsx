"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Clock, User } from "lucide-react";

const tabs = [
  { label: "Home", href: "/user", icon: Home },
  { label: "Services", href: "/user/services", icon: LayoutGrid },
  { label: "Activity", href: "/user/activity", icon: Clock },
  { label: "Account", href: "/user/account", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/user" ? pathname === "/user" : pathname.startsWith(href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-1 py-2 pb-5"
            >
              <Icon
                size={24}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "text-black" : "text-gray-400"}
              />
              <span
                className={`text-[11px] font-medium ${
                  active ? "text-black" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}