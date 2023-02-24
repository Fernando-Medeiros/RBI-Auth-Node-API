import { BadRequest } from "../helpers/http.exceptions";

class RegexValidator {
  constructor(field: string | undefined, pattern: string, message: string) {
    const regex = new RegExp(pattern);
    const exp = field === null || !regex.test(field || "");

    if (exp) {
      throw new BadRequest(message);
    }
  }
}

export const nameIsValid = (name?: string): void => {
  new RegexValidator(name, `([A-Za-z]{3,20})`, "Name format is invalid!");
};

export const emailIsValid = (email?: string): void => {
  new RegexValidator(
    email,
    `([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9]+(.[A-Z|a-z]{2,})+`,
    "Email format is invalid!"
  );
};

export const passwordIsValid = (password?: string): void => {
  new RegexValidator(
    password,
    `^([A-Za-z0-9]).{7,}$`,
    "Password format is invalid!"
  );
};
