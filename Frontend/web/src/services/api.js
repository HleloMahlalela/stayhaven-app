const API_BASE_URL = 'http://localhost:4000/api/v1'

const api = {
  async post(path, body) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data.message || data.error || `Request failed (${response.status})`)
    }

    return { data }
  },
}

export default api
