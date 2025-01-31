import express from 'express';

import * as resultController from '@controllers/resultController';
import { authenticateUser } from '@middleware/authMiddleware';

const resultRoutes = express.Router();

resultRoutes.post('/', authenticateUser, resultController.createResult);
resultRoutes.get('/', authenticateUser, resultController.getResults);
resultRoutes.get('/:resultId', authenticateUser, resultController.getResultById);
resultRoutes.put('/:resultId', authenticateUser, resultController.updateResult);
resultRoutes.delete('/:resultId', authenticateUser, resultController.deleteResult);    

export default resultRoutes;
