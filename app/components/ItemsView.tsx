import Link from "next/link";
import { ITEM_TYPE_LABELS, type Item } from "@/lib/items";

export type ViewMode = "table" | "list" | "cards" | "board";

function itemHref(item: Item) {
  return `/item/${item.id}`;
}

function TypeBadge({ item }: { item: Item }) {
  return (
    <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
      {ITEM_TYPE_LABELS[item.type]}
    </span>
  );
}

function Empty() {
  return <p className="text-sm text-zinc-500">No hay elementos todavía.</p>;
}

function ListView({ items }: { items: Item[] }) {
  return (
    <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={itemHref(item)}
            className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <span className="min-w-0">
              <span className="block truncate font-medium">{item.title}</span>
              {item.description ? (
                <span className="block truncate text-sm text-zinc-500">
                  {item.description}
                </span>
              ) : null}
            </span>
            <TypeBadge item={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function TableView({ items }: { items: Item[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-xs text-zinc-500 uppercase dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-2 font-medium">Título</th>
            <th className="px-4 py-2 font-medium">Tipo</th>
            <th className="px-4 py-2 font-medium">Estado</th>
            <th className="px-4 py-2 font-medium">Tags</th>
            <th className="px-4 py-2 font-medium">Actualizado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <td className="px-4 py-2">
                <Link href={itemHref(item)} className="font-medium hover:underline">
                  {item.title}
                </Link>
              </td>
              <td className="px-4 py-2 text-zinc-500">
                {ITEM_TYPE_LABELS[item.type]}
              </td>
              <td className="px-4 py-2 text-zinc-500">{item.status ?? "—"}</td>
              <td className="px-4 py-2 text-zinc-500">
                {item.tags.length > 0 ? item.tags.join(", ") : "—"}
              </td>
              <td className="px-4 py-2 text-zinc-500">
                {new Date(item.updated_at).toLocaleDateString("es-ES")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CardsView({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={itemHref(item)}
          className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="font-medium">{item.title}</span>
            <TypeBadge item={item} />
          </div>
          {item.description ? (
            <span className="line-clamp-3 text-sm text-zinc-500">
              {item.description}
            </span>
          ) : null}
          {item.tags.length > 0 ? (
            <span className="mt-auto text-xs text-zinc-400">
              {item.tags.join(" · ")}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

function BoardView({ items }: { items: Item[] }) {
  const columns = new Map<string, Item[]>();

  for (const item of items) {
    const status = item.status ?? "Sin estado";
    const column = columns.get(status) ?? [];
    column.push(item);
    columns.set(status, column);
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {[...columns.entries()].map(([status, columnItems]) => (
        <div
          key={status}
          className="w-64 shrink-0 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
        >
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">{status}</span>
            <span className="text-zinc-400">{columnItems.length}</span>
          </div>
          <div className="space-y-2">
            {columnItems.map((item) => (
              <Link
                key={item.id}
                href={itemHref(item)}
                className="block rounded border border-zinc-200 p-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ItemsView({
  items,
  view = "list",
}: {
  items: Item[];
  view?: ViewMode;
}) {
  if (items.length === 0) return <Empty />;

  switch (view) {
    case "table":
      return <TableView items={items} />;
    case "cards":
      return <CardsView items={items} />;
    case "board":
      return <BoardView items={items} />;
    default:
      return <ListView items={items} />;
  }
}
