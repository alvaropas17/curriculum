/**
 * Modelo de contenido: lista de bloques tipados.
 * Módulo puro (sin imports) para poder usarlo en cliente, servidor y scripts.
 *
 *   content = { blocks: [{ type, text }, ...] }
 *
 * Un MCP/agente puede leer y escribir esto sin ambigüedad: cada bloque tiene
 * un tipo y un texto plano. En los bloques de lista, cada línea es un ítem.
 */

export type BlockType = "paragraph" | "heading" | "list" | "quote" | "code";

export type Block = {
  type: BlockType;
  text: string;
};

export type ItemContent = { blocks: Block[] };

export const BLOCK_TYPES: BlockType[] = [
  "paragraph",
  "heading",
  "list",
  "quote",
  "code",
];

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  paragraph: "Texto",
  heading: "Título",
  list: "Lista",
  quote: "Cita",
  code: "Código",
};

export function isBlockType(value: unknown): value is BlockType {
  return typeof value === "string" && (BLOCK_TYPES as string[]).includes(value);
}

/** Normaliza lo que haya en la BD a una lista de bloques válidos. */
export function parseBlocks(content: unknown): Block[] {
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return [];
  }

  const record = content as Record<string, unknown>;

  if (Array.isArray(record.blocks)) {
    return record.blocks.flatMap((raw): Block[] => {
      if (!raw || typeof raw !== "object") return [];
      const block = raw as Record<string, unknown>;
      return [
        {
          type: isBlockType(block.type) ? block.type : "paragraph",
          text: typeof block.text === "string" ? block.text : "",
        },
      ];
    });
  }

  // Compatibilidad: contenido antiguo en markdown.
  if (typeof record.markdown === "string") {
    return markdownToBlocks(record.markdown);
  }

  return [];
}

export function contentFromBlocks(blocks: Block[]): ItemContent {
  return { blocks };
}

function stripInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
}

/** Convierte markdown a bloques limpiando la sintaxis (migración). */
export function markdownToBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const isList = (line: string) =>
    /^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line);
  const isHeading = (line: string) => /^#{1,6}\s+/.test(line);
  const isQuote = (line: string) => /^\s*>\s?/.test(line);
  const isFence = (line: string) => line.trimStart().startsWith("```");

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (isFence(line)) {
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !isFence(lines[i])) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: "code", text: code.join("\n") });
      continue;
    }

    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({ type: "heading", text: stripInline(heading[1].trim()) });
      i += 1;
      continue;
    }

    if (isQuote(line)) {
      const quote: string[] = [];
      while (i < lines.length && isQuote(lines[i])) {
        quote.push(lines[i].replace(/^\s*>\s?/, ""));
        i += 1;
      }
      blocks.push({ type: "quote", text: stripInline(quote.join(" ")) });
      continue;
    }

    // Regla horizontal: se descarta.
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      i += 1;
      continue;
    }

    // Tabla: cada fila no separadora pasa a ser un ítem de lista.
    if (/^\s*\|/.test(line)) {
      const rows: string[] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        const cells = lines[i]
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell !== "");
        const isSeparator =
          cells.length > 0 && cells.every((cell) => /^:?-{2,}:?$/.test(cell));
        if (!isSeparator && cells.length > 0) {
          rows.push(stripInline(cells.join(" · ")));
        }
        i += 1;
      }
      if (rows.length > 0) {
        blocks.push({ type: "list", text: rows.join("\n") });
      }
      continue;
    }

    if (isList(line)) {
      const items: string[] = [];
      while (i < lines.length && isList(lines[i])) {
        items.push(stripInline(lines[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, "")));
        i += 1;
      }
      blocks.push({ type: "list", text: items.join("\n") });
      continue;
    }

    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !isFence(lines[i]) &&
      !isHeading(lines[i]) &&
      !isQuote(lines[i]) &&
      !isList(lines[i])
    ) {
      paragraph.push(lines[i]);
      i += 1;
    }
    blocks.push({
      type: "paragraph",
      text: stripInline(paragraph.join(" ")),
    });
  }

  return blocks;
}
