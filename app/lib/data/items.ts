import { createClient } from "@/lib/supabase/server";
import {
  ITEM_TYPES,
  type Item,
  type ItemInsert,
  type ItemPatch,
  type ItemType,
} from "@/lib/items";

export type { Item, ItemInsert, ItemPatch, ItemType } from "@/lib/items";

export async function listRecentItems(limit = 8): Promise<Item[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function listItemsByType(type: ItemType): Promise<Item[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("type", type)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getItem(id: string): Promise<Item | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function countItemsByType(): Promise<Record<ItemType, number>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("items").select("type");

  if (error) throw error;

  const counts = Object.fromEntries(
    ITEM_TYPES.map((type) => [type, 0]),
  ) as Record<ItemType, number>;

  for (const row of data ?? []) {
    counts[row.type] += 1;
  }

  return counts;
}

export async function createItem(input: ItemInsert): Promise<Item> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateItem(id: string, patch: ItemPatch): Promise<Item> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
