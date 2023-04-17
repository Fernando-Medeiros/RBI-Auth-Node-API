import type { Algorithm } from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import { Unauthorized } from "@src/helpers/http.exceptions";

export async function decode<T = string, R = object>(payload: T): Promise<R> {
  const { SECRET_KEY, ALGORITHM } = process.env;

  return (await new Promise((resolve) => {
    resolve(
      Jwt.verify(String(payload), String(SECRET_KEY), {
        algorithms: [ALGORITHM as Algorithm],
      })
    );
  }).catch(() => {
    throw new Unauthorized("Could not validate credentials!");
  })) as R;
}
