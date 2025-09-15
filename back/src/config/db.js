const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const connect = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('Erro: variável MONGO_URI não definida no .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB conectado com sucesso!');
    } catch (err) {
        console.error('Erro na conexão com MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connect;
