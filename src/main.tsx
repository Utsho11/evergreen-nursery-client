import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/toaster.tsx";
import { persistor, store } from "./redux/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="evergreen-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
      <Toaster />
    </Provider>
  </React.StrictMode>
);

