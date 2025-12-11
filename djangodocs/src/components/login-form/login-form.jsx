import { useState } from "react";
import { authPost } from "../../utils/auth";
import { useAuthStore } from "../../store/store";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { LangButton } from "../lang-button/lang";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const setAuthTokens = useAuthStore((state) => state.setAuthTokens);
  const authTokens = useAuthStore((state) => state.authToken);
  const navigate = useNavigate();

  function onInputChange(e, setState) {
    setState(e.currentTarget.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setServerError("");
  }

  function validate() {
    const newErrors = {};
    if (!login || login.trim() === "")
      newErrors.login = "Введите имя пользователя";
    if (!password || password.trim() === "")
      newErrors.password = "Введите пароль";
    else if (password.length < 6)
      newErrors.password = "Пароль должен быть не менее 6 символов";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setIsLoading(true);
    try {
      const data = await authPost({ username: login, password: password });
      if (!data?.access) {
        setServerError("Неверный ответ от сервера");
        return;
      }
      setAuthTokens(data.access, data.refresh);
      navigate("/");
    } catch (err) {
      // ожидается, что authPost бросает Error или возвращает объект с сообщением
      const msg =
        err?.message ||
        "Ошибка авторизации. Проверьте данные и повторите попытку.";
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  console.log("Auth tokens in store: ", authTokens);
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={onFormSubmit}
        className="max-w-md w-full bg-white px-[2rem] py-[3rem] rounded-xl shadow-2xl flex flex-col gap-[1rem]"
        noValidate
      >
        <div className="flex flex-col gap-[0.5rem]">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {t("Welcome")}
          </h2>
          <p className="text-center text-sm text-gray-600">{t("Login")}</p>
        </div>

        {serverError && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-100 py-2 px-3 rounded">
            {serverError}
          </div>
        )}

        <div className="flex flex-col gap-[0.5rem]">
          <div className="flex flex-col relative">
            <label
              className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
              htmlFor="username"
            >
              {t("Name")}
            </label>
            <input
              name="login"
              id="username"
              onChange={(e) => onInputChange(e, setLogin)}
              value={login}
              type="text"
              className={`mb-[1.5rem] text-[#000] appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.login ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Введите имя пользователя"
              aria-invalid={errors.login ? "true" : "false"}
              aria-describedby={errors.login ? "login-error" : undefined}
            />
            {errors.login && (
              <p
                id="login-error"
                className="absolute bottom-0 text-red-600 text-sm"
              >
                {errors.login}
              </p>
            )}
          </div>

          <div className="flex flex-col relative">
            <label
              className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
              htmlFor="password"
            >
              {t("Pass")}
            </label>
            <input
              name="password"
              id="password"
              value={password}
              onChange={(e) => onInputChange(e, setPassword)}
              type="password"
              className={`mb-[1.5rem] text-[#000] appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Введите пароль"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p
                id="password-error"
                className="absolute bottom-0 text-red-600 text-sm"
              >
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`cursor-pointer w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
            isLoading
              ? "bg-blue-500 opacity-80 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-4 w-4 mr-2 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : null}
          {isLoading ? t("Loading") : t("Enter")}
        </button>
        <LangButton />
      </form>
    </div>
  );
}
export { LoginForm };
