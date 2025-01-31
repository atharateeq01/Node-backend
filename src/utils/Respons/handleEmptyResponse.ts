import { Response } from 'express';
import { sendResponse } from '@utils/Respons/response';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';

export const handleEmptyResponse = (res: Response, data: any) => {
  if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGES.NO_RECORD);
  } else {
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_FETCHED_SUCCESSFULLY, data);
  }
};
