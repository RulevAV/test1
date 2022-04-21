import express, { Response } from "express";
import ExchangeRates from "../entities/ExchangeRates";
import authentificationToken, { CustomRequest } from "../middleware/middleware";

const exchangeRates = express.Router();

exchangeRates.get('/api/rates/day', authentificationToken, async (req: CustomRequest, res: Response) => {
  const { date } = req.body;
  const dateString = new Date(date).toLocaleDateString();

  const temp = await ExchangeRates.findBy({ Date: dateString });

  return res.json(temp);
})

exchangeRates.get('/api/rates/history', authentificationToken, async (req: CustomRequest, res: Response) => {
  const { ID } = req.body;

  const temp = await ExchangeRates.findBy({ ID });

  return res.json(temp);
})

export {
  exchangeRates
}