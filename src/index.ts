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

// Database Test
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

// Add items to cart
app.post("/cart-add", (req: Request, res: Response) => {
  const payload_cart = {
    user_id: 1, // TODO insert check signed in user ID via JWT here
  };

  const payload_cart_detail = {
    cart_id: null,
    product_id: req.body.product_id,
    product_variation_id: req.body.product_variation_id,
    product_qty: req.body.product_qty,
  };

  console.log(req.body);

  const cart = connection.query(
    "INSERT INTO carts SET ?",
    payload_cart,
    function (error, results, fields) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json({
        message: "Added items to cart successfuly",
      });
    }
  );

  payload_cart_detail.cart_id = 1; // TODO insert the newly created Cart ID here
  connection.query(
    "INSERT INTO cart_details SET ?",
    payload_cart,
    function (error, results, fields) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json({
        message: "Added items to cart details successfuly",
      });
    }
  );
});

// Add new order
app.post("/add-order", (req: Request, res: Response) => {
  const payload = {
    user_id: 1, // TODO insert check signed in user ID via JWT here
    cart_id: req.body.cart_id,
    status: 0,
    total_price: 500000, // TODO insert aggregrate price of cart items here
  };

  console.log(req.body);

  connection.query(
    "INSERT INTO orders SET ?",
    payload,
    function (error, results, fields) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json({
        message: "Added new order succesfuly",
      });
    }
  );
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
