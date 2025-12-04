import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login = async ({ studentId, password }) => {
    if (!studentId || !password) throw new Error("학번/비밀번호 필요");

    // 더미 로그인 (실제 연동 시 api.post('/auth/login',...) 사용)
    const mockUser = { id: 1, name: "홍길동", studentId, nickname: "길동" };
    const mockToken = "mock-jwt-token";

    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", mockToken);

    setUser(mockUser);
    setToken(mockToken);

    return true; // 호출한 컴포넌트가 navigate 수행
  };

  const signup = async (payload) => {
    // 실제: call backend signup; 여기서는 바로 login 호출
    await login({ studentId: payload.studentId, password: payload.password });
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const updateProfile = (partial) => {
    const updated = { ...user, ...partial };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
