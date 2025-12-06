import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 관리자 + 회원가입된 계정 저장 (임시 DB)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved
      ? JSON.parse(saved)
      : [
          {
            studentId: "admin",
            password: "admin123",
            name: "관리자",
            nickname: "Admin",
          },
        ];
  });

  // 현재 로그인된 사용자
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

  // -------------------------------------
  // 로그인 기능
  // -------------------------------------
  const login = async ({ studentId, password }) => {
    if (!studentId || !password) throw new Error("학번/비밀번호 필요");

    // users 배열에서 계정 찾기
    const found = users.find(
      (u) => u.studentId === studentId && u.password === password
    );

    if (!found) {
      return false; // 로그인 실패
    }

    const mockToken = "mock-jwt-token";

    localStorage.setItem("user", JSON.stringify(found));
    localStorage.setItem("token", mockToken);

    setUser(found);
    setToken(mockToken);

    return true;
  };

  // -------------------------------------
  // 회원가입 기능
  // -------------------------------------
  const signup = async ({ studentId, password, name, nickname }) => {
    if (users.find((u) => u.studentId === studentId)) {
      return false; // 이미 존재
    }

    const newUser = { studentId, password, name, nickname };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 회원가입 후 자동 로그인
    await login({ studentId, password });
    return true;
  };

  // -------------------------------------
  // 로그아웃
  // -------------------------------------
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // -------------------------------------
  // 프로필 업데이트
  // -------------------------------------
  const updateProfile = (partial) => {
    const updated = { ...user, ...partial };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));

    const newUserList = users.map((u) =>
      u.studentId === user.studentId ? updated : u
    );

    setUsers(newUserList);
    localStorage.setItem("users", JSON.stringify(newUserList));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
