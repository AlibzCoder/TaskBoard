import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cp from "cookie-parser";
import bp from "body-parser";
import InitializeRoutes from "./routes";

export function createApp() {
  const app = express();

  // Disable All CORS Request
  app.use(cors());
  // Parse Requests
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: true }));

  app.use(function (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof SyntaxError) {
      res.status(400).send({ message: "Unable To Parse Data" });
    } else {
      next();
    }
  });

  // To parse cookies from the HTTP Request
  app.use(cp());

  InitializeRoutes(app);

  return app;
}
