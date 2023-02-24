import type { Response } from "express";
import type { Document } from "mongoose";

class BaseResponse {
  constructor(
    res: Response,
    statusCode: number,
    message?: string | object | Document | null
  ) {
    res.status(statusCode).json(message);
  }
}

export class RespOK extends BaseResponse {
  constructor(res: Response, message?: string | object | Document | null) {
    super(res, 200, message);
  }
}

export class RespOkNoContent extends BaseResponse {
  constructor(res: Response, message?: string) {
    super(res, 204, message);
  }
}

export class RespCreate extends BaseResponse {
  constructor(res: Response, message?: string | object | Document) {
    super(res, 201, message);
  }
}
