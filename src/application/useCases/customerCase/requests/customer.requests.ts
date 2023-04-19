import type { Request } from "express";
import type { ICustomerRequests } from "./requests.interface";
import type {
  PropsUpdate,
  PropsCreate,
} from "domain/interfaces/customer.interface";
import {
  nameIsValid_or_400,
  emailIsValid_or_400,
  passwordIsValid_or_400,
} from "app/validators/customer.validators";

import { isTrue_or_400 } from "app/validators/validators";

export class CustomerRequests implements ICustomerRequests {
  getRequestToCreate(req: Request): PropsCreate {
    const { firstName, lastName, email, password } = req.body;

    nameIsValid_or_400(firstName);
    nameIsValid_or_400(lastName);
    emailIsValid_or_400(email);
    passwordIsValid_or_400(password);

    return {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
  }

  getRequestToUpdate(request: Request): PropsUpdate {
    const { firstName, lastName, email } = request.body;

    firstName ? nameIsValid_or_400(firstName) : null;
    lastName ? nameIsValid_or_400(lastName) : null;
    email ? emailIsValid_or_400(email) : null;

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
