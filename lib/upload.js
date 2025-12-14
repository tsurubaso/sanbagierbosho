export async function uploadFile(file) {
  if (process.env.NODE_ENV === "development") {
    return uploadLocal(file);
  }

  return uploadCloud(file); // futur
}

async function uploadLocal(file) {
  const path = await import("path");
  const fs = await import("fs");

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    fileName
  );

  fs.writeFileSync(filePath, buffer);

  return `/uploads/${fileName}`;
}

async function uploadCloud(file) {
  throw new Error("Cloud upload not implemented yet");
}
