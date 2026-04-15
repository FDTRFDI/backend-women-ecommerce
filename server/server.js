// ❌ لا نستخدم dotenv في Render
// import dotenv from "dotenv";
// dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

// PostgreSQL connection
import "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================
   MIDDLEWARE
===================== */

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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

app.get("/", (req, res) => res.send("API Running 🚀"));

/* =====================
   START SERVER
===================== */

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});