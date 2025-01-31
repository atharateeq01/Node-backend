import { Response } from 'express';

export const sendErrorResponse = (res: Response, statusCode: number, message: string | Array<string> ) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
