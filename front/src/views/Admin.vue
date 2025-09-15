<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">Criar Conta</h2>
          <p class="text-slate-300">Registre-se para começar</p>
        </div>
        
        <form @submit.prevent="submit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">Nome Completo</label>
            <input 
              v-model="name" 
              placeholder="Seu nome completo" 
              required 
              class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <input 
              v-model="email" 
              placeholder="seu@email.com" 
              type="email" 
              required 
              class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">Senha</label>
            <input 
              v-model="password" 
              placeholder="••••••••" 
              type="password" 
              required 
              class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <button class="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
            Criar Conta
          </button>
        </form>
        
        <div class="mt-8 text-center">
          <p class="text-slate-300">
            Já tem conta? 
            <router-link class="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors duration-200" to="/login">
              Entrar
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');

const submit = async () => {
  try {
    const res = await api.post('/auth/register', { name: name.value, email: email.value, password: password.value });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    router.push('/');
  } catch (err) {
    alert(err?.response?.data?.message || 'Erro no registro');
  }
};
</script>