import type { Database } from "@/lib/supabase/database.types";

/**
 * Tipos y constantes de `items` sin dependencias de servidor.
 * Los componentes cliente pueden importarlos sin arrastrar `next/headers`.
 */

export type ItemType = Database["public"]["Enums"]["item_type"];
export type Item = Database["public"]["Tables"]["items"]["Row"];
export type ItemInsert = Database["public"]["Tables"]["items"]["Insert"];
export type ItemPatch = Partial<
  Omit<Item, "id" | "user_id" | "created_at" | "updated_at" | "search">
>;

export const ITEM_TYPES: ItemType[] = [
  "page",
  "project",
  "idea",
  "research",
  "resource",
  "business_idea",
  "study_program",
  "course",
  "question",
];

export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  page: "Página",
  project: "Proyecto",
  idea: "Idea",
  research: "Investigación",
  resource: "Recurso",
  business_idea: "Idea de negocio",
  study_program: "Estudios",
  course: "Asignatura",
  question: "Pregunta",
};
