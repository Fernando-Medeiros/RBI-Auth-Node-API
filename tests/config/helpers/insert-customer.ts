import type { AuthorizationSchema } from "../headers/authorization.header";
import type { PropsCreate } from "@dom/interfaces/customer.interface";

import { app, secretHeader } from "../config";

export class Helpers {
  static async insertCustomer(dataToCreate: PropsCreate): Promise<void> {
    await app.post("/customers").set(secretHeader).send(dataToCreate);
  }

  static async removeCustomer(authHeader: AuthorizationSchema): Promise<void> {
    await app.delete(`/customers`).set({ ...secretHeader, ...authHeader });
  }
}
