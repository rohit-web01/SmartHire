import fs from "fs";
import { PDFExtract } from "pdf.js-extract";
import mammoth from "mammoth";

export async function extractText(file) {
  // If file has buffer (memoryStorage) or path (diskStorage)
  const buffer = file.buffer;
  const filePath = file.path;
  const mimetype = file.mimetype || "";
  const originalName = file.originalname || "";
  const ext = (originalName.split(".").pop() || "").toLowerCase();

  // === PDF ===
  if (ext === "pdf" || mimetype === "application/pdf") {
    const pdfExtract = new PDFExtract();

    if (buffer) {
      return new Promise((resolve, reject) => {
        pdfExtract.extractBuffer(buffer, {}, (err, data) => {
          if (err) return reject(err);
          const text = data.pages
            .map((p) => p.content.map((i) => i.str).join(" "))
            .join("\n");
          resolve(text);
        });
      });
    } else if (filePath) {
      return new Promise((resolve, reject) => {
        pdfExtract.extract(filePath, {}, (err, data) => {
          if (err) return reject(err);
          const text = data.pages
            .map((p) => p.content.map((i) => i.str).join(" "))
            .join("\n");
          resolve(text);
        });
      });
    }
  }

  // === DOCX ===
  if (
    ext === "docx" ||
    mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    if (buffer) return (await mammoth.extractRawText({ buffer })).value;
    if (filePath) return (await mammoth.extractRawText({ path: filePath })).value;
  }

  // === TXT ===
  if (ext === "txt" || mimetype === "text/plain") {
    if (buffer) return buffer.toString("utf-8");
    if (filePath) return fs.readFileSync(filePath, "utf-8");
  }

  throw new Error(`Unsupported file type or missing data: ${ext || mimetype}`);
}
