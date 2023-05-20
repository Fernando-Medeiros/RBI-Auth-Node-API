export interface PropsToken {
    sub: string;
    exp?: number;
    scope?: string;
}

export interface IToken {
    encode(payload: PropsToken): Promise<string>;
    decode(token: string): Promise<PropsToken>;
    convertToMilliseconds(exp: number): number;
    createRecover(payload: PropsToken): Promise<string>;
    createAccess(payload: PropsToken): Promise<string>;
    createRefresh(payload: PropsToken): Promise<string>;
}
