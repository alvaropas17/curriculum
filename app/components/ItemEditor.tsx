"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BLOCK_TYPES,
  BLOCK_TYPE_LABELS,
  contentFromBlocks,
  parseBlocks,
  type Block,
  type BlockType,
} from "@/lib/blocks";
import { ITEM_TYPES, ITEM_TYPE_LABELS, type Item, type ItemPatch } from "@/lib/items";
import { saveItem } from "@/lib/actions/items";

const AUTOSAVE_MS = 2000;

const fieldClass =
  "w-full rounded border border-transparent bg-transparent px-2 py-1 text-sm outline-none hover:border-zinc-200 focus:border-zinc-400 dark:hover:border-zinc-800 dark:focus:border-zinc-600";

const blockClass: Record<BlockType, string> = {
  paragraph: "text-sm",
  heading: "text-xl font-semibold",
  list: "text-sm",
  quote: "text-sm italic",
  code: "font-mono text-sm",
};

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function ItemEditor({ item }: { item: Item }) {
  const [title, setTitle] = useState(item.title);
  const [type, setType] = useState(item.type);
  const [status, setStatus] = useState(item.status ?? "");
  const [priority, setPriority] = useState(item.priority ?? "");
  const [category, setCategory] = useState(item.category ?? "");
  const [url, setUrl] = useState(item.url ?? "");
  const [tags, setTags] = useState(item.tags.join(", "));
  const [description, setDescription] = useState(item.description ?? "");
  const [blocks, setBlocks] = useState<Block[]>(() => parseBlocks(item.content));

  const pending = useRef<ItemPatch>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const flush = useCallback(async () => {
    const patch = pending.current;
    pending.current = {};
    if (Object.keys(patch).length === 0) return;

    setSaveStatus("saving");
    try {
      await saveItem(item.id, patch);
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }, [item.id]);

  const queue = useCallback(
    (patch: ItemPatch) => {
      pending.current = { ...pending.current, ...patch };
      setSaveStatus("idle");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void flush(), AUTOSAVE_MS);
    },
    [flush],
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (Object.keys(pending.current).length > 0) void flush();
    };
  }, [flush]);

  function updateBlocks(next: Block[]) {
    setBlocks(next);
    queue({ content: contentFromBlocks(next) });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end h-5 text-xs">
        {saveStatus === "saving" ? (
          <span className="text-zinc-400">Guardando…</span>
        ) : null}
        {saveStatus === "saved" ? (
          <span className="text-green-600 dark:text-green-400">Guardado</span>
        ) : null}
        {saveStatus === "error" ? (
          <span className="text-red-600 dark:text-red-400">
            No se pudo guardar
          </span>
        ) : null}
      </div>

      <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          queue({ title: event.target.value });
        }}
        placeholder="Sin título"
        className="w-full bg-transparent text-3xl font-semibold outline-none"
      />

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-zinc-400">Tipo</span>
          <select
            value={type}
            onChange={(event) => {
              const value = event.target.value as Item["type"];
              setType(value);
              queue({ type: value });
            }}
            className={fieldClass}
          >
            {ITEM_TYPES.map((option) => (
              <option key={option} value={option}>
                {ITEM_TYPE_LABELS[option]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-zinc-400">Estado</span>
          <input
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              queue({ status: event.target.value.trim() || null });
            }}
            className={fieldClass}
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-zinc-400">Prioridad</span>
          <input
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value);
              queue({ priority: event.target.value.trim() || null });
            }}
            className={fieldClass}
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-zinc-400">Categoría</span>
          <input
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              queue({ category: event.target.value.trim() || null });
            }}
            className={fieldClass}
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-zinc-400">Tags</span>
          <input
            value={tags}
            onChange={(event) => {
              setTags(event.target.value);
              queue({ tags: parseTags(event.target.value) });
            }}
            placeholder="separadas por comas"
            className={fieldClass}
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-zinc-400">URL</span>
          <input
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              queue({ url: event.target.value.trim() || null });
            }}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <textarea
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            queue({ description: event.target.value.trim() || null });
          }}
          placeholder="Descripción"
          rows={2}
          className="w-full resize-none rounded border border-transparent bg-transparent px-2 py-1 text-sm outline-none hover:border-zinc-200 focus:border-zinc-400 dark:hover:border-zinc-800 dark:focus:border-zinc-600"
        />
      </label>

      <div className="space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        {blocks.map((block, index) => (
          <div key={index} className="group flex items-start gap-2">
            <select
              value={block.type}
              onChange={(event) => {
                const next = blocks.map((current, i) =>
                  i === index
                    ? { ...current, type: event.target.value as BlockType }
                    : current,
                );
                updateBlocks(next);
              }}
              className="mt-1 shrink-0 rounded border border-transparent bg-transparent text-xs text-zinc-400 outline-none hover:border-zinc-200 focus:border-zinc-400 dark:hover:border-zinc-800 dark:focus:border-zinc-600"
            >
              {BLOCK_TYPES.map((option) => (
                <option key={option} value={option}>
                  {BLOCK_TYPE_LABELS[option]}
                </option>
              ))}
            </select>

            <textarea
              value={block.text}
              onChange={(event) => {
                const next = blocks.map((current, i) =>
                  i === index ? { ...current, text: event.target.value } : current,
                );
                updateBlocks(next);
              }}
              rows={1}
              placeholder={BLOCK_TYPE_LABELS[block.type]}
              className={`min-h-8 flex-1 resize-none bg-transparent px-1 py-1 outline-none [field-sizing:content] ${blockClass[block.type]}`}
            />

            <button
              type="button"
              onClick={() => updateBlocks(blocks.filter((_, i) => i !== index))}
              title="Eliminar bloque"
              className="mt-1 shrink-0 rounded px-2 text-zinc-300 opacity-0 group-hover:opacity-100 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            updateBlocks([...blocks, { type: "paragraph", text: "" }])
          }
          className="mt-2 rounded border border-dashed border-zinc-300 px-3 py-1 text-sm text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          + Añadir bloque
        </button>
      </div>
    </div>
  );
}
