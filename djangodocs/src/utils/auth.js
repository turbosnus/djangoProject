import { API_BASE_URL, fetchWrapper } from "./api";

function authPost({ username, password }) {
	return fetchWrapper(`${API_BASE_URL}/api/token/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username: username, password: password }),
	});
}

const tokenFromStorage = () => {
	const authToken = localStorage.getItem("authToken") || "";
	const refreshToken = localStorage.getItem("refreshToken") || "";
	return { authToken, refreshToken };
};

const setTokensToStorage = (authToken, refreshToken) => {
	localStorage.setItem("authToken", authToken);
	localStorage.setItem("refreshToken", refreshToken);
};

export { authPost, tokenFromStorage, setTokensToStorage };
