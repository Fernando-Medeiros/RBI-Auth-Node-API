import type { Response } from 'express';

class BaseResponse {
    constructor(res: Response, statusCode: number, message?: unknown) {
        res.status(statusCode).json(message);
    }
}

export class StatusOK extends BaseResponse {
    constructor(res: Response, message?: object | object[] | null) {
        super(res, 200, message);
    }
}

export class StatusOkNoContent extends BaseResponse {
    constructor(res: Response) {
        super(res, 204);
    }
}

export class StatusCreated extends BaseResponse {
    constructor(res: Response, message?: string | object) {
        super(res, 201, message);
    }
}
