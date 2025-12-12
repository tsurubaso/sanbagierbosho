import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";
import { promisify } from "util";

// Configuration du stockage local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const uploadMiddleware = upload.single("image");

// Transformer middleware en Promise pour Next.js
const uploadPromise = promisify(uploadMiddleware);

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("image");
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = Date.now() + "-" + file.name;

    // Save file
    const fs = require("fs");
    fs.writeFileSync(`public/uploads/${fileName}`, buffer);

    return NextResponse.json({
      url: `/uploads/${fileName}`,
    });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
