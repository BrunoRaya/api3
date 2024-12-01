import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import professionalRoutes from './routes/professionals.js';
import Professional from './models/professional.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4200;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.log('Erro de conexão com MongoDB:', err));

app.use(express.json());

app.get('/api/professionals', async (req, res) => {
  try {
    
    let professions = req.query.professions;

    if (typeof professions === 'string') {
      professions = professions.split(','); 
    } else if (!Array.isArray(professions)) {
      professions = []; 
    }

    console.log('Query Professions:', professions); 

    const professionals = await Professional.find({ profession: { $in: professions } })
      .select('name email profession -_id');

    if (professionals.length === 0) {
      return res.status(404).json({ message: 'Nenhum profissional encontrado' });
    }

    res.json(professionals);
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.use('/api', professionalRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
