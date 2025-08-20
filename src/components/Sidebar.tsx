"use client";

import { useState } from "react";

type SidebarProps = {
  slug: string;
  onChangeSlug: (slug: string) => void;
  onAddBlock: (type: "hero" | "text" | "image" | "button" | "form") => void;
  onPublish: () => Promise<void> | void;
};

export default function Sidebar({ slug, onChangeSlug, onAddBlock, onPublish }: SidebarProps) {
  const [isPublishing, setIsPublishing] = useState(false);

  async function handlePublish() {
    if (!slug) {
      alert("Please enter a slug before publishing.");
      return;
    }
    try {
      setIsPublishing(true);
      await onPublish();
      alert("Site published. Visit /sites/" + slug);
    } catch (err) {
      console.error(err);
      alert("Failed to publish site.");
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 p-4 space-y-4 bg-white">
      <div>
        <label className="block text-sm font-medium mb-1">Site slug</label>
        <input
          value={slug}
          onChange={(e) => onChangeSlug(e.target.value)}
          placeholder="e.g. test"
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
      </div>

      <div>
        <div className="text-sm font-semibold mb-2">Blocks</div>
        <div className="grid grid-cols-2 gap-2">
          <button className="border rounded px-2 py-1 text-sm hover:bg-gray-50" onClick={() => onAddBlock("hero")}>Hero</button>
          <button className="border rounded px-2 py-1 text-sm hover:bg-gray-50" onClick={() => onAddBlock("text")}>Text</button>
          <button className="border rounded px-2 py-1 text-sm hover:bg-gray-50" onClick={() => onAddBlock("image")}>Image</button>
          <button className="border rounded px-2 py-1 text-sm hover:bg-gray-50" onClick={() => onAddBlock("button")}>Button</button>
          <button className="border rounded px-2 py-1 text-sm hover:bg-gray-50 col-span-2" onClick={() => onAddBlock("form")}>Registration Form</button>
        </div>
      </div>

      <div>
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="w-full bg-black text-white rounded px-3 py-2 text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          {isPublishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </aside>
  );
}


