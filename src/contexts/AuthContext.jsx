import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login = async ({ studentId, password }) => {
    // 실제: POST /auth/login
    // 더미 동작: accept any non-empty
    if (!studentId || !password) throw new Error("학번/비밀번호 필요");
    // 실제 응답 모의
    const mockUser = { id: 1, name: "홍길동", studentId, nickname: "길동" };
    const mockToken = "mock-jwt-token";
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", mockToken);
    setUser(mockUser);
    setToken(mockToken);
    navigate("/home");
  };

  const signup = async (payload) => {
    // 실제: POST /auth/signup
    // 여기서는 바로 로그인 처리
    await login({ studentId: payload.studentId, password: payload.password });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
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
