import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Header from "../components/Header";
import TimetableGrid from "../components/TimetableGrid";
import MatchModal from "../components/MatchModal";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openMatch, setOpenMatch] = useState(false);

  // 📌 localStorage에서 시간표 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("courses");
    if (saved) {
      setCourses(JSON.parse(saved));
    }
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setOpenMatch(true);
  };

  const handleLike = (candidate, isLike) => {
    alert(`${candidate.nickname}에 ${isLike ? "좋아요" : "싫어요"}를 눌렀습니다.`);
    setOpenMatch(false);
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4 }}>
      <Header />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/timetable/edit")}>
          시간표 수정
        </Button>
      </Box>

      <TimetableGrid courses={courses} onCourseClick={handleCourseClick} />

      <MatchModal
        open={openMatch}
        onClose={() => setOpenMatch(false)}
        course={selectedCourse}
        onLike={handleLike}
      />
    </Box>
  );
}
