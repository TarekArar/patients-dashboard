import Link from "next/link";
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

export function Sidebar() {
  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-8 flex items-center">
        <div className="w-8 h-8 rounded-full bg-teal-600 mr-2"></div>
        <h1 className="text-xl font-semibold text-gray-900">Allia Health</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Home className="w-5 h-5 mr-3 text-gray-500" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/patients"
              className="flex items-center p-2 text-white bg-teal-600 rounded-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Patients
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/messages"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <MessageSquare className="w-5 h-5 mr-3 text-gray-500" />
              Messages
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/appointments"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Calendar className="w-5 h-5 mr-3 text-gray-500" />
              My Appointments
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/calendar-setup"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Calendar className="w-5 h-5 mr-3 text-gray-500" />
              Calendar Setup
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/management"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 mr-3 text-gray-500" />
              Management
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/billing"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <CreditCard className="w-5 h-5 mr-3 text-gray-500" />
              Billing
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/clinicians"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <UserCog className="w-5 h-5 mr-3 text-gray-500" />
              Clinicians
            </Link>
          </li>
        </ul>
      </nav>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-center p-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
