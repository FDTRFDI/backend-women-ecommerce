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
   CORS (الإعداد الصحيح)
===================== */

app.use(
  cors({
    origin: process.env.CLIENT_URL, // ← أهم سطر
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* =====================
   MIDDLEWARE
===================== */

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
   404 HANDLER
===================== */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* =====================
   ERROR HANDLER
===================== */

app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

/* =====================
   START SERVER
===================== */

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
