import { Request, Response, NextFunction } from 'express';
import User from '../entities/User';

const jwt = require("jsonwebtoken");

export interface CustomRequest extends Request {
  user?: User,
}

function authentificationToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: User) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    return next();
  });
}

export default authentificationToken;