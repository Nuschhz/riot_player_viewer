import Menu from "./screens/Menu";
import SearchContextProvider from "./context/SearchContext";
import { useState } from "react";
import ThemeContextProvider from "./context/ThemeContext";

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: null,
    tagline: null,
    icon: null,
    level: null,
    mastery: null,
    exist: false,
  });

  const [theme, setTheme] = useState({
    primary: "#0AC8B9",
    secondary: "#C8AA6E",
    tertiary: "#E64646",
    background: "#010A13",
    displayColor: "#F0E6D2",
    gray: "#5B5A56",
    gradientRed: "linear-gradient(30deg, #550E0E, #E64646) 1/1px",
    gradientGold: "linear-gradient(30deg, #785A28, #C89B3C) 1/1px",
    gradientBlue: "linear-gradient(30deg, #005A82, #0AC8B9) 1/1px",
  });

  return (
    <ThemeContextProvider value={{ theme, setTheme }}>
      <SearchContextProvider value={{ currentUser, setCurrentUser }}>
        <Menu />
      </SearchContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
