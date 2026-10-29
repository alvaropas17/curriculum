-- ============================================================================
-- 0002_hardening.sql — Endurecimiento F3
-- ============================================================================

-- Fija search_path en la función del trigger updated_at
-- (advisor `function_search_path_mutable`).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
