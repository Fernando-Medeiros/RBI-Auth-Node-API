import type { Request } from "express";
import type { IAuthRequests, accessRequest } from "./requests.interface";

import { tokenIsValid_or_401 } from "app/validators/auth.validators";
import {
  emailIsValid_or_400,
  passwordIsValid_or_400,
} from "app/validators/customer.validators";

export class AuthRequest implements IAuthRequests {
  getRequestToAccess(request: Request): accessRequest {
    const { email, password } = request.body;

    emailIsValid_or_400(email);
    passwordIsValid_or_400(password);

    return {
      email: email,
      password: password,
    };
  }

  getRequestToRefresh(request: Request): string {
    const { token } = request.body;

    tokenIsValid_or_401(token, "Missing refresh token!");

    return token;
  }
}
