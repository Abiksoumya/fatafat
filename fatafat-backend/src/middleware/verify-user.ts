import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { PRIVATEKEY } from "../helper/const";

function extractToken(req: Request): string | null {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token as string;
  }
  return null;
}

export function verifyUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (token !== null) {
      const userDetails: any = jwt.verify(token, PRIVATEKEY);
      res.locals.userId = userDetails.userId;
      res.locals.role = userDetails.role;
      next();
    } else {
      //Verification failed
      res.status(403).json({
        message: "User Token Not Valid",
      });
    }
  };
}
