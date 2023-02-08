import { api } from "./server.js";

api.get("/auth", (req, res) => {
  return res.json({ test: "test" });
});
