<script setup>
import { ref } from 'vue'
import { redirectToGoogleOAuth } from './services/api.js'

const isLoading = ref(false)

const handleGoogleLogin = () => {
  isLoading.value = true
  redirectToGoogleOAuth()
}
</script>

<template>
  <div class="app">
    <main class="main">
      <header class="header">
        <h1 class="greeting">Добро пожаловать!</h1>
        <p class="subtitle">Изучение OAuth 2.0 с Google</p>
      </header>

      <section class="login-section">
        <button
          class="google-btn"
          @click="handleGoogleLogin"
          :disabled="isLoading"
          type="button"
        >
          <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Войти через Google</span>
          <span v-if="isLoading" class="loader" aria-hidden="true"></span>
        </button>

        <p class="hint" v-if="!isLoading">
          Нажмите кнопку, чтобы начать OAuth 2.0 авторизацию через Google
        </p>
        <p class="hint loading" v-else>
          Перенаправление...
        </p>
      </section>

      <footer class="footer">
        <p>Бэкенд: <code>http://localhost:8000</code> | Эндпоинт: <code>GET /auth/google/url</code></p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  padding: 2rem;
}

.main {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 3rem 2.5rem;
  text-align: center;
}

.header {
  margin-bottom: 2.5rem;
}

.greeting {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  font-weight: 400;
}

.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.google-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 300px;
  padding: 0.875rem 1.5rem;
  background: white;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.google-btn:hover:not(:disabled) {
  border-color: #d1d5db;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background: #fafafa;
}

.google-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.google-btn:focus-visible {
  outline: 2px solid #4285F4;
  outline-offset: 2px;
}

.google-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.google-icon {
  flex-shrink: 0;
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid #e5e7eb;
  border-top-color: #4285F4;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hint {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 0.25rem;
}

.hint.loading {
  color: #4285F4;
}

.footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f3f4;
}

.footer p {
  font-size: 0.75rem;
  color: #9ca3af;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.footer code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  color: #4b5563;
}
</style>