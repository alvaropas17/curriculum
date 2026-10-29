import { notFound } from "next/navigation";
import { getItem } from "@/lib/data/items";
import ItemEditor from "@/components/ItemEditor";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    notFound();
  }

  return <ItemEditor item={item} />;
}
