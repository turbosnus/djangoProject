import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { STORAGE_KEY } from "../components/lang-button/lang";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const initLanguage = localStorage.getItem(STORAGE_KEY) || "ru";
const resources = {
  en: {
    translation: {
      Welcome: "Welcome",
      Login: "Please log in to your account",
      Name: "Username",
      Pass: "Password",
      Enter: "Enter",
      Loading: "Logging in...",
      Pagename: "Document Editor",
      Enterdoc: "Enter document name",
      Upload: "Upload",
      Choosefile: "Choose File",
      Generatedoc: "Generate Document",
      Generatebutton: "Generate",
      Field: '{"field":"value"}',
    },
  },
  ru: {
    translation: {
      Welcome: "Добро пожаловать",
      Login: "Пожалуйста, войдите в свою учетную запись",
      Name: "Имя пользователя",
      Pass: "Пароль",
      Enter: "Войти",
      Loading: "Вход...",
      Pagename: "Редактор документов",
      Enterdoc: "Введите имя документа",
      Upload: "Загрузить",
      Choosefile: "Выбрать файл",
      Generatedoc: "Сгенерировать документ",
      Generatebutton: "Сгенерировать",
      Field: '{"поле":"значение"}',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: initLanguage, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
