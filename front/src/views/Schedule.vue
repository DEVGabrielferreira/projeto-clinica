<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Header -->
    <header class="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white">Sistema de Agendamentos</h1>
        </div>
        <div class="flex items-center space-x-4">
          <router-link v-if="isAdmin" 
            to="/admin" 
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>Painel Admin</span>
          </router-link>
          <button @click="logout" 
            class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Formulário de Agendamento -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-8 shadow-2xl">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">Novo Agendamento</h2>
        </div>

        <form @submit.prevent="create" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-300 mb-2">Título</label>
              <input v-model="form.title" 
                placeholder="Digite o título do agendamento" 
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-300 mb-2">Descrição</label>
              <textarea v-model="form.description" 
                placeholder="Descreva os detalhes do agendamento" 
                rows="3"
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">CEP</label>
              <input v-model="form.address.cep" 
                placeholder="00000-000" 
                @blur="lookupCep"
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Número</label>
              <input v-model="form.address.number" 
                placeholder="123" 
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Rua</label>
              <input v-model="form.address.street" 
                placeholder="Nome da rua" 
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Cidade</label>
              <input v-model="form.address.city" 
                placeholder="Nome da cidade" 
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-300 mb-2">Data e Hora</label>
              <input type="datetime-local" 
                v-model="form.date" 
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>
          </div>

          <button type="submit" 
            class="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>Criar Agendamento</span>
          </button>
        </form>
      </div>

      <!-- Lista de Agendamentos -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white">Seus Agendamentos</h2>
          </div>

          <div class="flex items-center space-x-3">
            <input v-model="q" 
              placeholder="Buscar agendamentos..." 
              @keyup.enter="load"
              class="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            <button @click="load" 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <span>Buscar</span>
            </button>
          </div>
        </div>

        <div v-if="appointments.length === 0" 
          class="text-center py-12">
          <div class="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <p class="text-slate-400 text-lg">Nenhum agendamento encontrado</p>
          <p class="text-slate-500 text-sm mt-2">Crie seu primeiro agendamento usando o formulário acima</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="a in appointments" :key="a._id" 
            class="bg-slate-700/30 border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-200 group">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">{{ a.title }}</h3>
                  <span class="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                    Agendado
                  </span>
                </div>
                
                <div class="flex items-center space-x-2 text-slate-300 mb-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ formatDate(a.date) }}</span>
                </div>

                <div class="flex items-center space-x-2 text-slate-400 mb-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{{ a.address?.city }}, {{ a.address?.street }}</span>
                </div>

                <div v-if="a.weatherForecast" 
                  class="flex items-center space-x-2 text-blue-300 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                  </svg>
                  <span>{{ a.weatherForecast.description || a.weatherForecast.forecastFor }}</span>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <button @click="view(a._id)" 
                  class="px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200 flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <span>Ver</span>
                </button>
                <button @click="remove(a._id)" 
                  class="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span>Excluir</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Paginação -->
        <div v-if="appointments.length > 0" 
          class="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
          <div class="text-slate-400">
            Mostrando página {{ meta.page }} de {{ totalPages }} ({{ total }} total)
          </div>
          <div class="flex items-center space-x-2">
            <button @click="prevPage" 
              :disabled="meta.page <= 1"
              :class="[
                'px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2',
                meta.page <= 1 
                  ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' 
                  : 'bg-slate-600 hover:bg-slate-500 text-white'
              ]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>Anterior</span>
            </button>
            <button @click="nextPage" 
              :disabled="meta.page >= totalPages"
              :class="[
                'px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2',
                meta.page >= totalPages 
                  ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' 
                  : 'bg-slate-600 hover:bg-slate-500 text-white'
              ]">
              <span>Próxima</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  title: '',
  description: '',
  date: '',
  address: {
    cep: '',
    street: '',
    city: '',
    neighborhood: '',
    state: '',
    number: ''
  }
});

const appointments = ref([]);
const meta = ref({ page: 1, limit: 10 });
const total = ref(0);
const q = ref('');

const storedUser = localStorage.getItem('user');
let user = null;
if (storedUser && storedUser !== 'undefined') {
  try {
    user = JSON.parse(storedUser);
  } catch (e) {
    console.error("Erro ao parsear user do localStorage:", e);
  }
}
const isAdmin = user?.role === 'admin';

const load = async (page = 1) => {
  try {
    const res = await api.get('/appointments', { params: { page, limit: meta.value.limit, q: q.value } });
    meta.value.page = res.data.meta.page;
    meta.value.limit = res.data.meta.limit;
    total.value = res.data.meta.total;
    appointments.value = res.data.data;
  } catch (err) {
    console.error('Erro ao carregar agendamentos:', err);
  }
};

const create = async () => {
  if (!form.value.title?.trim()) {
    alert('O título é obrigatório');
    return;
  }

  const payload = {
    title: form.value.title,
    description: form.value.description || '',
    date: form.value.date ? new Date(form.value.date).toISOString() : null,
    address: {
      cep: form.value.address.cep || '',
      street: form.value.address.street || '',
      number: form.value.address.number || '',
      city: form.value.address.city || '',
      neighborhood: form.value.address.neighborhood || '',
      state: form.value.address.state || ''
    }
  };

  console.log('Enviando payload:', payload);

  try {
    const res = await api.post('/appointments', payload);
    console.log('Resposta do backend:', res.data);
    alert('Agendamento criado com sucesso');
    // Reset do formulário
    form.value = {
      title: '',
      description: '',
      date: '',
      address: { cep: '', street: '', city: '', neighborhood: '', state: '', number: '' }
    };
    await load();
  } catch (err) {
    console.error('Erro ao criar agendamento:', err);
    alert(err?.response?.data?.message || 'Erro ao criar agendamento');
  }
};

const lookupCep = async () => {
  try {
    if (!form.value.address.cep) return;

    const cepCleaned = form.value.address.cep.replace(/\D/g, '');
    const res = await api.get(`/cep/${cepCleaned}`);

    if (res.data) {
      form.value.address.street = res.data.street || form.value.address.street;
      form.value.address.city = res.data.city || form.value.address.city;
      form.value.address.neighborhood = res.data.neighborhood || form.value.address.neighborhood;
      form.value.address.state = res.data.state || form.value.address.state;
    }
  } catch (err) {
    console.warn('Falha ao buscar CEP:', err);
  }
};

const view = id => { router.push('/'); }; 
const remove = async (id) => {
  if (!confirm('Confirma exclusão?')) return;
  try {
    await api.delete(`/appointments/${id}`);
    await load(meta.value.page);
  } catch (err) {
    alert('Erro ao excluir');
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};

onMounted(() => load());

const formatDate = d => new Date(d).toLocaleString();
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / meta.value.limit)));
const nextPage = () => { if (meta.value.page < totalPages.value) load(meta.value.page + 1); };
const prevPage = () => { if (meta.value.page > 1) load(meta.value.page - 1); };
</script>