import { useAuthStore } from "../../store/store";
import { useNavigate } from "react-router";

function LogoutButton() {
  const clearAuth = useAuthStore((state) => state.clearAuthTokens);
  const navigate = useNavigate();

  function handleLogout() {
    clearAuth();
    navigate("/login");
  }

  return (
    <button
      onClick={handleLogout}
      type="button"
      className="fixed bottom-4 right-4 z-40 px-5 py-2.5 rounded-lg bg-red-800 hover:bg-red-700 text-white font-medium shadow-lg transition-colors"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}

export { LogoutButton };
