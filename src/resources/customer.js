import { api } from "./server.js";

api.get("/customers", (req, res) => {
  return res.json({ test: "test" });
});
