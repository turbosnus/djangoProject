import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/store";
import { getTemplatesList } from "../../utils/document-editor";
import { Templates } from "../templates/templates";

function TemplatesList() {
  const token = useAuthStore((state) => state.authToken);
  const { data, error, isLoading } = useQuery({
    queryKey: ["templatesList"],
    queryFn: async () => getTemplatesList(token),
  });

  // Sidebar list: vertical stack; sidebar container handles scrolling
  return (
    <div className="flex flex-col gap-3">
      {isLoading && <p className="text-sm text-slate-400">Loading templates...</p>}
      {error && <p className="text-sm text-red-400">Failed to load templates</p>}

      {data && data.length === 0 && (
        <p className="text-sm text-slate-400">No templates available</p>
      )}

      {data?.map(({ name, uuid, created_at }) => (
        <Templates key={uuid} name={name} uuid={uuid} created_at={created_at} />
      ))}
    </div>
  );
}

export { TemplatesList };
