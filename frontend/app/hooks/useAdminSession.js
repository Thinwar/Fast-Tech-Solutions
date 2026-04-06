import { useAuth } from "@clerk/react-router";
import { useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")
  : "";

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

export function useAdminSession() {
  const { isLoaded, isSignedIn, user, getToken, signOut } = useAuth();
  const [adminUser, setAdminUser] = useState(null);
  const [status, setStatus] = useState("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function verifyAdminAccess() {
      if (!isLoaded) {
        return;
      }

      if (!isSignedIn) {
        if (!cancelled) {
          setAdminUser(null);
          setStatus("signed_out");
          setError("");
        }
        return;
      }

      try {
        const token = await getToken();
        const payload = await request("/api/auth/admin-check", {
          method: "POST",
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (payload.user?.role !== "admin") {
          await signOut();
          if (!cancelled) {
            setAdminUser(null);
            setStatus("signed_out");
            setError("This account does not have admin access.");
          }
          return;
        }

        if (!cancelled) {
          setAdminUser(payload.user);
          setStatus("authenticated");
          setError("");
        }
      } catch (sessionError) {
        if (!cancelled) {
          setAdminUser(null);
          setStatus("signed_out");
          setError(sessionError.message || "Admin access verification failed.");
        }
      }
    }

    verifyAdminAccess();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, user, getToken, signOut]);

  const logout = async () => {
    try {
      await signOut();
      setAdminUser(null);
      setStatus("signed_out");
      setError("");
    } catch {
      // Ignore logout failures
    }
  };

  return {
    error,
    isAuthenticated: status === "authenticated" && adminUser?.role === "admin",
    isChecking: status === "checking" || !isLoaded,
    isSubmitting: false,
    logout,
    user: adminUser,
  };
}
