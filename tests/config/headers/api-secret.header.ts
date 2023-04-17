import { encode } from "@inf/security/token/encode.impl";

export async function secretHeader(): Promise<ApiSecretKeySchema> {
  const { API_SECRET_KEY } = process.env;

  return { secret: await encode(API_SECRET_KEY) };
}

export type ApiSecretKeySchema = {
  secret: string;
};
