import type { Request } from 'express';

export interface IPwdRequests {
    getRequestToRecover(req: Request): PropsRecover;
    getRequestToReset(req: Request): PropsReset;
    getRequestToUpdate(req: Request): PropsUpdate;
}

export type PropsRecover = {
    email: string;
};

export type PropsReset = {
    token: string;
    password: string;
};

export type PropsUpdate = {
    password: string;
};
