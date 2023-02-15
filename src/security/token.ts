import { env } from "process";
import type { Algorithm } from "jsonwebtoken";
import Jwt from "jsonwebtoken";

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
  encode(payload: PropsToken): Promise<string> {
    return new Promise((resolve, reject) => {
      Jwt.sign(payload, SECRET, { algorithm: ALGORITHM }, (error, token) => {
        error?.message ? reject(error) : resolve(token);
      });
    });
  }
  decode(token: string): Promise<PropsToken> {
    return new Promise((resolve, reject) => {
      Jwt.verify(token, SECRET, { algorithms: [ALGORITHM] }, (error, token) => {
        error?.message ? reject(error) : resolve(token);
      });
    });
  }
}

export class Token extends EncodeToDecode {
  convertToMilliseconds = (minutes: number): number => {
    return Math.floor(Date.now() / 1000) + 60 * minutes;
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
