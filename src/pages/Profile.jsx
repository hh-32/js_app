import React, { useContext, useState } from "react";
import { Box, TextField, Button, Avatar, Typography } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile } = useContext(AuthContext);
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [intro, setIntro] = useState(user?.intro || "");

  const save = () => {
    updateProfile({ nickname, intro });
    alert("저장되었습니다.");
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {user?.name}님, 프로필
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar sx={{ width: 120, height: 120 }}>{user?.name?.[0]}</Avatar>
        <Box sx={{ flex: 1 }}>
          <TextField label="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <TextField label="자기소개" value={intro} onChange={(e) => setIntro(e.target.value)} fullWidth multiline rows={4} sx={{ mb: 2 }} />
          <Button variant="contained" onClick={save}>
            저장
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
