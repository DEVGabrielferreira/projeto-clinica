<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">Bem-vindo</h2>
          <p class="text-slate-300">Entre na sua conta para continuar</p>
        </div>

        <!-- Alertas -->
        <div v-if="errorMessage" class="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200">
          {{ successMessage }}
        </div>

        <form @submit.prevent="submit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <div class="relative">
              <input 
                v-model="email" 
                type="email" 
                required 
                class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">Senha</label>
            <div class="relative">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                required 
                class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
              />
              <svg @click="showPassword = !showPassword" class="absolute right-3 top-3.5 w-5 h-5 text-slate-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>

          <button 
            :disabled="loading"
            class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Processando...</span>
            <span v-else>Entrar</span>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-slate-300">
            Ainda não tem conta? 
            <router-link to="/register" class="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200">
              Registre-se
            </router-link>
          </p>
        </div>

        <!-- Painel de Debug -->
        <div class="mt-8 pt-6 border-t border-slate-700/50">
          <button 
            @click="showDebug = !showDebug" 
            class="text-slate-400 hover:text-slate-300 text-sm flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            Informações de Debug
          </button>
          
          <transition name="fade">
            <div v-if="showDebug" class="debug-panel mt-4 p-4 bg-slate-800/50 rounded-xl text-slate-300 text-sm">
              <p class="font-medium mb-2">Dados de teste:</p>
              <p>Email: admin@local.com</p>
              <p>Senha: admin123</p>
              
              <p class="font-medium mt-4 mb-2">Problemas comuns:</p>
              <ul class="list-disc list-inside space-y-1">
                <li>Verifique se o backend está rodando</li>
                <li>Confirme a URL da API no serviço axios</li>
                <li>Verifique as credenciais do banco de dados</li>
                <li>Confirme se o usuário admin foi criado</li>
              </ul>
              
              <div class="mt-4">
                <button @click="simulateSuccess" class="text-xs mr-2 px-2 py-1 bg-green-700/50 hover:bg-green-600/50 rounded">Simular Sucesso</button>
                <button @click="simulateError" class="text-xs px-2 py-1 bg-red-700/50 hover:bg-red-600/50 rounded">Simular Erro</button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'Login',
  data() {
    return {
      email: 'admin@local.com',
      password: 'admin123',
      errorMessage: '',
      successMessage: '',
      loading: false,
      showPassword: false,
      showDebug: false,
    };
  },
  methods: {
    async submit() {
      this.errorMessage = '';
      this.successMessage = '';
      this.loading = true;

      try {
        const res = await api.post('/auth/login', { 
          email: this.email, 
          password: this.password 
        });

        localStorage.setItem('token', res.data?.token || '');
        localStorage.setItem('user', JSON.stringify(res.data?.user || null));

        this.successMessage = 'Login realizado com sucesso! Redirecionando...';

        setTimeout(() => {
          if (res.data?.user?.role === 'admin') {
            this.$router.push('/admin');
          } else {
            this.$router.push('/');
          }
        }, 1000);

      } catch (err) {
        console.error(err);
        this.errorMessage = err?.response?.data?.message || 'Erro desconhecido ao fazer login';
      } finally {
        this.loading = false;
      }
    },
    simulateSuccess() {
      this.errorMessage = '';
      this.successMessage = 'Simulação: Login realizado com sucesso!';
    },
    simulateError() {
      this.successMessage = '';
      this.errorMessage = 'Simulação: Credenciais inválidas. Verifique seu email e senha.';
    },
  },
};
</script>

<style scoped>
.debug-panel {
  transition: all 0.3s ease;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
