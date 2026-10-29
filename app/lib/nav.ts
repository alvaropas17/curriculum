export type NavNode = {
  label: string;
  href?: string;
  children?: NavNode[];
};

/**
 * Árbol del menú. Añadir un área = una línea.
 * Los nodos sin `href` son grupos.
 */
export const nav: NavNode[] = [
  { label: "Panel", href: "/" },
  {
    label: "Académico",
    children: [
      { label: "Estudios", href: "/estudios" },
      { label: "Asignaturas", href: "/asignaturas" },
    ],
  },
  {
    label: "Trabajo",
    children: [
      { label: "Proyectos", href: "/proyectos" },
      { label: "Investigación", href: "/investigacion" },
      { label: "Ideas", href: "/ideas" },
      { label: "Negocios", href: "/negocios" },
    ],
  },
  {
    label: "Biblioteca",
    children: [
      { label: "Herramientas", href: "/herramientas" },
      { label: "Recursos", href: "/recursos" },
      { label: "Favoritos", href: "/favoritos" },
    ],
  },
  { label: "Buscar", href: "/buscar" },
];

/** Devuelve el camino (grupos + nodo) hasta el href dado. */
export function findTrail(nodes: NavNode[], href: string): NavNode[] {
  for (const node of nodes) {
    if (node.href === href) return [node];
    if (node.children) {
      const childTrail = findTrail(node.children, href);
      if (childTrail.length > 0) return [node, ...childTrail];
    }
  }
  return [];
}
