"use server";

import { updateItem } from "@/lib/data/items";
import type { ItemPatch } from "@/lib/items";

/**
 * Autoguardado. Recibe el id y solo los campos cambiados.
 * La propiedad real de la fila la garantiza RLS en Postgres.
 */
export async function saveItem(id: string, patch: ItemPatch): Promise<void> {
  if (!id) throw new Error("Falta el identificador");

  if (patch.title !== undefined && patch.title.trim() === "") {
    throw new Error("El título no puede estar vacío");
  }

  if (Object.keys(patch).length === 0) return;

  await updateItem(id, patch);
}
