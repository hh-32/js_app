import React, { useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {user ? `${user.name}님, 환영합니다` : "환영합니다"}
      </Typography>

      <Box>
        <IconButton onClick={() => navigate("/notifications")} aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
        <IconButton onClick={() => navigate("/chat")} aria-label="chat">
          <ChatIcon />
        </IconButton>
        <IconButton onClick={() => navigate("/profile")} aria-label="profile">
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
