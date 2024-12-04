import {
  useEffect,
  createContext,
  useMemo,
  ReactNode,
  FC,
  useState,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

const lightPalette = {
  mode: "light",
  background: {
    default: "#EFF1F2",
  }
};

const darkPalette = {
  mode: "dark",
  background: {
    default: "#141414",
  }
};

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: mode === "light" ? lightPalette : darkPalette,
        typography: {
          fontFamily: "'Lufga', sans-serif",
        },
      }),
    [mode]
  );

  useEffect(() => {
    // Apply the theme to the body element
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
