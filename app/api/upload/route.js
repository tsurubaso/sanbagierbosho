import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

// Simple upload handler: read FormData -> write to public/uploads

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("image");
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    // Convert uploaded File to Buffer and write to public/uploads
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = Date.now() + "-" + file.name;
    fs.writeFileSync(path.join(process.cwd(), "public", "uploads", fileName), buffer);

    return NextResponse.json({
      url: `/uploads/${fileName}`,
    });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
