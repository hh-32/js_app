import React, { useState, useEffect } from "react";
import { Box, Button, TextField, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TimetableEditor() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  // 📌 기존에 저장된 시간표 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("courses");
    if (saved) {
      setCourses(JSON.parse(saved));
    }
  }, []);

  const addCourse = () => {
    if (!name) return;
    const newList = [...courses, { id: Date.now(), name, day, time }];
    setCourses(newList);

    // 📌 localStorage 저장
    localStorage.setItem("courses", JSON.stringify(newList));

    setName("");
    setDay("");
    setTime("");
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", mt: 4 }}>
      <Button onClick={() => navigate("/home")} sx={{ mb: 2 }}>
        뒤로가기
      </Button>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField label="강의명" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="요일" value={day} onChange={(e) => setDay(e.target.value)} />
        <TextField label="시간" value={time} onChange={(e) => setTime(e.target.value)} />
        <Button variant="contained" onClick={addCourse}>
          강의 추가
        </Button>
      </Box>

      <List>
        {courses.map((c) => (
          <ListItem key={c.id}>
            <ListItemText primary={c.name} secondary={`${c.day} ${c.time}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
