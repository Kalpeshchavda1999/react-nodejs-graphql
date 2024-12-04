import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import ScrollTop from "./components/ScrollTop";
import { ThemeContextProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
