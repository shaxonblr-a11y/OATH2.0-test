const API_BASE_URL = 'http://localhost:8001'

export async function getGoogleOAuthUrl() {
  const response = await fetch(`${API_BASE_URL}/auth/google/url`)
  if (!response.ok) {
    throw new Error('Failed to get Google OAuth URL')
  }
  const data = await response.json()
  return data.url
}

export async function exchangeCodeForToken(code) {
  const response = await fetch(`${API_BASE_URL}/auth/google/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || 'Failed to exchange code for token')
  }
  return response.json()
}

export function redirectToGoogleOAuth() {
  return getGoogleOAuthUrl().then(url => {
    window.location.href = url
  }).catch(error => {
    console.error('OAuth redirect failed:', error)
    alert('Ошибка при получении URL для входа через Google. Проверьте, что бэкенд запущен на порту 8001.')
  })
}