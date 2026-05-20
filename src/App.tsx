import UsersPage from "./app/users/page";
import { MOCK_USERS } from "./app/users/_mocks/users";
import type { User } from "./types/domain";
import { MOCK_MENUS } from "./app/users/_mocks/menus";

const MOCK_SIGNED_IN_USER: User = MOCK_USERS[0];

export default function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      {/* SIDEBAR COMPONENT */}
      <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col gap-5">
        <h2 className="text-xl font-bold tracking-wider text-center text-white">Back Office</h2>
        <nav className="flex flex-col gap-2 mt-4">
          {MOCK_MENUS.map((menu) => (
            <a
              key={menu?.id}
              href={menu?.url}
              className="px-4 py-2 rounded text-slate-400 hover:bg-slate-800 hover:text-white transition-colors no-underline hover:font-bold"
            >
              {menu?.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOPBAR COMPONENT */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-end shadow-sm">
          <div className="text-sm text-slate-600">
            Logged in as: <strong className="text-slate-900">{MOCK_SIGNED_IN_USER.name} ({MOCK_SIGNED_IN_USER.role.toUpperCase()})</strong>
          </div> 
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-6 overflow-y-hidden">
          <UsersPage />
        </div>
      </div>
    </div>
  );
}
