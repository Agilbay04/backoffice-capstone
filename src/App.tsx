import UsersPage from "./app/users/page"
import type { User } from "./types/domain";

const MOCK_SIGNED_IN_USER: User = {
  id: '334123',
  name: 'Mama Ghufron',
  email: 'ghufron@example.com',
  role: 'admin',
  status: 'active',
  createdAt: '2026-05-15'
}


export default function App() {
  return (<div className="app-shell">
      {/* SIDEBAR COMPONENT */}
      <aside className="sidebar">
        <h2>Back Office</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <a href="#dashboard" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dashboard</a>
          <a href="#users" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>User</a>
          <a href="#requests" style={{ color: '#94a3b8', textDecoration: 'none' }}>Requests</a>
          <a href="#logs" style={{ color: '#94a3b8', textDecoration: 'none' }}>Audit Logs</a>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="main-area">
        {/* TOPBAR COMPONENT */}
        <header className="topbar">
          <div><strong>Role: {MOCK_SIGNED_IN_USER.role.toUpperCase()}</strong></div>
          <div>Logged in as: <strong>{MOCK_SIGNED_IN_USER.name}</strong></div>
        </header>

        {/* PAGE CONTENT */}
        <div className="content-area">
          <UsersPage />
        </div>
      </div>
    </div>
  );
}
