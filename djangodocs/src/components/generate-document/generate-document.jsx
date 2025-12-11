import { useState } from "react";
import { generateDocumentFromTemplate } from "../../utils/document-editor";
import { useAuthStore } from "../../store/store";
import { useTranslation } from "react-i18next";

function GenerateDocument() {
  const [content, setContent] = useState("");
  const token = useAuthStore((state) => state.authToken);
  const { t } = useTranslation();
  function handleContentChange(e) {
    setContent(e.target.value);
  }
  function onGenerateClick() {
    generateDocumentFromTemplate(token, content).then((response) => {
      handleDownload(response);
    });
  }
  const handleDownload = async (response) => {
    try {
      const date = new Date();
      const blob = await response.blob();
      console.log("Received blob:", blob);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `generated_${date}.docx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-lg font-semibold text-white">{t("Generatedoc")}</h2>

      <div className="flex flex-col gap-3 w-full flex-1 min-h-0">
        <label htmlFor="json-input" className="sr-only">
          JSON request
        </label>

        <textarea
          id="json-input"
          placeholder={t("Field")}
          className="w-full h-full min-h-[27rem] resize-vertical rounded-md bg-white/5 border border-white/6 p-3 text-sm text-slate-200 placeholder:text-slate-400"
          onChange={handleContentChange}
          value={content}
        />

        <div className="flex justify-end">
          <button
            onClick={onGenerateClick}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            type="button"
          >
            {t("Generatebutton")}
          </button>
        </div>
      </div>
    </div>
  );
}
export { GenerateDocument };
