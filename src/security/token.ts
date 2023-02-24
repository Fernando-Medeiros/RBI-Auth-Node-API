import type { Algorithm } from "jsonwebtoken";

import { env } from "process";
import Jwt from "jsonwebtoken";

import { InternalServerError, Unauthorized } from "../helpers/http.exceptions";

const SECRET = env["SECRET_KEY"] || `${Math.random()}`;
const ALGORITHM: Algorithm = "HS512";

const ExpACCESS = parseInt(env["EXP_ACCESS_TOKEN"] || "15");
const ExpREFRESH = parseInt(env["EXP_REFRESH_TOKEN"] || "15");
const ExpRECOVER = parseInt(env["EXP_PWD_RECOVER_TOKEN"] || "5");

export interface PropsToken {
  sub: string;
  exp?: number;
  scope?: string;
}

class EncodeToDecode {
  async encode(payload: PropsToken): Promise<string> {
    const token = await new Promise((resolve) => {
      resolve(Jwt.sign(payload, SECRET, { algorithm: ALGORITHM }));
    })
    .catch(() => {
      throw new InternalServerError("Internal failure while encoding token!");
    });

    return String(token);
  }

  async decode(token: string): Promise<PropsToken> {
    const jwtPayload = await new Promise((resolve) => {
      resolve(Jwt.verify(token, SECRET, { algorithms: [ALGORITHM] }));
    })
    .catch(() => {
      throw new Unauthorized("Could not validate credentials!");
    });
    
    const payload: PropsToken = Object(jwtPayload);

    return payload;
  }
}

export class Token extends EncodeToDecode {
  convertToMilliseconds = (time: number): number => {
    return Math.floor(Date.now() / 1000) + 60 * time;
  };

  createAccess = async (payload: PropsToken): Promise<string> => {
    payload.scope = "access";
    payload.exp = payload.exp || this.convertToMilliseconds(ExpACCESS);

    return await this.encode(payload);
  };

  createRefresh = async (payload: PropsToken): Promise<string> => {
    payload.scope = "refresh";
    payload.exp = payload.exp || this.convertToMilliseconds(ExpREFRESH);

    return await this.encode(payload);
  };

  createRecover = async (payload: PropsToken): Promise<string> => {
    payload.scope = "recover";
    payload.exp = payload.exp || this.convertToMilliseconds(ExpRECOVER);

    return await this.encode(payload);
  };
}
