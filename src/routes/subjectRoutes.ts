import express from 'express';

import * as subjectController from '@controllers/subjectController';
import { authenticateUser } from '@middleware/authMiddleware';

const subjectRoutes = express.Router();

subjectRoutes.post('/', authenticateUser, subjectController.createSubject);
subjectRoutes.get('/', authenticateUser, subjectController.getSubjects);
subjectRoutes.get('/:subjectId', authenticateUser, subjectController.getSubjectById);
subjectRoutes.put('/:subjectId', authenticateUser, subjectController.updateSubject);
subjectRoutes.delete('/:subjectId', authenticateUser, subjectController.deleteSubject);

export default subjectRoutes;

