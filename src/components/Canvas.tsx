"use client";

import { Block } from "@/lib/types";
import { useCallback } from "react";

type CanvasProps = {
  blocks: Block[];
  onUpdateBlock: (id: string, block: Block) => void;
  onRemoveBlock: (id: string) => void;
};

export default function Canvas({ blocks, onUpdateBlock, onRemoveBlock }: CanvasProps) {
  const handleTextEdit = useCallback(
    (id: string, field: string) => (e: React.FormEvent<HTMLDivElement>) => {
      const value = (e.target as HTMLDivElement).innerText;
      const block = blocks.find((b) => b.id === id);
      if (!block) return;
      const updated = { ...block, [field]: value } as Block;
      onUpdateBlock(id, updated);
    },
    [blocks, onUpdateBlock]
  );

  return (
    <main className="flex-1 p-6 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        {blocks.length === 0 && (
          <div className="text-center text-gray-500 border border-dashed rounded p-12 bg-white">
            Add blocks from the left to start building your page.
          </div>
        )}

        {blocks.map((block) => {
          if (block.type === "hero") {
            return (
              <section key={block.id} className="bg-white rounded border p-6">
                <div
                  className="text-3xl font-bold mb-2 outline-none"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleTextEdit(block.id, "title")}
                >
                  {block.title}
                </div>
                <div
                  className="text-gray-600 outline-none"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleTextEdit(block.id, "subtitle")}
                >
                  {block.subtitle ?? "Add a subtitle"}
                </div>
                <div className="pt-4 text-right">
                  <button className="text-red-600 text-sm" onClick={() => onRemoveBlock(block.id)}>Remove</button>
                </div>
              </section>
            );
          }

          if (block.type === "text") {
            return (
              <section key={block.id} className="bg-white rounded border p-6">
                <p
                  className="text-gray-800 outline-none"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleTextEdit(block.id, "text")}
                >
                  {block.text}
                </p>
                <div className="pt-4 text-right">
                  <button className="text-red-600 text-sm" onClick={() => onRemoveBlock(block.id)}>Remove</button>
                </div>
              </section>
            );
          }

          if (block.type === "image") {
            return (
              <section key={block.id} className="bg-white rounded border p-6 space-y-2">
                <div className="text-sm text-gray-600">Image URL</div>
                <div
                  className="outline-none border rounded p-2 text-sm bg-gray-50"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleTextEdit(block.id, "src")}
                >
                  {block.src}
                </div>
                <div className="text-sm text-gray-600">Alt text</div>
                <div
                  className="outline-none border rounded p-2 text-sm bg-gray-50"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleTextEdit(block.id, "alt")}
                >
                  {block.alt ?? ""}
                </div>
                <div className="pt-2 text-right">
                  <button className="text-red-600 text-sm" onClick={() => onRemoveBlock(block.id)}>Remove</button>
                </div>
              </section>
            );
          }

          if (block.type === "button") {
            return (
              <section key={block.id} className="bg-white rounded border p-6 space-y-2">
                <div className="text-sm text-gray-600">Label</div>
                <div
                  className="outline-none border rounded p-2 text-sm bg-gray-50"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleTextEdit(block.id, "label")}
                >
                  {block.label}
                </div>
                <div className="text-sm text-gray-600">Link</div>
                <div
                  className="outline-none border rounded p-2 text-sm bg-gray-50"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleTextEdit(block.id, "href")}
                >
                  {block.href}
                </div>
                <div className="pt-2 text-right">
                  <button className="text-red-600 text-sm" onClick={() => onRemoveBlock(block.id)}>Remove</button>
                </div>
              </section>
            );
          }

          if (block.type === "form") {
            return (
              <section key={block.id} className="bg-white rounded border p-6">
                <div
                  className="text-xl font-semibold mb-3 outline-none"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleTextEdit(block.id, "title")}
                >
                  {block.title ?? "Register"}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input disabled placeholder="Name" className="border rounded px-2 py-1 text-sm" />
                  <input disabled placeholder="Email" className="border rounded px-2 py-1 text-sm" />
                </div>
                <div className="pt-3">
                  <button disabled className="bg-gray-200 text-gray-600 rounded px-3 py-2 text-sm">Submit</button>
                </div>
                <div className="pt-2 text-right">
                  <button className="text-red-600 text-sm" onClick={() => onRemoveBlock(block.id)}>Remove</button>
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>
    </main>
  );
}


