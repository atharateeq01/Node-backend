import { Request, Response } from 'express';
import { isNil, isEmpty, some } from 'lodash';

import * as orderService from '@services/orderService';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { sendResponse } from '@utils/Respons/response';
import handleErrorResponse from '@utils/Respons/handleErrorResponse';
import { handleEmptyResponse } from '@utils/Respons/handleEmptyResponse';
import { AuthRequest } from 'types/auth-request';
import { IOrder } from '@models/Order';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {    
    const order: IOrder | null = await orderService.createOrder(req.body, req.userId);
    sendResponse(res, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY, order);
  } catch (error) {        
    handleErrorResponse(res, error);
  }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders: IOrder[] = await orderService.getOrders();
    handleEmptyResponse(res, orders);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getOrdersByUser = async (req: AuthRequest, res: Response) => {
  try {
    const orders: IOrder[] = await orderService.getOrdersByUser(req.userId);
    handleEmptyResponse(res, orders);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order: IOrder | null = await orderService.getOrderById(req.params.orderId);
    handleEmptyResponse(res, order);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateOrder = async (req: AuthRequest, res: Response) => {
  try {
    const orderData = req.body;
    const orderId = req.params.orderId;
    // Check if orderData object is empty or contains null/undefined values
    if (isEmpty(orderData) || some(orderData, isNil)) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.EMPTY_RECORD);
    }
    const order = await orderService.updateOrder(orderId, orderData);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY, order);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    await orderService.deleteOrder(orderId);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};