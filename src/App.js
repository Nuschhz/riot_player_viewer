import Menu from "./screens/Menu";
import SearchContextProvider from "./context/SearchContext";
import ThemeContextProvider from "./context/ThemeContext";
import LoadingContextProvider from "./context/LoadingContext";

import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({
    searching: false,
    username: null,
    tagline: null,
    icon: null,
    level: null,
    mastery: null,
    exist: null,
  });

  const [theme, setTheme] = useState({
    primary: "#0ea5e9",
    secondary: "#0ea5e9",
    tertiary: "#E64646",
    background: "#fafafa",
    displayColor: "#f5f5f5",
    darkGold: "#32281E",
    gray01: "#404040",
    gray: "#a3a3a3",
    gradientRed: "linear-gradient(30deg, #550E0E, #E64646) 1/1px",
    gradientGold: "linear-gradient(30deg, #785A28, #C89B3C) 1/1px",
    gradientBlue: "linear-gradient(30deg, #005A82, #0AC8B9) 1/1px",
  });

  const [loading, setLoading] = useState(null);

  return (
    <ThemeContextProvider value={{ theme, setTheme }}>
      <SearchContextProvider value={{ currentUser, setCurrentUser }}>
        <LoadingContextProvider value={{ loading, setLoading }}>
          <Menu />
        </LoadingContextProvider>
      </SearchContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
