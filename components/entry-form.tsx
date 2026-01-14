"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

export default function EntryForm() {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccessId(null);

    const trimmedContent = content.trim();
    const trimmedLabel = label.trim();

    if (!trimmedContent) {
      setError("Please enter some information to save.");
      return;
    }

    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        label: trimmedLabel.length > 0 ? trimmedLabel : null,
        content: trimmedContent
      })
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;
      setError(payload?.message ?? "Something went wrong while saving.");
      return;
    }

    const payload = (await response.json()) as {
      entry: { id: string };
    };

    setLabel("");
    setContent("");
    setSuccessId(payload.entry.id);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <section className="rounded-xl bg-slate-900/60 p-6 shadow-lg shadow-slate-950/50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="label" className="text-sm font-medium text-slate-200">
            Optional title
          </label>
          <input
            id="label"
            name="label"
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="e.g. Wi-Fi Credentials"
            className="rounded-md border border-slate-700 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-sm font-medium text-slate-200">
            Information to store
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Paste any text you want to share via QR code..."
            className="min-h-[160px] rounded-md border border-slate-700 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            disabled={isPending}
          />
        </div>
        {error ? (
          <p className="text-sm font-medium text-rose-400">{error}</p>
        ) : null}
        {successId ? (
          <p className="text-sm text-emerald-400">
            Saved! Share the QR code below or view it directly at
            {" "}
            <Link href={`/info/${successId}`} className="underline">
              /info/{successId}
            </Link>
            .
          </p>
        ) : null}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save and generate QR"}
          </button>
        </div>
      </form>
    </section>
  );
}
