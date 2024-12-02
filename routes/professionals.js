import express from 'express';
import Professional from '../models/professional.js';

const router = express.Router();

router.get('/professionals', async (req, res) => {
  try {
    const professions = req.query.professions?.split(',') || []; 

    if (professions.length === 0) {
      return res.status(400).json({ message: 'Nenhuma profissão fornecida.' });
    }

    const professionals = await Professional.find({
      $or: professions.map(prof => ({
        profession: { $regex: `(^|,\\s*)${prof}(\\s*,|$)`, $options: 'i' }
      }))
    })
      .select('name email profession valor -_id');

    if (professionals.length === 0) {
      return res.status(404).json({ message: 'Nenhum profissional encontrado para as profissões fornecidas.' });
    }

    res.json(professionals);

  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

export default router;
