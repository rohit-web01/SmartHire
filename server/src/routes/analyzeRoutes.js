import express from "express";
import multer from "multer";
import path from "path";
import { analyzeResume } from "../controllers/analyzeController.js";
import fs from "fs";


const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Unsupported file type"), false);
  },
});

router.post(
  "/upload",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jdFile", maxCount: 1 },
  ]),
  analyzeResume
);

export default router;
