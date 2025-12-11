import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryProvider } from "./query-provider.jsx";
import './i18n/i18n';

createRoot(document.getElementById("root")).render(
	<QueryProvider>
		<RouterProvider router={router} />
	</QueryProvider>
);
