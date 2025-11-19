// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import type ReactNode from "react";

interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

interface AuthData {
  user: User | null;
  token: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (authData: { token: string; user?: User }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean; // NEW
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>({
    user: null,
    token: null,
  });

  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);

        if (parsedAuth.token) {
          setAuthData({
            user: parsedAuth.user || null,
            token: parsedAuth.token,
          });
        }
      } catch (error) {
        console.error("Error parsing stored auth data:", error);
        localStorage.removeItem("auth");
      }
    }

    setLoading(false); // IMPORTANT
  }, []);

  const login = (authData: { token: string; user?: User }) => {
    const userData = authData.user || { email: "user@example.com" };

    const newAuthData = {
      user: userData,
      token: authData.token,
    };

    setAuthData(newAuthData);
    localStorage.setItem("auth", JSON.stringify(newAuthData));
  };

  const logout = () => {
    setAuthData({ user: null, token: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user: authData.user,
        token: authData.token,
        login,
        logout,
        isAuthenticated: !!authData.token,
        loading, // NEW
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
