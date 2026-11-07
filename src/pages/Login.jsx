import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmail,
  logInWithGoogle,
  registerWithEmail,
  sendPasswordReset,
} from "../firebase";
import { getAuthError } from "../authErrors";
import Notification from "../components/Notification";

const pageNames = { "/academics": "Academics", "/admission": "Admission" };

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const from = location.state?.from;

  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(
    from
      ? {
          type: "info",
          title: "Login required",
          text: `Please log in to view the ${pageNames[from] ?? "requested"} page.`,
        }
      : null
  );

  if (loading) return <p className="loading">Loading…</p>;
  // Once logged in, go to the page they wanted (or Home)
  if (user) return <Navigate to={from ?? "/"} replace />;

  const showError = (title, text) => setNotice({ type: "error", title, text });

  // Runs a Firebase call and turns any error into a notification
  const run = async (action) => {
    setBusy(true);
    setNotice(null);
    try {
      await action();
    } catch (err) {
      console.error(err);
      setNotice({ type: "error", ...getAuthError(err, email.trim()) });
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "signup" && !name.trim())
      return showError("Name required", "Please enter your full name to create an account.");
    if (!email.trim()) return showError("Email required", "Please enter your email address.");
    if (!password) return showError("Password required", "Please enter your password.");

    run(() =>
      mode === "login"
        ? logInWithEmail(email.trim(), password)
        : registerWithEmail(name.trim(), email.trim(), password)
    );
  };

  const handleReset = () => {
    if (!email.trim())
      return showError(
        "Enter your email first",
        "Type your account's email above, then click \"Forgot password?\" again."
      );
    run(async () => {
      await sendPasswordReset(email.trim());
      setNotice({
        type: "success",
        title: "Reset email sent",
        text: `If an account exists for ${email.trim()}, a password reset link is on its way.`,
      });
    });
  };

  const switchMode = (next) => {
    setMode(next);
    setNotice(null);
    setPassword("");
  };

  const isLogin = mode === "login";

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>{isLogin ? "Welcome back" : "Create an account"}</h1>
        <p className="page-subtitle">
          {isLogin
            ? "Log in to access Academics and Admission."
            : "Sign up with your email or Google account."}
        </p>

        <div className="auth-tabs">
          <button type="button" className={isLogin ? "active" : ""} onClick={() => switchMode("login")}>
            Log in
          </button>
          <button type="button" className={!isLogin ? "active" : ""} onClick={() => switchMode("signup")}>
            Sign up
          </button>
        </div>

        <Notification notice={notice} onClose={() => setNotice(null)} />

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <label>
              Full name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
          )}
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </label>

          {isLogin && (
            <button type="button" className="link-button" onClick={handleReset}>
              Forgot password?
            </button>
          )}

          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Please wait…" : isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <button type="button" className="btn btn-google" onClick={() => run(logInWithGoogle)} disabled={busy}>
          <GoogleIcon /> Continue with Google
        </button>
      </div>
    </section>
  );
}
