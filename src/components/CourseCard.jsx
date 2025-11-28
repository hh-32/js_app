import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function CourseCard({ course, onClick }) {
  return (
    <Card variant="outlined" sx={{ cursor: "pointer" }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {course.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
          {course.day} {course.time}
        </Typography>
        <Button variant="contained" size="small" onClick={onClick}>
          매칭 시작
        </Button>
      </CardContent>
    </Card>
  );
}
