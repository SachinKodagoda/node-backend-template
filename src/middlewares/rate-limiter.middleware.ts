import rateLimit from "express-rate-limit";
import { validateEnv } from "../configs/env.config";
import { AppError } from "./common-errors.middleware";
import HttpStatusCode from "../utils/status-codes.util";

const env = validateEnv();

export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS, // 15 minutes
  max: env.RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(
      new AppError(
        "Too many requests, please try again later.",
        HttpStatusCode.TOO_MANY_REQUESTS
      )
    );
  },
});

export const authLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS * 4, // 1hour
  max: env.RATE_LIMIT_MAX, // limit each IP to 10 login attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(
      new AppError(
        "Too many login attempts, please try again later.",
        HttpStatusCode.TOO_MANY_REQUESTS
      )
    );
  },
});
