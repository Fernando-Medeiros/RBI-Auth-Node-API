import type { Request } from "express";

export interface IAuthRequests {
  getAccessRequest(req: Request): accessRequest;
  getRefreshRequest(req: Request): string;
}

export type accessRequest = {
  email: string;
  password: string;
};
