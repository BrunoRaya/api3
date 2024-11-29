import express from 'express';
import Professional from '../models/professional.js';

const router = express.Router();

router.get('/professionals', async (req, res) => {
    try {
      const professions = req.query.professions?.split(',') || []; 
  
      const professionals = await Professional.find({
        profession: { 
          $in: professions.map(prof => new RegExp(`(^|, )${prof}($|, )`, 'i')) 
        }
      })
        .select('name email profession -_id');
  
      if (professionals.length === 0) {
        return res.status(404).json({ message: 'Nenhum profissional encontrado para esta profissão.' });
      }
  
      res.json(professionals);
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  });
  
  

export default router;
