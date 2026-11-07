import { NavLink, useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function NavBar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-brand">
        <span className="brand-mark">NUS</span>
        <span className="brand-text">Portal</span>
      </NavLink>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="sidebar-link">
          <Icon><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></Icon>
          <span>Home</span>
        </NavLink>
        <NavLink to="/academics" className="sidebar-link">
          <Icon>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
            <path d="M6.5 17A2.5 2.5 0 0 0 4 19.5 2.5 2.5 0 0 0 6.5 22H20v-5" />
          </Icon>
          <span>Academics</span>
        </NavLink>
        <NavLink to="/admission" className="sidebar-link">
          <Icon>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" />
          </Icon>
          <span>Admission</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-account">
        {user ? (
          <>
            <p className="sidebar-user">
              Signed in as
              <strong title={user.email}>{user.displayName || user.email}</strong>
            </p>
            <button type="button" className="sidebar-link" onClick={handleLogout}>
              <Icon>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </Icon>
              <span>Log out</span>
            </button>
          </>
        ) : (
          <NavLink to="/login" className="sidebar-link">
            <Icon>
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </Icon>
            <span>Login</span>
          </NavLink>
        )}
      </div>

      <p className="sidebar-footer">National University of Singapore</p>
    </aside>
  );
}
