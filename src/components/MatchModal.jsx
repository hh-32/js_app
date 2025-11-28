import React, { useState } from "react";
import { Modal, Box, Typography, Avatar, Button } from "@mui/material";

const style = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 340, bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 3 };

export default function MatchModal({ open, onClose, course, onLike }) {
  // 간단 랜덤 유저 (실제: 서버에서 후보 받아옴)
  const [candidate] = useState(() => ({
    id: Math.floor(Math.random() * 1000),
    name: "이상형",
    nickname: "닉네임",
    avatar: null,
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          {course ? `${course.name} 수강자 매칭` : "매칭"}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ width: 84, height: 84 }}>{candidate.name[0]}</Avatar>
          <Typography sx={{ fontWeight: 700 }}>{candidate.nickname}</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => onLike(candidate, true)}>
              좋아요
            </Button>
            <Button variant="outlined" onClick={() => onLike(candidate, false)}>
              싫어요
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
