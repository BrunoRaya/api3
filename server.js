import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import professionalRoutes from './routes/professionals.js';

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

// Usando as rotas
app.use('/api', professionalRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
