"use client";

import { useState } from "react";

export default function RegistrationForm({ title }: { title?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {title && <div className="text-xl font-semibold">{title}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border rounded px-3 py-2 text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white rounded px-4 py-2 text-sm hover:bg-gray-800 disabled:opacity-50"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>
      {status === "success" && <div className="text-green-600 text-sm">Thanks! We received your info.</div>}
      {status === "error" && <div className="text-red-600 text-sm">Something went wrong. Try again.</div>}
    </form>
  );
}


