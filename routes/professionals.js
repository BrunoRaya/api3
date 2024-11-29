import express from 'express';
import { getProfessionalsByProfession } from '../controllers/professionalsController.js';

const router = express.Router();

router.get('/profissionais/:profession', getProfessionalsByProfession);

export default router;
