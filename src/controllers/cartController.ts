import { Request, Response } from 'express';
import { isNil, isEmpty, some } from 'lodash';

import * as cartService from '@services/cartService';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { ICart } from '@models/Cart';
import { sendResponse } from '@utils/Respons/response';
import handleErrorResponse from '@utils/Respons/handleErrorResponse';
import { handleEmptyResponse } from '@utils/Respons/handleEmptyResponse';
import { AuthRequest } from 'types/auth-request';

export const createCart = async (req: AuthRequest, res: Response) => {
  try {      
    const cart: ICart | null = await cartService.createCart(req.userId, req.body.addInCart, req.body.productIdToDelete);
    sendResponse(res, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY, cart);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getCarts = async (req: AuthRequest, res: Response) => {
  try {
    const carts: ICart[] = await cartService.getCarts();
    handleEmptyResponse(res, carts);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getCartsOfUser = async (req: AuthRequest, res: Response) => {
  try {
    const carts: ICart[] = await cartService.getCartForUser(req.userId);        
    handleEmptyResponse(res, carts);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getCartById = async (req: AuthRequest, res: Response) => {
  try {
    const cart: ICart | null = await cartService.getCartById(req.params.cartId);
    handleEmptyResponse(res, cart);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getCartByProductId = async (req: AuthRequest, res: Response) => {
  try {
    const cart: ICart[] | null = await cartService.getCartByProductId(req.params.categoryId);
    handleEmptyResponse(res, cart);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateCart = async (req: AuthRequest, res: Response) => {
  try {
    const cartData = req.body;
    const cartId = req.params.cartId;
    // Check if cartData object is empty or contains null/undefined values
    if (isEmpty(cartData) || some(cartData, isNil)) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.EMPTY_RECORD);
    }
    const cart = await cartService.updateCart(cartId, cartData);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY, cart);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.cartId;
    await cartService.deleteCart(cartId);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
