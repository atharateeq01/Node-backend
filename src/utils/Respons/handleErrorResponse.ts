import { Response } from 'express';
import mongoose from 'mongoose';

import { sendResponse } from '@utils/Respons/response';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';

const handleErrorResponse = (res: Response, error: any) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).map((err) => err.message);
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, errors);
  } else {
    return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export default handleErrorResponse;
