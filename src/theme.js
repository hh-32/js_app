import { createTheme } from "@mui/material/styles";

const SM_BLUE = "#0E207F";
const SM_LIGHT_GRAY = "#D9D9D9";
const SM_DARK_GRAY = "#333B3D";

const theme = createTheme({
  palette: {
    primary: { main: SM_BLUE },
    background: { default: "#ffffff" },
    text: { primary: SM_DARK_GRAY },
    neutral: { main: SM_LIGHT_GRAY },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: SM_BLUE,
          color: "#fff",
          "&:hover": { backgroundColor: "#09165a" },
        },
      },
    },
  },
});

export default theme;
