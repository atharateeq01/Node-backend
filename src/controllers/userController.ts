import { Request, Response } from 'express';
import mongoose from 'mongoose'; 
import { isNil, isEmpty, some } from 'lodash';

import * as userService from '@services/userService';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { IUser } from '@models/User';
import { sendResponse } from '@utils/Respons/response';
import { AuthRequest } from 'types/auth-request';
import { handleEmptyResponse } from '@utils/Respons/handleEmptyResponse';
import handleErrorResponse from '@utils/Respons/handleErrorResponse';

export const createUser = async (req: Request, res: Response) => {
  try {
    // Check if user with the same email already exists
    const existingUser : IUser | null = await userService.findByEmail(req.body.email);
    if (existingUser) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.USER_EMAIL_EXISTS);
    }
    // Create user
    const user : IUser | null = await userService.createUser(req.body);
    sendResponse(res, HTTP_STATUS.CREATED, MESSAGES.SIGNUP_SUCCESSFULLY, user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {    
    const users : IUser[]= await userService.getUsers();
    handleEmptyResponse(res, users);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user : IUser | null = await userService.getUserById(req.params.userId);
    handleEmptyResponse(res, user);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getUserInfo = async (req: AuthRequest, res: Response) => {
  try {
    const user : IUser | null = await userService.getUserInfo(req.userId);
    handleEmptyResponse(res, user);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userId = req.params.id;
    // Check if userData object is empty or contains null/undefined values
    if (isEmpty(userData) || some(userData, isNil)) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.EMPTY_RECORD);
    }  
    // Check if user with the same email already exists
    if(userData.email){
      const existingUser : IUser | null = await userService.findByEmail(userData.email);
      if (existingUser) {
        return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.USER_EMAIL_EXISTS);
      }
    }    
    const user = await userService.updateUser(userId, userData);
    handleEmptyResponse(res, user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);    
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
