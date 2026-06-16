import registry from "../../../registry.json";

export interface Tool {
  slug: string; title: string; description?: string;
  industry: string; task: string; rail: string;
  category?: string; status: string; url?: string;
}

export const tools: Tool[] = (registry as { tools: Tool[] }).tools;
export const liveTools = (): Tool[] => tools.filter((t) => t.status === "live");
export const getTool = (slug: string): Tool | undefined => tools.find((t) => t.slug === slug);

export function byCategory(list: Tool[] = tools): Record<string, Tool[]> {
  return list.reduce((acc, t) => {
    const c = t.category || "その他";
    (acc[c] ||= []).push(t);
    return acc;
  }, {} as Record<string, Tool[]>);
}
