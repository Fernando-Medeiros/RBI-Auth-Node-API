import type { Request } from "express";
import type {
  IPwdRequests,
  PropsRecover,
  PropsUpdate,
  PropsReset,
} from "./requests.interface";
import {
  passwordIsValid,
  emailIsValid,
} from "@app/validators/customer.validators";
import { tokenIsValid } from "@app/validators/auth.validators";

export class PwdRequests implements IPwdRequests {
  getRequestToRecover(req: Request): PropsRecover {
    const { email } = req.body;

    emailIsValid(email);

    return {
      email: email,
    };
  }

  getRequestToReset(req: Request): PropsReset {
    const { token } = req.params;
    const { password } = req.body;

    tokenIsValid(token, "Token format is invalid");
    passwordIsValid(password);

    return {
      token: token as string,
      password: password,
    };
  }

  getRequestToUpdate(req: Request): PropsUpdate {
    const { password } = req.body;

    passwordIsValid(password);

    return { password: password };
  }
}
