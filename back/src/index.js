const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { fetchAddressByCep } = require('./services/external');
const connectDB = require('./config/db');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

app.get('/api/cep/:cep', async (req, res) => {
  const { cep } = req.params;
  try {
    const address = await fetchAddressByCep(cep);
    if (!address) {
      return res.status(404).json({ message: 'CEP não encontrado' });
    }
    res.json(address);
  } catch (err) {
    console.error('Erro no endpoint /api/cep/:cep', err);
    res.status(500).json({ message: 'Erro interno' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
