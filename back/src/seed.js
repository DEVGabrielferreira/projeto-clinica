// src/scripts/seedAdmin.js
require('dotenv').config();
const connectDB = require('../config/db'); 
const User = require('../models/User');
const bcrypt = require('bcrypt');

(async () => {
  try {
    await connectDB();

    const passwordHash = await bcrypt.hash('admin123', 10);
    const email = 'admin@local'.toLowerCase();

    const exists = await User.findOne({ email });
    if (!exists) {
      await User.create({
        name: 'Admin',
        email,
        passwordHash,
        role: 'admin'
      });
      console.log('Admin criado: admin@local / admin123');
    } else {
      console.log('Admin já existe');
    }
  } catch (error) {
    console.error('Erro ao criar admin:', error);
  } finally {
    process.exit(0);
  }
})();
