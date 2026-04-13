import React, { createContext, useContext, useState, useCallback } from "react";

type UserRole = "worker" | "hospital" | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  userName: string;
  needsOtp: boolean;
  otpTarget: string;
}

interface AuthContextType extends AuthState {
  login: (role: UserRole, name: string) => void;
  requestOtp: (target: string) => void;
  verifyOtp: (otp: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    userName: "",
    needsOtp: false,
    otpTarget: "",
  });

  const login = useCallback((role: UserRole, name: string) => {
    setState({ isAuthenticated: false, role, userName: name, needsOtp: true, otpTarget: "" });
  }, []);

  const requestOtp = useCallback((target: string) => {
    setState(s => ({ ...s, otpTarget: target, needsOtp: true }));
  }, []);

  const verifyOtp = useCallback((otp: string) => {
    // Mock: any 6-digit code works, or "123456"
    if (otp.length === 6) {
      setState(s => ({ ...s, isAuthenticated: true, needsOtp: false }));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setState({ isAuthenticated: false, role: null, userName: "", needsOtp: false, otpTarget: "" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, requestOtp, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
