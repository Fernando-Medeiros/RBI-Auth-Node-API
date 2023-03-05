import { validate } from "uuid";
import {
  BadRequest,
  InternalServerError,
  Unauthorized,
} from "@src/helpers/http.exceptions";

export const tokenIsValid = (
  token: string | undefined,
  message: string
): void => {
  const exp = token === undefined || String(token).length < 200;

  if (exp) {
    throw new Unauthorized(message);
  }
};

export const subIsValid = (sub?: string): void => {
  const exp = sub === undefined || !validate(sub);

  if (exp) {
    throw new InternalServerError(
      "Could not verify credentials, please sign in again to refresh session!"
    );
  }
};

export const idIsValid = (id?: string): void => {
  const exp = id === undefined || !validate(id);

  if (exp) {
    throw new BadRequest("Invalid or non-existent id!");
  }
};
