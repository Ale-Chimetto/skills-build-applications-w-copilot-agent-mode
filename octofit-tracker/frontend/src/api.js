const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const codespacesApiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : null

export const apiBaseUrl = codespacesApiBaseUrl
  ? `${codespacesApiBaseUrl}/api`
  : 'http://localhost:8000/api'

function resolveEndpoint(endpoint) {
  if (import.meta.env.DEV) {
    return endpoint
  }

  const apiHost = codespacesApiBaseUrl ?? 'http://localhost:8000'

  return `${apiHost}${endpoint}`
}

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
  const response = await fetch(resolveEndpoint(endpoint))

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollection(payload, key)
}
