import { Request, Response, NextFunction } from "express";
export function verifyStokez() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.role === "stokez") {
      next();
    } else {
      res.status(403).json({
        message: "Access denied. This is not Stokez account",
      });
    }
  };
}
