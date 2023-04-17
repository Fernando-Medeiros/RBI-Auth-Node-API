import type {
  PropsToken,
  IToken,
} from "@app/interfaces/security/token.interface";
import { env } from "process";
import { encode } from "./encode.impl";
import { decode } from "./decode.impl";

const ExpACCESS = parseInt(env["EXP_ACCESS"] || "15");
const ExpREFRESH = parseInt(env["EXP_REFRESH"] || "15");
const ExpRECOVER = parseInt(env["EXP_RECOVER"] || "5");

export class Token implements IToken {
  async encode(payload: PropsToken): Promise<string> {
    return await encode<PropsToken, string>(payload);
  }

  async decode(token: string): Promise<PropsToken> {
    return await decode<string, PropsToken>(token);
  }

  convertToMilliseconds = (exp: number): number => {
    return Math.floor(Date.now() / 1000) + 60 * exp;
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
