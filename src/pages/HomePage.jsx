import React, { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import Header from "../components/Header";
import TimetableGrid from "../components/TimetableGrid";
import MatchModal from "../components/MatchModal";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  console.log(user); //오류 방지용

  const navigate = useNavigate();
  // 샘플 강의 데이터 (나중에 서버에서 불러오기)
  const [courses, setCourses] = useState([
    { id: 1, name: "데이터베이스", day: "월", time: "09:00-10:30" },
    { id: 2, name: "운영체제", day: "화", time: "11:00-12:30" },
  ]);
  console.log(setCourses); //오류 방지용


  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openMatch, setOpenMatch] = useState(false);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setOpenMatch(true);
  };

  const handleLike = (candidate, isLike) => {
    // 클라이언트 토큰 카운트 간단 구현 (실제: 서버 로직 필요)
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

      <MatchModal open={openMatch} onClose={() => setOpenMatch(false)} course={selectedCourse} onLike={handleLike} />
    </Box>
  );
}
