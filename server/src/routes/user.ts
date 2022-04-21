import { validate } from "class-validator";
import express, { Request, Response } from "express";
import cookie from "cookie";
import User from "../entities/User";
import authentificationToken, { CustomRequest } from "../middleware/middleware";

const jwt = require("jsonwebtoken");

const userRoutes = express.Router();

userRoutes.post('/api/register', async (req: Request, res: Response) => {
  const { email, first_name, las_name, password } = req.body;
  try {
    let errors: any = {}
    const emailUser = await User.findOneBy({ email });

    if (emailUser) errors.email = `Почта уже занята <${email}>`;

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = User.create({ first_name, las_name, email, password });

    errors = await validate(user)
    if (errors.length > 0) return res.status(400).json({ errors })

    await user.save();

    return res.json(`${user.email}, регистрация прошла успешно!`)
  } catch (error) {
    return res.status(500).json(error);
  }
})

userRoutes.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOneBy({ email });
  const expiresIn = process.env.EXPIRES_IN ?? 3000;

  if (!user || !password)
    return res.status(400).end("ошибка");

  const passwordMatches = user.passwordCheck(password);

  if (!passwordMatches) {
    return res.status(401).json({ password: "Password is incorrect" });
  }

  const access_token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${expiresIn}ms` });

  res.set('Set-Cookie', cookie.serialize('token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: +expiresIn,
    path: "/"
  }))

  return res.json({ access_token });
})

userRoutes.get('/api/user', authentificationToken, async (req: CustomRequest, res: Response) => {
  return res.json(req.user);
})

export {
  userRoutes
}