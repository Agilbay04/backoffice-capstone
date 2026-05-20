import { Outlet, NavLink } from "react-router-dom";
import { NAV_ITEMS } from "@/common/consts/navigation";
import { MOCK_USERS } from "@/app/users/_mocks/users";

const USER_SIGNED_IN = MOCK_USERS[0];

export default function AppLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col gap-5">
        <h2 className="text-xl font-bold tracking-wider text-center text-white">
          Back Office
        </h2>
        <nav className="flex flex-col gap-2 mt-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item?.url}
              to={item?.url}
              className={({ isActive }) =>
                `px-4 py-2 rounded transition-colors no-underline ${
                  isActive
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {item?.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-end shadow-sm">
          <div className="text-sm text-slate-600">
            Logged in as: <strong className="text-slate-900">{USER_SIGNED_IN?.name} ({USER_SIGNED_IN?.role?.toUpperCase()})</strong>
          </div>
        </header>

        {/* PAGE CONTENT — diganti sesuai route */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}