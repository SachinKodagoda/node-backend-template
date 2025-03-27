import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import HttpStatusCode from '../utils/status-codes.util';

export class AppError extends Error {
  public readonly status: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    isOperational = true,
  ) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationAppError extends AppError {
  public readonly errors: Record<string, string[]>;

  constructor(errors: ValidationError[] | Record<string, string[]>) {
    super('Validation error', HttpStatusCode.BAD_REQUEST);

    if (Array.isArray(errors)) {
      this.errors = errors.reduce((acc, err) => {
        const constraints = err.constraints || {};
        acc[err.property] = Object.values(constraints);
        return acc;
      }, {} as Record<string, string[]>);
    } else {
      this.errors = errors;
    }
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ValidationAppError) {
    res.status(err.status).json({
      status: 'error',
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  if (err instanceof AppError && err.isOperational) {
    res.status(err.status).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  if (err instanceof URIError) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: 'error',
      message: 'Invalid Special Characters Used',
    });
    return;
  }

  if (err instanceof SyntaxError && 'body' in err) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: 'error',
      message: 'Please check your request body format',
    });
    return;
  }

  // Default error response
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error',
  });
  return;
};
