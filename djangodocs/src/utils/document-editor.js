import { API_BASE_URL, fetchWrapper } from "./api";

function sendFile(formData, authToken, name) {
  return fetchWrapper(`${API_BASE_URL}/api/docx/upload?name=${name}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });
}

function getTemplatesList(authToken) {
  return fetchWrapper(`${API_BASE_URL}/api/docx/templates`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

function generateDocumentFromTemplate(authToken, fields) {
  console.log("Generating document with fields:", fields);
  return fetch(`${API_BASE_URL}/api/docx/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: fields,
  });
}

export { sendFile, getTemplatesList, generateDocumentFromTemplate };
