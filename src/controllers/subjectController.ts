import { Request, Response } from 'express';
import mongoose from 'mongoose'; 
import { isNil, isEmpty, some } from 'lodash';

import * as subjectService from '@services/subjectService';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { ISubject } from '@models/Subject';
import { sendResponse } from '@utils/Respons/response';
import handleErrorResponse from '@utils/Respons/handleErrorResponse';
import { handleEmptyResponse } from '@utils/Respons/handleEmptyResponse';

export const createSubject = async (req: Request, res: Response) => {
  try {
    const subject : ISubject | null = await subjectService.createSubject(req.body);
    sendResponse(res, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY, subject);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getSubjects = async (req: Request, res: Response) => {
  try {    
    const subjects : ISubject[]= await subjectService.getSubjects();
    handleEmptyResponse(res, subjects);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const subject : ISubject | null = await subjectService.getSubjectById(req.params.subjectId);
    handleEmptyResponse(res, subject);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const subjectData = req.body;
    const subjectId = req.params.subjectId;
    // Check if subjectData object is empty or contains null/undefined values
    if (isEmpty(subjectData) || some(subjectData, isNil)) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.EMPTY_RECORD);
    }    
    const subject = await subjectService.updateSubject(subjectId, subjectData);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY, subject);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const subjectId = req.params.subjectId;
    await subjectService.deleteSubject(subjectId);    
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
