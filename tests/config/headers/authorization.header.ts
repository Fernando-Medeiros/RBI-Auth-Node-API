export type AuthorizationSchema = {
  Authorization: string;
};

export async function authHeader(token: string): Promise<AuthorizationSchema> {
  return {
    Authorization: `bearer ${token || ""}`,
  };
}
