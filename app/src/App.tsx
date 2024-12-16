import { RouterProvider } from "react-router-dom";
import router from "./routes";
import ScrollTop from "./components/ScrollTop";
import { ThemeContextProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContextProvider>
          <ScrollTop>
            <RouterProvider router={router} />
          </ScrollTop>
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
