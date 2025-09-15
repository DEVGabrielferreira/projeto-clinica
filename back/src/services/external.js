const axios = require('axios');

/**
 * Busca endereço pelo CEP usando a API ViaCEP
 * @param {string} cep
 * @returns {Promise<Object|null>}
 */
async function fetchAddressByCep(cep) {
  // Remove qualquer caractere não numérico
  const cleaned = (cep || '').replace(/\D/g, '');
  if (!cleaned) return null;

  try {
    const url = `https://viacep.com.br/ws/${cleaned}/json/`;
    const { data } = await axios.get(url);

    if (data && !data.erro) {
      return {
        cep: data.cep,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      };
    }

    return null;
  } catch (err) {
    console.warn('Erro ao buscar CEP:', err.message);
    return null;
  }
}

module.exports = { fetchAddressByCep };
