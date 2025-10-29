import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*",
}));
app.use(express.json());

// Use routes
app.use("/api/analyze", analyzeRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ SmartHire API running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// export default app;