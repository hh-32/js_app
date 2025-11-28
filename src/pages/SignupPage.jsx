import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

export default function SignupPage() {
  const { signup } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", birthYear: "", gender: "", studentId: "", password: "", email: "" });
  const [err, setErr] = useState("");

  const handleChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
    } catch (error) {
      setErr(error.message || "회원가입 실패");
    }
  };

  return (
    <Box sx={{ maxWidth: 520, mx: "auto", mt: 6, p: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          회원가입
        </Typography>

        <TextField label="이름" value={form.name} onChange={handleChange("name")} fullWidth sx={{ mb: 2 }} />
        <TextField label="출생연도" value={form.birthYear} onChange={handleChange("birthYear")} fullWidth sx={{ mb: 2 }} />
        <TextField select label="성별" value={form.gender} onChange={handleChange("gender")} fullWidth sx={{ mb: 2 }}>
          <MenuItem value="male">남성</MenuItem>
          <MenuItem value="female">여성</MenuItem>
          <MenuItem value="other">기타</MenuItem>
        </TextField>
        <TextField label="학번" value={form.studentId} onChange={handleChange("studentId")} fullWidth sx={{ mb: 2 }} />
        <TextField label="비밀번호" type="password" value={form.password} onChange={handleChange("password")} fullWidth sx={{ mb: 2 }} />
        <TextField label="이메일" value={form.email} onChange={handleChange("email")} fullWidth sx={{ mb: 2 }} />

        {err && <Typography color="error" sx={{ mb: 1 }}>{err}</Typography>}

        <Button type="submit" variant="contained" fullWidth>
          회원가입
        </Button>
      </Box>
    </Box>
  );
}
