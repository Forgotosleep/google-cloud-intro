import * as dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cfg from "./config/db";
import { createConnection } from "./db/mysql";

const app: Express = express();
const port = process.env.PORT || 3000;
const connection = createConnection(cfg);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("HELLO WORLD!");
});

app.post("/todo", (req: Request, res: Response) => {
  const payload = {
    todo: req.body.todo,
    done: false,
  };

  console.log(req.body);

  connection.query(
    "INSERT INTO todo SET ?",
    payload,
    function (error, results, fields) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json({
        message: "Todo task created successfuly",
      });
    }
  );
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
