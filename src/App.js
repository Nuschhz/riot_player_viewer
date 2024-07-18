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
    blue00: "#619DFF",
    blue01: "#3b82f6",
    gray00: "#a3a3a3",
    gray01: "#171A1E",
    background: "#020203",
    displayColor: "#f5f5f5",
    textColor: "#f5f5f5",
    greenText00: "#0AC8B9",
    greenText01: "#CDFAFA",
    redText00: "#E64646",
    redText01: "#FF9393",
    grayText00: "#C2C2C2",
    grayText01: "#EAEAEA",
    backgroundGradient: "linear-gradient(to bottom, #0E1117E6, #020203)",
    blueGradient: "linear-gradient(to bottom, #171A1EF2, #171A1EF2, #294A80)",
    greenGradientFill: "linear-gradient(to right, #06060B, #06060B, #011B19B3)",
    greenGradientStroke:
      "linear-gradient(to right, #171A1EF2, #171A1EF2, #063935) 1/1px",
    redGradientFill: "linear-gradient(to right, #06060B, #06060B, #1B0101B3)",
    redGradientStroke:
      "linear-gradient(to right, #171A1EF2, #171A1EF2, #511818) 1/1px",
    grayGradientFill: "linear-gradient(to right, #06060B, #06060B, #1F1F1F99)",
    grayGradientStroke:
      "linear-gradient(to right, #171A1EF2, #171A1EF2, #64748499) 1/1px",
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
