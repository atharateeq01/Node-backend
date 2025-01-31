import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { findByEmail } from '@services/userService';
import { HTTP_STATUS, SECRET_KEY, TOKEN_EXPIRES_IN } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import * as validator from '@utils/helper/validationChecker';
import { sendResponse } from '@utils/Respons/response';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, `Email ${MESSAGES.IS_REQUIRED}`);
  }
  if (!password) {
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, `Password ${MESSAGES.IS_REQUIRED}`);
  }
  if (!validator.isValidEmail(email)) {
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.EMAIL_FORMAT_INVALID);
  }
  try {
    const user = await findByEmail(email);
    if (!user) {
      return sendResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGES.ACCOUNT_NOT_EXISIT);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, MESSAGES.INCORRECT);
    }
    const token = jwt.sign({ userId: user._id }, `${SECRET_KEY}`, { expiresIn: TOKEN_EXPIRES_IN });
    res.cookie('token', token);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.LOGIN, token);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

export default router;
