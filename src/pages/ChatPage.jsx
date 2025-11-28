import React, { useState } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText } from "@mui/material";

export default function ChatPage() {
  const [messages, setMessages] = useState([{ id: 1, text: "안녕하세요!" }]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input) return;
    setMessages((m) => [...m, { id: Date.now(), text: input }]);
    setInput("");
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", mt: 4 }}>
      <List sx={{ mb: 2 }}>
        {messages.map((msg) => (
          <ListItem key={msg.id}>
            <ListItemText primary={msg.text} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} />
        <Button variant="contained" onClick={send}>전송</Button>
      </Box>
    </Box>
  );
}
