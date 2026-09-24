import express from "express";

import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js";

const app = express();

app.use(express.json());


app.get("/", (_req, res) => {
  res.json({
    message: "URL Shortener API",
    status: "running"
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});

app.use("/api/auth",authRoutes);
app.use(urlRoutes);

app.listen(env.port, () => {
  console.log(
    `Server running at http://localhost:${env.port}`
  );
});