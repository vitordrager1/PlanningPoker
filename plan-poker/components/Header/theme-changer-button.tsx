import { IconButton } from "@mui/material";
import { useTheme } from "next-themes";
import { LightMode, DarkMode } from "@mui/icons-material";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      color="inherit"
    >
      {theme === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}
