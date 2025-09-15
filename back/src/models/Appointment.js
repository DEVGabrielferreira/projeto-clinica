const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  address: {
    cep: String,
    street: String,
    number: String,
    neighborhood: String,
    city: String,
    state: String,
    lat: Number,
    lon: Number,
  },
  weatherForecast: Object,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
