import type { AuthorizationSchema } from "../headers/authorization.header";
import { app, secretHeader } from "../config";

export async function getOneCustomer(
  header: AuthorizationSchema
): Promise<string> {
  const manyCustomers = await app
    .get("/customers")
    .set({ ...secretHeader, ...header });

  const { pubId } = await manyCustomers.body[0];

  return pubId;
}
