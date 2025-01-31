import { Response } from 'express';
import { sendSuccessResponse } from '@utils/Respons/success-response';
import { sendErrorResponse } from '@utils/Respons/error-response';

export const sendResponse = (res: Response, statusCode: number, message: string | Array<string>,  data?: any) => {
  if (statusCode === 200 || statusCode === 201) {
    sendSuccessResponse(res, data, statusCode, message);
  } else {
    sendErrorResponse(res, statusCode, message);
  }
};
