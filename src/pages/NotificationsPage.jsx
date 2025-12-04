import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, text: "김OO님이 당신에게 좋아요를 보냈습니다.", type: "like" },
    { id: 2, text: "채팅: 안녕하세요?", type: "chat" },
  ];

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>알림</Typography>
      <List>
        {notifications.map((n) => (
          <ListItem button key={n.id}>
            <ListItemText primary={n.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
