import { createContext, useContext, useMemo, useState } from "react";
import { loginUser, logoutUser, saveProfile } from "../services/authService";

const AUTH_STORAGE_KEY = "eureka_auth_user";
const AUTH_TOKEN_STORAGE_KEY = "eureka_auth_token";

const AuthContext = createContext(null);

function readUserFromStorage() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return parsed && parsed.email ? parsed : null;
  } catch {
    return null;
  }
}

function persistUser(user) {
  if (!user) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function readTokenFromStorage() {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || "";
}

function persistToken(token) {
  if (!token) {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readUserFromStorage());
  const [token, setToken] = useState(() => readTokenFromStorage());

  const login = async (payload) => {
    const response = await loginUser(payload);
    const nextUser = response.user;
    const nextToken = response.token || "";

    setUser(nextUser);
    setToken(nextToken);
    persistUser(nextUser);
    persistToken(nextToken);
  };

  const updateProfile = async (payload) => {
    const response = await saveProfile(token, payload);

    setUser((current) => {
      if (!current) {
        return current;
      }

      const updated = {
        ...current,
        fullName: response.user.fullName,
        phone: response.user.phone
      };

      persistUser(updated);
      return updated;
    });
  };

  const logout = async () => {
    await logoutUser(token);
    setUser(null);
    setToken("");
    persistUser(null);
    persistToken("");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user,
      login,
      updateProfile,
      logout
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
