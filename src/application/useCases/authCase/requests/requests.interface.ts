import type { Request } from 'express';

export interface IAuthRequests {
    getRequestToAccess(req: Request): accessRequest;
    getRequestToRefresh(req: Request): string;
}

export type accessRequest = {
    email: string;
    password: string;
};
