import React, { useContext } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const displayName = user?.nickname || user?.name || "사용자";

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {`${displayName}님, 환영합니다`}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => navigate("/notifications")}>
          <NotificationsIcon />
        </IconButton>
        <IconButton onClick={() => navigate("/chat")}>
          <ChatIcon />
        </IconButton>
        <IconButton onClick={() => navigate("/profile")}>
          <AccountCircleIcon />
        </IconButton>

        <Button variant="outlined" color="error" onClick={() => { logout(); navigate("/"); }}>
          로그아웃
        </Button>
      </Box>
    </Box>
  );
}
