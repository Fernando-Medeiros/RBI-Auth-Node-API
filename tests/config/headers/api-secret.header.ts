import { encode } from "infra/security/token/encode.impl";

export type ApiSecretKeySchema = {
  secret: string;
};

export const secretHeader = async (): Promise<ApiSecretKeySchema> => {
  const { API_SECRET_KEY } = process.env;

  return { secret: await encode(API_SECRET_KEY) };
};
