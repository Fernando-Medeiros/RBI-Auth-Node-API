import type { Request } from "express";
import type { ICustomerRequests } from "./requests.interface";
import type {
  PropsUpdate,
  PropsCreate,
} from "../../../entities/interfaces/customer.interface";
import {
  nameIsValid,
  emailIsValid,
  passwordIsValid,
} from "../../validators/customer.validators";

import { isTrue_or_400 } from "../../validators/validators";

export class CustomerRequests implements ICustomerRequests {
  getRequestToCreate(req: Request): PropsCreate {
    const { firstName, lastName, email, password } = req.body;

    nameIsValid(firstName);
    nameIsValid(lastName);
    emailIsValid(email);
    passwordIsValid(password);

    return {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
  }

  getRequestToUpdate(request: Request): PropsUpdate {
    const { firstName, lastName, email } = request.body;

    firstName ? nameIsValid(firstName) : null;
    lastName ? nameIsValid(lastName) : null;
    email ? emailIsValid(email) : null;

    const toUpdate = {
      ...(firstName && { firstName: firstName }),
      ...(lastName && { lastName: lastName }),
      ...(email && { email: email }),
    };

    isTrue_or_400(
      Object.values(toUpdate).length ? true : null,
      "There is no content, enter valid data to update!"
    );

    return toUpdate;
  }
}
