import { create } from "zustand";
import { setTokensToStorage, tokenFromStorage } from "../utils/auth";

const { authToken, refreshToken } = tokenFromStorage();

const useAuthStore = create((set) => ({
	authToken: authToken,
	refreshToken: refreshToken,
	setAuthTokens: (authToken, refreshToken) => {
		set({ authToken: authToken, refreshToken: refreshToken });
		setTokensToStorage(authToken, refreshToken);
	},
	clearAuthTokens: () => set({ authToken: "", refreshToken: "" }),
}));

export { useAuthStore };
