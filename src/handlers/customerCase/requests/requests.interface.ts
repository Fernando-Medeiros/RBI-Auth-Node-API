import type { Request } from "express";
import type {
  PropsCreate,
  PropsUpdate,
} from "../../../entities/interfaces/customer.interface";

export interface ICustomerRequests {
  getRequestToCreate(req: Request): PropsCreate;
  getRequestToUpdate(req: Request): PropsUpdate;
}
