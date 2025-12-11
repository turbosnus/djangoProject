import { useAuthStore } from "../store/store";

const API_BASE_URL = "http://127.0.0.1:8000";

function fetchWrapper(url, options) {
  return fetch(url, options).then((response) => {
    if (!response.ok) {
      const clearToken = useAuthStore.getState().clearAuthTokens;
      console.log("Response not ok, clearing tokens");
      clearToken();
    }
    return response.json();
  });
}
export { fetchWrapper, API_BASE_URL };
