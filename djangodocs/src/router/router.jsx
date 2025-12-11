import { createBrowserRouter } from "react-router";
import App from "../App";

let router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
				path: "/",
				lazy: () => import("../pages/document-editor").then((module) => ({ Component: module.DocumentEditor })),
			},
		],
	},
	{
		path: "/login",
		lazy: () => import("../pages/login").then((module) => ({ Component: module.Login })),
	},
]);
export { router };
