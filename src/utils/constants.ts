import dotenv from 'dotenv';
dotenv.config();

export const API_PREFIX = '/api';
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};
export const SECRET_KEY = process.env.SECRET_KEY ;
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
