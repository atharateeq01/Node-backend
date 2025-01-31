import { Response } from 'express';

export const sendSuccessResponse = (res: Response, data: any, statusCode: number, message: string | Array<string>) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
