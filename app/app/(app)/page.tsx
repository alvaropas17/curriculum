import ItemsView from "@/components/ItemsView";
import { ITEM_TYPES, ITEM_TYPE_LABELS } from "@/lib/items";
import { countItemsByType, listRecentItems } from "@/lib/data/items";

export default async function DashboardPage() {
  const [counts, recent] = await Promise.all([
    countItemsByType(),
    listRecentItems(8),
  ]);

  const total = ITEM_TYPES.reduce((sum, type) => sum + counts[type], 0);
  const usedTypes = ITEM_TYPES.filter((type) => counts[type] > 0);

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Panel</h1>
        <p className="text-sm text-zinc-500">
          {total} {total === 1 ? "elemento" : "elementos"} en total
        </p>
      </div>

      {usedTypes.length > 0 ? (
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {usedTypes.map((type) => (
            <div
              key={type}
              className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="text-2xl font-semibold">{counts[type]}</div>
              <div className="text-sm text-zinc-500">
                {ITEM_TYPE_LABELS[type]}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-zinc-500">Recientes</h2>
        <ItemsView items={recent} view="list" />
      </section>
    </div>
  );
}
