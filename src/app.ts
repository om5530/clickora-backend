import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import fs from "fs";
import YAML from "yaml";
import { sequelize } from "./datasource";
const swaggerUi = require('swagger-ui-express');
import authRouter from "./routes/auth";

export const app = express();

const swaggerFile = fs.readFileSync('./src/public/swagger/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(swaggerFile);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Serve static Swagger UI files if needed
app.use('/swagger', express.static('./src/public/swagger'));


sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err: Error) => {
    console.error("Error during DB initialization:", err);
    process.exit(1);
  });

const corsOrigin = process.env.FRONTEND_DOMAIN || process.env.BACKEND_DOMAIN;

const corsOptions = {
  origin: corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization", "Token", "accept-encoding", "cache-control", "user-agent"],
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]", {
    skip: (req: Request) => {
      if (req.originalUrl === "/health-check" || req.originalUrl.startsWith("/public/") || req.method === "OPTIONS") {
        return true;
      }
      return false;
    },
  })
);

app.get("/syncDB", async (req: Request, res: Response) => {
  if (["development"].includes(process.env.NODE_ENV ?? "development")) {
    await sequelize.sync({ alter: true });
    res.send("Database synced");
  } else {
    res.send("Database sync skipped");
  }
});

app.get("/health-check", async (_req: Request, res: Response) => {
  res.status(200).send("Healthy");
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.name, err.message);
  console.log(err);
  if (err.name === "TokenExpiredError") {
    res.status(401).send({ message: err.message });
  }
  res.status(501).send({
    message: err.message,
  });
});
