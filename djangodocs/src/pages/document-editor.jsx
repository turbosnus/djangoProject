import { useState } from "react";
import { useAuthStore } from "../store/store";
import { sendFile } from "../utils/document-editor";
import { TemplatesList } from "../components/templates-list/templates-list";
import { Templates } from "../components/templates/templates";
import { GenerateDocument } from "../components/generate-document/generate-document";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { LangButton } from "../components/lang-button/lang";
import { LogoutButton } from "../components/logout-button/logout-button";

function DocumentEditor() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const authToken = useAuthStore((state) => state.authToken);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  const mutation = useMutation({
    mutationFn: (formData) => sendFile(formData, authToken, fileName),
    onSuccess: (data) => {
      console.log("File uploaded successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["templatesList"] });
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
    },
  });

  function handleUpload() {
    const formData = new FormData();
    formData.append("file", file);
    mutation.mutate(formData);
  }

  function onFileNameInputChange(e) {
    setFileName(e.currentTarget.value);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 via-slate-900 to-[#02111a] text-slate-200 p-8">
      <header className="w-full max-w-6xl bg-white/5 rounded-xl shadow-lg p-6 flex flex-col gap-3">
        <h1 className="text-white text-2xl font-semibold">{t("Pagename")}</h1>

        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <input
            className="flex-1 min-w-[180px] px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-200"
            value={fileName}
            type="text"
            placeholder={t("Enterdoc")}
            onChange={onFileNameInputChange}
          />

          <div className="flex items-center gap-3">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".docx"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 rounded-lg text-blue-400 border border-blue-500/30 hover:bg-blue-500/6 cursor-pointer"
            >
              {t("Choosefile")}
            </label>
            <button
              onClick={handleUpload}
              type="button"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              {t("Upload")}
            </button>
          </div>
        </div>

        {file && (
          <p className="text-sm text-slate-300">Selected: {file.name}</p>
        )}
      </header>

      <main className="w-full max-w-6xl flex gap-6 items-start pt-4">
        <aside className="w-72 min-w-[220px] bg-white/5 rounded-lg p-4 shadow-lg self-start max-h-[60vh] overflow-auto">
          <TemplatesList />
        </aside>

        <section className="flex-1 flex flex-col gap-4 bg-white/2 rounded-lg p-4 max-h-[60vh]">
          <GenerateDocument />
          <LangButton />
          <LogoutButton />
        </section>
      </main>
    </div>
  );
}
export { DocumentEditor };
