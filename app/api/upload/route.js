import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

// Simple upload handler: read FormData -> write to public/uploads
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      console.error("No file received");
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    // Assure-toi que le dossier public/uploads existe
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = Date.now() + "-" + file.name;

    fs.writeFileSync(path.join(uploadDir, fileName), buffer);

    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
