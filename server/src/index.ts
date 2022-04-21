import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import dotenv from 'dotenv';
import { userRoutes } from "./routes/user";
import { updateExchangeRates } from "./service/updateExchangeRates";
import { exchangeRates } from "./routes/exchangeRates";
dotenv.config();

const app = express();
const cors = require('cors');
const PORT = process.env.PORT ?? 3000;

app.use(cors())
app.use(express.json());

app.use("/", userRoutes);
app.use("/", exchangeRates);

setInterval(updateDb, 86400);

function updateDb() {
  updateExchangeRates();
}

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`)
  try {
    await createConnection()
    updateExchangeRates();
    console.log("Database connection!")
  } catch (err) {
    console.log(err);
  }
})