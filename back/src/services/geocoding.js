const axios = require('axios');

async function geocodeAddress({ street, city, state, cep }) {
  try {
    const q = [street, city, state, cep].filter(Boolean).join(', ');
    if (!q) return null;
    const url = `https://nominatim.openstreetmap.org/search`;
    const { data } = await axios.get(url, { params: { q, format: 'json', limit: 1, addressdetails: 0 } , headers: { 'User-Agent': 'Agendamentos-App/1.0' } });
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
    return null;
  } catch (err) {
    console.warn('Geocoding failed', err.message);
    return null;
  }
}

module.exports = { geocodeAddress };
