import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import CourseCard from "./CourseCard";

export default function TimetableGrid({ courses = [], onCourseClick }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        시간표
      </Typography>
      <Grid container spacing={2}>
        {courses.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>등록된 강의가 없습니다. 시간표를 추가하세요.</Paper>
          </Grid>
        )}
        {courses.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <CourseCard course={c} onClick={() => onCourseClick(c)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
