import type { Request, Response } from "express";
import { AuthHandler } from "./handlers/auth.handler";

const handler = new AuthHandler();

export const login = async (req: Request, res: Response) => {
  try {
    const result = await handler.login(req);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ detail: `${error}` });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const result = await handler.refresh(req);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ detail: `${error}` });
  }
};
