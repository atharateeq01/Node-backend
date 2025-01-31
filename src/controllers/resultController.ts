import { Request, Response } from 'express';
import mongoose from 'mongoose';

import * as resultService from '@services/resultService';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { IResult } from '@models/Result';
import { sendResponse } from '@utils/Respons/response';
import { AuthRequest } from 'types/auth-request';
import handleErrorResponse from '@utils/Respons/handleErrorResponse';
import { handleEmptyResponse } from '@utils/Respons/handleEmptyResponse';

export const createResult = async (req: AuthRequest, res: Response) => {
  try {
    const resultData = { ...req.body, createdBy: req.userId };
    const result: IResult | null = await resultService.createResult(resultData);
    sendResponse(res, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY, result);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getResults = async (req: AuthRequest, res: Response) => {
  try {
    const results: IResult[] = await resultService.getResults(req.userId);
    handleEmptyResponse(res, results);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getResultById = async (req: AuthRequest, res: Response) => {
  try {
    const result: IResult | null = await resultService.getResultById(req.params.resultId);
    handleEmptyResponse(res, result);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateResult = async (req: Request, res: Response) => {
  try {
    const resultData = req.body;
    const resultId = req.params.resultId;
    const result = await resultService.updateResult(resultId, resultData);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY, result);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteResult = async (req: Request, res: Response) => {
  try {
    const resultId = req.params.resultId;
    await resultService.deleteResult(resultId);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
