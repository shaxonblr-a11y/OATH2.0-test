<template>
  <div class="auth-page">
    <RouterLink to="/" class="base-link">На главную</RouterLink>
    <div class="container">
      <h1 class="loading-text" v-if="!userName && !message">Обработка авторизации...</h1>
      <div v-if="message" class="message">{{ message }}</div>
      <div v-if="userName" class="welcome">
        Добро пожаловать, <strong>{{ userName }}</strong>!
      </div>
      <img v-if="picUrl" :src="picUrl" class="avatar" alt="Аватар пользователя" />

      <div v-if="fileNames.length" class="files">
        <h2>Ваши файлы в Google Drive:</h2>
        <ul>
          <li v-for="file in fileNames" :key="file">{{ file }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { exchangeCodeForToken } from '../services/api.js'

export default {
  components: { RouterLink },
  data() {
    return {
      message: '',
      userName: '',
      picUrl: '',
      accessToken: '',
      fileNames: [],
    }
  },
  async mounted() {
    const queryParams = new URLSearchParams(window.location.search)
    const code = queryParams.get('code')

    if (!code) {
      this.message = 'Нет параметра code в URL. Попробуйте войти снова.'
      return
    }

    try {
      // Обмениваем code на access_token через бэкенд
      const tokenData = await exchangeCodeForToken(code)
      const access_token = tokenData.access_token
      this.accessToken = access_token

      // Получаем информацию о пользователе
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
      })

      if (!userResponse.ok) {
        throw new Error('Не удалось получить данные пользователя')
      }

      const userInfo = await userResponse.json()
      this.userName = userInfo.name
      this.picUrl = userInfo.picture

      // Получаем список файлов из Google Drive
      const filesResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
        headers: { Authorization: `Bearer ${access_token}` },
      })

      if (filesResponse.ok) {
        const filesData = await filesResponse.json()
        this.fileNames = filesData.files?.map(f => f.name) || []
      }
    } catch (err) {
      console.error('OAuth error:', err)
      this.message = `Ошибка: ${err.message}`
    }
  },
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f0f4ff, #e0f7fa);
  font-family: 'Inter', sans-serif;
  padding: 2rem;
}

.base-link {
  align-self: flex-start;
  margin-bottom: 1.5rem;
  color: #4285F4;
  text-decoration: none;
  font-weight: 500;
}

.base-link:hover {
  text-decoration: underline;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.loading-text {
  color: #4285F4;
  font-size: 1.25rem;
}

.message {
  color: #EA4335;
  background: #fef2f2;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #fecaca;
  text-align: center;
}

.welcome {
  font-size: 1.5rem;
  color: #1a1a2e;
  text-align: center;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 3px solid #4285F4;
  object-fit: cover;
}

.files h2 {
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 0.75rem;
}

.files ul {
  list-style: none;
  width: 100%;
}

.files li {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #4b5563;
}
</style>