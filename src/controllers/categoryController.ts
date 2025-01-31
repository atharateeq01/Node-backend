import { Request, Response } from 'express';
import mongoose from 'mongoose'; 
import { isNil, isEmpty, some } from 'lodash';

import * as categoryService from '@services/categoryService';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { ICategory } from '@models/Category';
import { sendResponse } from '@utils/Respons/response';
import handleErrorResponse from '@utils/Respons/handleErrorResponse';
import { handleEmptyResponse } from '@utils/Respons/handleEmptyResponse';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category : ICategory | null = await categoryService.createCategory(req.body);
    sendResponse(res, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY, category);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getCategorys = async (req: Request, res: Response) => {
  try {    
    const categorys : ICategory[]= await categoryService.getCategorys();
    handleEmptyResponse(res, categorys);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category : ICategory | null = await categoryService.getCategoryById(req.params.categoryId);
    handleEmptyResponse(res, category);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getCategoryByUserId = async (req: Request, res: Response) => {
  try {
    const category : ICategory[] | null = await categoryService.getCategoryByUserId(req.params.userId);
    handleEmptyResponse(res, category);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;
    const categoryId = req.params.categoryId;
    // Check if categoryData object is empty or contains null/undefined values
    if (isEmpty(categoryData) || some(categoryData, isNil)) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.EMPTY_RECORD);
    }    
    const category = await categoryService.updateCategory(categoryId, categoryData);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY, category);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    await categoryService.deleteCategory(categoryId);    
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
