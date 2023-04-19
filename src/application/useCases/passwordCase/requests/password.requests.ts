import type { Request } from "express";
import type {
  IPwdRequests,
  PropsRecover,
  PropsUpdate,
  PropsReset,
} from "./requests.interface";
import {
  passwordIsValid_or_400,
  emailIsValid_or_400,
} from "app/validators/customer.validators";
import { tokenIsValid_or_401 } from "app/validators/auth.validators";

export class PwdRequests implements IPwdRequests {
  getRequestToRecover(req: Request): PropsRecover {
    const { email } = req.body;

    emailIsValid_or_400(email);

    return {
      email: email,
    };
  }

  getRequestToReset(req: Request): PropsReset {
    const { token } = req.params;
    const { password } = req.body;

    tokenIsValid_or_401(token, "Token format is invalid");
    passwordIsValid_or_400(password);

    return {
      token: token as string,
      password: password,
    };
  }

  getRequestToUpdate(req: Request): PropsUpdate {
    const { password } = req.body;

    passwordIsValid_or_400(password);

    return { password: password };
  }
}
