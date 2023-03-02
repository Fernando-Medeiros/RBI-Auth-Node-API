import type { Request } from "express";
import type { IAuthRequests, accessRequest } from "./requests.interface";

import { tokenIsValid } from "../../validators/auth.validators";
import {
  emailIsValid,
  passwordIsValid,
} from "../../validators/customer.validators";

export class AuthRequest implements IAuthRequests {
  getRequestToAccess(request: Request): accessRequest {
    const { email, password } = request.body;

    emailIsValid(email);
    passwordIsValid(password);

    return {
      email: email,
      password: password,
    };
  }

  getRequestToRefresh(request: Request): string {
    const { token } = request.body;

    tokenIsValid(token, "Missing refresh token!");

    return token;
  }
}
