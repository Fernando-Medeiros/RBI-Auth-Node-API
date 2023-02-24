import type { Request } from "express";
import type {
  PropsUpdate,
  PropsCreate,
} from "../../entities/interfaces/customer.interface";

import {
  nameIsValid,
  emailIsValid,
  passwordIsValid,
} from "../../validators/customer.validators";

import { isTrue_or_400 } from "../../validators/validators";

export class CustomerRequest {
  createRequest(request: Request): PropsCreate {
    const { firstName, lastName, email, password } = request.body;

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

  updateRequest(request: Request): PropsUpdate {
    const { firstName, lastName, email } = request.body;

    firstName ? nameIsValid(firstName) : null;
    lastName ? nameIsValid(lastName) : null;
    email ? emailIsValid(email) : null;

    const dataToUpdate = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    firstName ? null : delete dataToUpdate.firstName;
    lastName ? null : delete dataToUpdate.lastName;
    email ? null : delete dataToUpdate.email;

    isTrue_or_400(
      Object.values(dataToUpdate).length ? true : null,
      "There is no content, enter valid data to update!"
    );

    return dataToUpdate;
  }
}
