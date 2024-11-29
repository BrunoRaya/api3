import express from 'express';
import Professional from '../models/professional.js';

const router = express.Router();

router.get('/professionals', async (req, res) => {
    try {
      const professions = req.query.professions?.split(',') || [];
  
      // Realizando a busca insensível a maiúsculas/minúsculas
      const professionals = await Professional.find({
        profession: { $in: professions.map(prof => new RegExp(`^${prof}$`, 'i')) }
      })
        .select('name email profession');
  
      res.json(professionals);
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  });
  

export default router;
