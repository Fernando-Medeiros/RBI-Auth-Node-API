import type { Request } from "express";

import {
  emailIsValid,
  passwordIsValid,
} from "../../validators/customer.validators";

import { tokenIsValid } from "../../validators/auth.validators";

export class AuthRequest {
  accessRequest(request: Request): accessRequest {
    const { email, password } = request.body;

    emailIsValid(email);
    passwordIsValid(password);

    return {
      email: email,
      password: password,
    };
  }

  refreshRequest(request: Request): string {
    const { token } = request.body;

    tokenIsValid(token, "Missing refresh token!");

    return token;
  }
}

type accessRequest = {
  email: string;
  password: string;
};
