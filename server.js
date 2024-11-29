import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import professionalRoutes from './routes/professionals.js';
import Professional from './models/professional.js';

// Carregando variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4200;

// Conectando ao MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.log('Erro de conexão com MongoDB:', err));

// Middleware para ler o corpo das requisições como JSON
app.use(express.json());

// Rota para buscar profissionais com base nas profissões
app.get('/api/professionals', async (req, res) => {
  try {
    const professions = req.query.professions?.split(',') || []; // Recebe as profissões como query
    const professionals = await Professional.find({ profession: { $in: professions } })
      .select('name email profession'); // Seleciona apenas os campos necessários
    res.json(professionals);
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Usando as rotas de profissionais
app.use('/api', professionalRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
