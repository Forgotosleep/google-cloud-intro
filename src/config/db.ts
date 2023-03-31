export type DBConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
};

const config: DBConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 3306,
};

export default config;
