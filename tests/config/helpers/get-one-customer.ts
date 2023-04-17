import type { AuthorizationSchema } from "../headers/authorization.header";
import { app, secretHeader } from "../config";

export async function getOneCustomer(
  headerAuth: AuthorizationSchema
): Promise<string> {
  const manyCustomers = await app
    .get("/customers")
    .set({ ...secretHeader, ...headerAuth });

  const { pubId } = await manyCustomers.body[0];

  return pubId;
}
