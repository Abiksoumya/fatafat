import { Request, Response, NextFunction } from "express";
export function verifyAdmin() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.role === "admin") {
      next();
    } else {
      res.status(403).json({
        message: "Access denied. This is not admin account",
      });
    }
  };
}
