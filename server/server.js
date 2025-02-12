import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import databaseConnection from "./utils/databaseConnection.js";

config({
  path: "./.env",
});

const app = express();
const port = process.env.PORT || port;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.listen(port, () => {
  console.log(`Server is listening on the port ${port}`);
  databaseConnection();
});
