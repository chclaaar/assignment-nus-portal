// Turns Firebase error codes into messages a user can act on
export function getAuthError(error, email) {
  const who = email ? ` for ${email}` : "";

  const messages = {
    "auth/user-not-found": {
      title: "Account not found",
      text: `There is no account registered${who}. Check the spelling, or switch to Sign up to create one.`,
    },
    "auth/wrong-password": {
      title: "Incorrect password",
      text: "The password is wrong for this account. Try again, or click \"Forgot password?\" to reset it.",
    },
    "auth/invalid-credential": {
      title: "Incorrect email or password",
      text: "We couldn't log you in with those details. Check your email and password and try again.",
    },
    "auth/invalid-email": {
      title: "Invalid email address",
      text: "That doesn't look like a valid email. It should look like name@example.com.",
    },
    "auth/missing-password": {
      title: "Password required",
      text: "Please enter your password.",
    },
    "auth/email-already-in-use": {
      title: "Email already registered",
      text: `An account already exists${who}. Switch to Log in instead.`,
    },
    "auth/weak-password": {
      title: "Password too weak",
      text: "Your password must be at least 6 characters long.",
    },
    "auth/too-many-requests": {
      title: "Too many attempts",
      text: "This account is temporarily locked after several failed attempts. Wait a few minutes or reset your password.",
    },
    "auth/user-disabled": {
      title: "Account disabled",
      text: "This account has been disabled. Please contact the administrator.",
    },
    "auth/popup-closed-by-user": {
      title: "Google sign-in cancelled",
      text: "The Google window was closed before sign-in finished. Click \"Continue with Google\" to try again.",
    },
    "auth/popup-blocked": {
      title: "Popup blocked",
      text: "Your browser blocked the Google sign-in window. Allow popups for this site and try again.",
    },
    "auth/account-exists-with-different-credential": {
      title: "Use your original sign-in method",
      text: "This email is already registered with a different sign-in method. Log in the way you signed up.",
    },
    "auth/network-request-failed": {
      title: "Network error",
      text: "Couldn't reach the server. Check your internet connection and try again.",
    },
  };

  return (
    messages[error?.code] ?? {
      title: "Something went wrong",
      text: `Unexpected error (${error?.code ?? "unknown"}). Please try again.`,
    }
  );
}
