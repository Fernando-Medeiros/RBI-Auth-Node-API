import type { BooleanExpression } from "mongoose";
import type { BaseException } from "./http.exceptions";

export const throwError = (
  expression: BooleanExpression,
  exception: BaseException,
) => {
  if (expression) {
    throw exception;
  }
};
