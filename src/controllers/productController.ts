import { Request, Response } from 'express';
import mongoose from 'mongoose'; 
import { isNil, isEmpty, some } from 'lodash';

import * as productService from '@services/productService';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { IProduct } from '@models/Product';
import { sendResponse } from '@utils/Respons/response';
import handleErrorResponse from '@utils/Respons/handleErrorResponse';
import { handleEmptyResponse } from '@utils/Respons/handleEmptyResponse';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product : IProduct | null = await productService.createProduct(req.body);
    sendResponse(res, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY, product);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {        
    const products : IProduct[]= await productService.getProducts();    
    handleEmptyResponse(res, products);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product : IProduct | null = await productService.getProductById(req.params.productId);
    handleEmptyResponse(res, product);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getProductByCategoryId = async (req: Request, res: Response) => {
  try {
    const product : IProduct[] | null = await productService.getProductByCategoryId(req.params.categoryId);
    handleEmptyResponse(res, product);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const productId = req.params.productId;
    // Check if productData object is empty or contains null/undefined values
    if (isEmpty(productData) || some(productData, isNil)) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.EMPTY_RECORD);
    }    
    const product = await productService.updateProduct(productId, productData);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY, product);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await productService.deleteProduct(productId);    
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
