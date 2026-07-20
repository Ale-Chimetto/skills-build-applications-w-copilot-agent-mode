const codespaceName = import.meta.env.VITE_CODESPACE_NAME

const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiHost}/api`

export function normalizeCollection(payload, key) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[key])) {
    return payload[key]
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

export async function fetchCollection(endpoint, key) {
  const response = await fetch(`${apiHost}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollection(payload, key)
}
