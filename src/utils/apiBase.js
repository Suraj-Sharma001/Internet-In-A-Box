let cached = null;

export async function getApiBase() {
  if (cached) return cached;
  try {
    if (typeof window !== 'undefined' && window.__API_BASE__) {
      cached = String(window.__API_BASE__).replace(/\/$/, '');
      return cached;
    }
    // Try runtime config file
    const resp = await fetch('/config.json', { cache: 'no-cache' });
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.apiBaseUrl) {
        cached = String(data.apiBaseUrl).replace(/\/$/, '');
        return cached;
      }
    }
  } catch {
    // ignore and fallback
  }
  // Build-time env or dev proxy fallback
  const fromEnv = (import.meta?.env?.VITE_API_BASE_URL || '').toString().trim();
  cached = fromEnv ? fromEnv.replace(/\/$/, '') : '/api';
  return cached;
}

export function setApiBase(url) {
  cached = (url || '').replace(/\/$/, '');
}
