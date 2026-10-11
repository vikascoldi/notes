import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN as string,
    (err: jwt.VerifyErrors | null, user: string | JwtPayload | undefined) => {
      if (err || !user) {
        res.sendStatus(403);
        return;
      }

      req.user = user;
      next();
    },
  );
};

export default authenticateToken;
