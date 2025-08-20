"use client";

import { useCallback, useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Canvas from "@/components/Canvas";
import { Block, SiteSchema } from "@/lib/types";

function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function BuilderPage() {
  const [slug, setSlug] = useState("test");
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleAddBlock = useCallback((type: Block["type"]) => {
    const newBlock: Block =
      type === "hero"
        ? { id: generateId("hero"), type: "hero", title: "Your big title", subtitle: "A short subtitle" }
        : type === "text"
        ? { id: generateId("text"), type: "text", text: "Write something compelling here." }
        : type === "image"
        ? { id: generateId("image"), type: "image", src: "https://placehold.co/600x300", alt: "Placeholder" }
        : type === "button"
        ? { id: generateId("button"), type: "button", label: "Get Started", href: "#" }
        : { id: generateId("form"), type: "form", title: "Register" };
    setBlocks((prev) => [...prev, newBlock]);
  }, []);

  const handleUpdateBlock = useCallback((id: string, updated: Block) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? updated : b)));
  }, []);

  const handleRemoveBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const schema: SiteSchema = useMemo(() => ({ slug, blocks }), [slug, blocks]);

  async function publish() {
    // Save JSON under public/sites/[slug].json via an API route
    const res = await fetch("/api/save-site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(schema),
    });
    if (!res.ok) throw new Error("Failed to publish");
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar slug={slug} onChangeSlug={setSlug} onAddBlock={handleAddBlock} onPublish={publish} />
      <Canvas blocks={blocks} onUpdateBlock={handleUpdateBlock} onRemoveBlock={handleRemoveBlock} />
      <aside className="w-72 shrink-0 border-l border-gray-200 p-4 bg-white">
        <div className="text-sm font-semibold mb-2">Schema (read-only)</div>
        <pre className="text-xs whitespace-pre-wrap break-all bg-gray-50 border rounded p-2 h-[calc(100vh-64px)] overflow-auto">{JSON.stringify(schema, null, 2)}</pre>
      </aside>
    </div>
  );
}


