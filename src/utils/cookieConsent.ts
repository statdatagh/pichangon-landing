// Utility para gestionar el consentimiento de cookies

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = 'pichangon_cookie_consent';

/**
 * Obtiene las preferencias de cookies guardadas
 */
export function getCookiePreferences(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Guarda las preferencias de cookies
 */
export function saveCookiePreferences(preferences: CookiePreferences): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
}

/**
 * Verifica si el usuario ya dio su consentimiento
 */
export function hasGivenConsent(): boolean {
  return getCookiePreferences() !== null;
}

/**
 * Acepta todas las cookies
 */
export function acceptAllCookies(): void {
  const preferences: CookiePreferences = {
    necessary: true,
    analytics: true,
    marketing: true,
  };
  saveCookiePreferences(preferences);
  initializeAnalytics(preferences);
}

/**
 * Acepta solo cookies esenciales
 */
export function acceptEssentialOnly(): void {
  const preferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
  };
  saveCookiePreferences(preferences);
}

/**
 * Acepta cookies personalizadas
 */
export function acceptCustomCookies(preferences: CookiePreferences): void {
  saveCookiePreferences(preferences);
  initializeAnalytics(preferences);
}

/**
 * Rechaza todas las cookies (excepto las necesarias)
 */
export function rejectAllCookies(): void {
  acceptEssentialOnly();
}

/**
 * Borra el consentimiento (para testing)
 */
export function clearCookieConsent(): void {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}

/**
 * Inicializa Google Analytics si el usuario aceptó
 */
export function initializeAnalytics(preferences: CookiePreferences): void {
  if (!preferences.analytics) {
    // Si no acepta analytics, no hacer nada
    return;
  }

  // Tu Measurement ID de Google Analytics
  const GA_MEASUREMENT_ID = 'G-Q6SMY3WGM2';

  // Verificar si ya está cargado
  if ((window as any).gtag) {
    console.log('Google Analytics ya está inicializado');
    return;
  }

  // Cargar Google Analytics dinámicamente
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Inicializar gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true, // Anonimiza IPs para GDPR
    cookie_flags: 'SameSite=None;Secure', // Configuración segura
  });

  // Hacer gtag disponible globalmente
  (window as any).gtag = gtag;

  console.log('Google Analytics inicializado con ID:', GA_MEASUREMENT_ID);
}

/**
 * Inicializa el tracking basado en preferencias guardadas
 */
export function initializeTracking(): void {
  const preferences = getCookiePreferences();
  if (preferences && preferences.analytics) {
    initializeAnalytics(preferences);
  }
}

// Tipos para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}