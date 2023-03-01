import { BadRequest } from "../../helpers/http.exceptions";

class RegexValidator {
  constructor(value: string | undefined, regex: RegExp, message: string) {
    const exp = value === null || !regex.test(value as string);

    if (exp) {
      throw new BadRequest(message);
    }
  }
}

export const nameIsValid = (name?: string): void => {
  new RegexValidator(
    name,
    /^[a-zA-Z]{4,12}(\s[a-zA-Z]{3,12})?$/g,
    "Name format is invalid!"
  );
};

export const emailIsValid = (email?: string): void => {
  new RegexValidator(
    email,
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g,
    "Email format is invalid!"
  );
};

export const passwordIsValid = (password?: string): void => {
  new RegexValidator(
    password,
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,16}$/g,
    "Password format is invalid!"
  );
};
