import { Outlet, useNavigate } from "react-router";
import "./App.css";
import { useEffect } from "react";
import { useAuthStore } from "./store/store";

function App() {
	const token = useAuthStore((state) => state.authToken);
	const navigate = useNavigate();
	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token, navigate]);

	return (
		<>
			<Outlet />
		</>
	);
}

export default App;
