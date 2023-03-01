import type { Request } from "express";
import type { IToken } from "../../security/token/token.interface";
import { isTrue_or_400 } from "../validators/validators";
import type { IAuthRequests } from "../requests/auth/requests.interface";

export async function refreshCase(
  req: Request,
  jwt: IToken,
  authRequest: IAuthRequests
): Promise<refreshResponse> {
  const token = authRequest.getRefreshRequest(req);

  const payload = await jwt.decode(token);

  isTrue_or_400(payload.scope === "refresh", "Use refresh scope tokens only!");

  return {
    refresh: await jwt.createRefresh({ sub: payload.sub }),
    type: "bearer",
  };
}

interface refreshResponse {
  refresh: string;
  type: string;
}
