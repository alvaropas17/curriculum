-- ============================================================================
-- 0001_init.sql — Esquema base de la app privada (F3)
-- Datos separados de las vistas. Un único usuario, RLS estricto.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Extensiones
-- ---------------------------------------------------------------------------
-- gen_random_uuid() es nativo (PG13+) y pgcrypto ya viene instalado.
create extension if not exists unaccent with schema extensions;

-- unaccent(text) es STABLE, así que no sirve en un índice ni en una columna
-- generada. Este envoltorio fija el diccionario y la declara IMMUTABLE.
create or replace function public.f_unaccent(txt text)
returns text
language sql
immutable
parallel safe
strict
set search_path = ''
as $$
  select extensions.unaccent('extensions.unaccent'::regdictionary, txt);
$$;

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------
create type public.item_type as enum (
  'page',
  'project',
  'idea',
  'research',
  'resource',
  'business_idea',
  'study_program',
  'course',
  'question'
);

-- ---------------------------------------------------------------------------
-- items
-- ---------------------------------------------------------------------------
create table public.items (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null default auth.uid() references auth.users (id) on delete cascade,
  type            public.item_type not null,
  title           text not null,
  description     text,
  category        text,
  status          text,
  priority        text,
  tags            text[] not null default '{}',
  content         jsonb not null default '{}'::jsonb,
  url             text,
  external_source text,
  external_id     text,
  imported_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  -- Búsqueda full-text (title + description) insensible a acentos.
  -- Reservado para embeddings futuros: columna vector(1536) + índice HNSW.
  search          tsvector generated always as (
                    to_tsvector(
                      'spanish'::regconfig,
                      public.f_unaccent(title || ' ' || coalesce(description, ''))
                    )
                  ) stored,
  -- external_source y external_id van juntos o no van.
  constraint items_external_pair_chk check (
    (external_source is null) = (external_id is null)
  )
);

create index items_user_type_idx    on public.items (user_id, type);
create index items_user_updated_idx on public.items (user_id, updated_at desc);
create index items_tags_idx         on public.items using gin (tags);
create index items_search_idx       on public.items using gin (search);

-- Dedupe para importaciones externas (p. ej. Notion) por (fuente, id).
create unique index items_external_uidx
  on public.items (user_id, external_source, external_id)
  where external_source is not null;

-- ---------------------------------------------------------------------------
-- item_relations
-- ---------------------------------------------------------------------------
create table public.item_relations (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  from_item_id  uuid not null references public.items (id) on delete cascade,
  to_item_id    uuid not null references public.items (id) on delete cascade,
  relation_type text not null,
  created_at    timestamptz not null default now(),
  constraint item_relations_no_self_chk check (from_item_id <> to_item_id),
  constraint item_relations_unique unique (from_item_id, to_item_id, relation_type)
);

create index item_relations_user_idx on public.item_relations (user_id);
create index item_relations_from_idx on public.item_relations (from_item_id);
create index item_relations_to_idx   on public.item_relations (to_item_id);

-- ---------------------------------------------------------------------------
-- item_links
-- ---------------------------------------------------------------------------
create table public.item_links (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  item_id    uuid not null references public.items (id) on delete cascade,
  label      text not null,
  url        text not null,
  kind       text not null default 'link' check (kind in ('source', 'link', 'doc')),
  created_at timestamptz not null default now()
);

create index item_links_user_item_idx on public.item_links (user_id, item_id);

-- ---------------------------------------------------------------------------
-- updated_at
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger items_set_updated_at
  before update on public.items
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: cada fila pertenece a auth.uid(). Sin política para anon => 0 filas.
-- ---------------------------------------------------------------------------
alter table public.items          enable row level security;
alter table public.item_relations enable row level security;
alter table public.item_links     enable row level security;

create policy "items_owner" on public.items
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "item_relations_owner" on public.item_relations
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "item_links_owner" on public.item_links
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
