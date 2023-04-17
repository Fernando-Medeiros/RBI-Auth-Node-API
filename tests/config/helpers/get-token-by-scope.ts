import { app, secretHeader } from "../config";

type Scope = "access" | "refresh";
type Login = { email: string; password: string };

export async function getTokenByScope(
  scope: Scope,
  dataToLogin: Login
): Promise<string> {
  const {
    body: { access, refresh },
  } = await app.post("/token").set(secretHeader).send(dataToLogin);

  return scope === "access" ? access : refresh;
}
