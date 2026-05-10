import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // تحميل ملف env

import fs from "fs"; // لفحص وجود ملف .env
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules (لازم يكون قبل استخدام __filename)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug ENV (مهم جدًا للتأكد)
console.log("RUNNING FILE:", __filename);
console.log("ENV FILE EXISTS:", fs.existsSync("./.env"));
console.log("RAW DATABASE_URL:", process.env.DATABASE_URL);
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

// Routers
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import adminRoutes from "./routes/adminRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import paymentRoutes from "./routes/payment.js";
import legalRoutes from "./routes/legal.js";
import authRoutes from "./routes/authRoutes.js";
import categories from "./routes/categories.js";
import categoryProductsRoutes from "./routes/category-products.routes.js";

// DB connection (pg)
import "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* =====================
   MIDDLEWARE
===================== */

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =====================
   ROUTES
===================== */

app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/legal", legalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categories);
app.use("/api/category-products", categoryProductsRoutes);

/* =====================
   TEST ROUTE
===================== */

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

/* =====================
   START SERVER
===================== */

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
