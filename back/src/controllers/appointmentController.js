const Appointment = require('../models/Appointment');

// Criar agendamento
const create = async (req, res) => {
  try {
    const { date, time, description } = req.body;

    const appointment = await Appointment.create({
      user: req.user.id,
      date,
      time,
      description,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar agendamentos
const list = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).populate('user', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar agendamento
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, description } = req.body;

    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { date, time, description },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remover agendamento
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    res.json({ message: 'Agendamento removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  list,
  update,
  remove,
};
