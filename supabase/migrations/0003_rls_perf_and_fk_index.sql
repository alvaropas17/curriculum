-- ============================================================================
-- 0003_rls_perf_and_fk_index.sql — Rendimiento F3
-- ============================================================================

-- Evita reevaluar auth.uid() en cada fila en las políticas RLS
-- (advisor `auth_rls_initplan`).
drop policy "items_owner" on public.items;
create policy "items_owner" on public.items
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy "item_relations_owner" on public.item_relations;
create policy "item_relations_owner" on public.item_relations
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy "item_links_owner" on public.item_links;
create policy "item_links_owner" on public.item_links
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- La FK item_links.item_id necesita un índice con item_id como primera columna
-- (advisor `unindexed_foreign_keys`).
drop index if exists public.item_links_user_item_idx;
create index item_links_item_idx on public.item_links (item_id, user_id);
