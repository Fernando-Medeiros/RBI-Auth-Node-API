import { Router } from "express";

export const route = Router();

route.get("/auth", (_req, res) => {
  return res.json({ test: "test" });
});
