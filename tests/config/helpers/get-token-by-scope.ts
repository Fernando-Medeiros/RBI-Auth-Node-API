import type { ApiSecretKeySchema } from "../headers/api-secret.header";
import type { AuthorizationSchema } from "../headers/authorization.header";
import { app } from "../config";

type Scope = "access" | "refresh" | "recover";

type Login = { email: string; password: string };

export async function getAuthorizationHeader(
  scope: Scope,
  data: Login,
  headers: AuthorizationSchema
): Promise<Partial<AuthorizationSchema & ApiSecretKeySchema>> {
  const {
    body: { access, refresh },
  } = await app.post("/token").set(headers).send(data);

  const token = scope === "access" ? access : refresh;

  return {
    Authorization: `bearer ${token || ""}`,
  };
}
