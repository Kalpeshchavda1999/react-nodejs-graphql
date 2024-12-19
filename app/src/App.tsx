import { RouterProvider } from "react-router-dom";
import router from "./routes";
import ScrollTop from "./components/ScrollTop";
import { ThemeContextProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apolloClient";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <ThemeContextProvider>
            <ScrollTop>
              <RouterProvider router={router} />
            </ScrollTop>
          </ThemeContextProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
