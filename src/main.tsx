import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { userApi } from "./services/userApi.ts";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CssBaseline />
        <ErrorBoundary fallback={<h1>Упс, что-то пошло не так</h1>}>
            <ApiProvider api={userApi}>
                <App />
            </ApiProvider>
        </ErrorBoundary>
    </StrictMode>
);
