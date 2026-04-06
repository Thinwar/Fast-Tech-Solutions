import { useEffect, useState } from "react";

const STORAGE_KEY = "fast-tech-admin-session";
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000").replace(
  /\/$/,
  "",
);

async function request(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload;
}

function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function writeStoredSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function useAdminSession() {
  const [token, setToken] = useState(() => readStoredSession()?.token || "");
  const [user, setUser] = useState(() => readStoredSession()?.user || null);
  const [status, setStatus] = useState("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function verifySession() {
      if (!token) {
        if (!cancelled) {
          setUser(null);
          setStatus("signed_out");
        }
        return;
      }

      try {
        const payload = await request("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (payload.user?.role !== "admin") {
          throw new Error("Admin access required.");
        }

        if (!cancelled) {
          setUser(payload.user);
          setStatus("authenticated");
          setError("");
          writeStoredSession({ token, user: payload.user });
        }
      } catch (sessionError) {
        if (!cancelled) {
          setToken("");
          setUser(null);
          setStatus("signed_out");
          setError(sessionError.message || "Your admin session has expired.");
          writeStoredSession(null);
        }
      }
    }

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function login(email, password) {
    setStatus("authenticating");
    setError("");

    try {
      const payload = await request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (payload.user?.role !== "admin") {
        throw new Error("This account does not have admin access.");
      }

      writeStoredSession({ token: payload.token, user: payload.user });
      setToken(payload.token);
      setUser(payload.user);
      setStatus("authenticated");
      return true;
    } catch (loginError) {
      writeStoredSession(null);
      setToken("");
      setUser(null);
      setStatus("signed_out");
      setError(loginError.message || "Unable to sign in.");
      return false;
    }
  }

  async function logout() {
    const currentToken = token;

    writeStoredSession(null);
    setToken("");
    setUser(null);
    setStatus("signed_out");
    setError("");

    if (!currentToken) {
      return;
    }

    try {
      await request("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
    } catch {
      // Ignore logout failures because the local session is already cleared.
    }
  }

  return {
    error,
    isAuthenticated: status === "authenticated" && user?.role === "admin",
    isChecking: status === "checking",
    isSubmitting: status === "authenticating",
    login,
    logout,
    user,
  };
}
