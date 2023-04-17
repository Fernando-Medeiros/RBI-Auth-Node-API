import type { Algorithm } from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import { InternalServerError } from "@src/helpers/http.exceptions";

type payloadSchema = string | Buffer | object;

export async function encode<T = payloadSchema, R = object>(
  payload: T
): Promise<R> {
  const { SECRET_KEY, ALGORITHM } = process.env;

  return (await new Promise((resolve) => {
    resolve(
      Jwt.sign(payload as payloadSchema, String(SECRET_KEY), {
        algorithm: ALGORITHM as Algorithm,
      })
    );
  }).catch(() => {
    throw new InternalServerError("Internal failure while encoding token!");
  })) as R;
}
