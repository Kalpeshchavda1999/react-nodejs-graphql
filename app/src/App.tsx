import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import ScrollTop from "./components/ScrollTop";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeContextProvider>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeContextProvider>
  );
}

export default App;
