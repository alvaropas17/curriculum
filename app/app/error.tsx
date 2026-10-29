"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-2xl font-semibold">Algo ha fallado</h1>
      <p className="text-sm text-zinc-500">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded border border-zinc-300 px-3 py-1 text-sm dark:border-zinc-700"
      >
        Reintentar
      </button>
    </div>
  );
}
