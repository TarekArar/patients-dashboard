"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  CreditCard,
  UserCog,
  User,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

type MenuItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const menuItems: MenuItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/patients", label: "Patients", icon: Users },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/appointments", label: "My Appointments", icon: Calendar },
  {
    href: "/dashboard/calendar-setup",
    label: "Calendar Setup",
    icon: Calendar,
  },
  { href: "/dashboard/management", label: "Management", icon: Settings },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/clinicians", label: "Clinicians", icon: UserCog },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      className="min-h-screen w-64 bg-white border-r border-gray-200 p-4 flex flex-col"
      role="complementary"
      aria-label="Main Sidebar"
    >
      <div className="mb-8 flex items-center">
        <div
          className="w-8 h-8 rounded-full bg-teal-700 mr-2"
          role="img"
          aria-label="Allia Health Logo"
        ></div>
        <h1 className="text-xl font-semibold text-gray-900">Allia Health</h1>
      </div>

      <nav className="flex-1" aria-label="Main Navigation">
        <ul className="space-y-1" role="menu" aria-label="Navigation Menu">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg ${
                    isActive
                      ? "text-white bg-teal-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                  aria-current={isActive ? "page" : "false"}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? "" : "text-gray-500"
                    }`}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className="border-t border-gray-200 pt-4 mt-4"
        role="complementary"
        aria-label="User Profile"
      >
        <div className="flex items-center p-2">
          <div
            className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center"
            role="img"
            aria-label="User Avatar"
          >
            <User className="w-5 h-5 text-gray-500" aria-hidden="true" />
          </div>
          <div>
            <p
              className="text-sm font-medium text-gray-900"
              role="heading"
              aria-level={2}
            >
              Dr. Smith
            </p>
            <p className="text-xs text-gray-500" role="status">
              Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
