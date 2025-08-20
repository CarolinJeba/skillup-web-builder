import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { SiteSchema } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SiteSchema;
    if (!body?.slug || !Array.isArray(body?.blocks)) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
    }

    const slugSafe = body.slug.replace(/[^a-z0-9-_]/gi, "").toLowerCase();
    if (!slugSafe) {
      return new Response(JSON.stringify({ error: "Invalid slug" }), { status: 400 });
    }

    const sitesDir = path.join(process.cwd(), "public", "sites");
    const targetPath = path.join(sitesDir, `${slugSafe}.json`);

    await fs.mkdir(sitesDir, { recursive: true });
    const toSave: SiteSchema = { ...body, slug: slugSafe };
    await fs.writeFile(targetPath, JSON.stringify(toSave, null, 2), "utf-8");

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save" }), { status: 500 });
  }
}


