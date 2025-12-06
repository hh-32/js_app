import React, { createContext, useState } from "react";

export const TimetableContext = createContext();

export function TimetableProvider({ children }) {
  const [courses, setCourses] = useState([
    { id: 1, name: "데이터베이스", day: "월", time: "09:00-10:30" },
    { id: 2, name: "운영체제", day: "화", time: "11:00-12:30" },
  ]);

  return (
    <TimetableContext.Provider value={{ courses, setCourses }}>
      {children}
    </TimetableContext.Provider>
  );
}
