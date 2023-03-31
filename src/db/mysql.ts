import { DBConfig } from "../config/db";
import mysql from "mysql";

export function createConnection(cfg: DBConfig) {
  const connection = mysql.createConnection(cfg);

  connection.connect();

  return connection;
}
