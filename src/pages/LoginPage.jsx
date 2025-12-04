import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ studentId, password });
      navigate("/home");
    } catch (error) {
      setErr(error.message || "로그인 실패");
    }
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 8, p: 3 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <img src="/logo.png" alt="Sangmyung" style={{ height: 84 }} />
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: 700 }}>
          로그인
        </Typography>

        <TextField label="학번" value={studentId} onChange={(e) => setStudentId(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />

        {err && <Typography color="error" sx={{ mb: 1 }}>{err}</Typography>}

        <Button type="submit" variant="contained" fullWidth sx={{ mb: 1 }}>
          로그인
        </Button>

        <Button variant="text" component={Link} to="/signup" fullWidth>
          회원가입
        </Button>
      </Box>
    </Box>
  );
}
