import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { clearCookieConsent } from "../utils/cookieConsent";

export function CookiePolicy() {
  const navigate = useNavigate();

  const handleResetConsent = () => {
    clearCookieConsent();
    window.location.reload();
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Política de Cookies
          </h1>
          <p className="text-white/60">
            Última actualización: 27 de noviembre de 2025
          </p>
        </div>

        {/* Intro */}
        <div className="bg-pichangon-dark-card rounded-2xl p-8 mb-8 border border-white/10">
          <p className="text-white/80 leading-relaxed mb-4">
            En <span className="text-pichangon-accent font-semibold">PICHANGON</span>, utilizamos cookies 
            y tecnologías similares para mejorar tu experiencia en nuestra web, analizar el tráfico y 
            personalizar el contenido.
          </p>
          <p className="text-white/80 leading-relaxed">
            Esta Política de Cookies explica qué son las cookies, qué tipos utilizamos, cómo las usamos 
            y cómo puedes controlarlas.
          </p>
        </div>

        {/* ¿Qué son las cookies? */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            ¿Qué son las cookies?
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, 
              tablet o móvil) cuando visitas un sitio web. Las cookies permiten que el sitio web recuerde 
              tus acciones y preferencias durante un período de tiempo.
            </p>
            <p className="text-white/80 leading-relaxed">
              No contienen ningún tipo de información personal que pueda identificarte directamente, 
              pero se utilizan para proporcionar una experiencia más personalizada y mejorar nuestros servicios.
            </p>
          </div>
        </section>

        {/* Tipos de cookies que utilizamos */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Tipos de cookies que utilizamos
          </h2>
          <div className="space-y-4">
            {/* Cookies necesarias */}
            <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-pichangon-accent mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    1. Cookies Estrictamente Necesarias
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                    Son esenciales para que la web funcione correctamente. No se pueden desactivar.
                  </p>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/80 text-sm mb-2 font-semibold">Ejemplos de uso:</p>
                    <ul className="space-y-2">
                      <li className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-pichangon-accent">→</span>
                        <span>Mantener tu sesión activa mientras navegas</span>
                      </li>
                      <li className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-pichangon-accent">→</span>
                        <span>Recordar tus preferencias de privacidad y cookies</span>
                      </li>
                      <li className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-pichangon-accent">→</span>
                        <span>Funciones de seguridad básicas</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-white/60 text-xs mt-3">
                    <span className="font-semibold">Duración:</span> Sesión o hasta 1 año
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies analíticas */}
            <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    2. Cookies Analíticas
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                    Nos ayudan a entender cómo los visitantes interactúan con nuestra web, 
                    recopilando información de forma anónima.
                  </p>
                  <div className="bg-white/5 rounded-lg p-4 mb-3">
                    <p className="text-white/80 text-sm mb-2 font-semibold">Servicios utilizados:</p>
                    <ul className="space-y-2">
                      <li className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-blue-400">→</span>
                        <div>
                          <span className="font-semibold text-white">Google Analytics</span> - 
                          Analiza el tráfico y comportamiento de usuarios
                        </div>
                      </li>
                      <li className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-blue-400">→</span>
                        <div>
                          <span className="font-semibold text-white">Firebase Analytics</span> - 
                          Estadísticas de uso de la aplicación móvil
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/80 text-sm mb-2 font-semibold">Información recopilada:</p>
                    <ul className="space-y-2">
                      <li className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-blue-400">→</span>
                        <span>Páginas visitadas y tiempo de permanencia</span>
                      </li>
                      <li className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-blue-400">→</span>
                        <span>Navegador y dispositivo utilizado</span>
                      </li>
                      <li className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-blue-400">→</span>
                        <span>Fuente de tráfico (cómo llegaste a nuestra web)</span>
                      </li>
                      <li className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-blue-400">→</span>
                        <span>Dirección IP anonimizada (no permite identificarte)</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-white/60 text-xs mt-3">
                    <span className="font-semibold">Duración:</span> Hasta 2 años
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies de marketing */}
            <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    3. Cookies de Marketing
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                    Actualmente <span className="text-pichangon-accent font-semibold">no utilizamos cookies de marketing</span>, 
                    pero podrían implementarse en el futuro para mostrarte publicidad relevante.
                  </p>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70 text-sm">
                      Si decidimos implementar cookies de marketing en el futuro, te notificaremos 
                      y actualizaremos esta política. Siempre podrás desactivarlas desde tus preferencias.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabla de cookies específicas */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Cookies específicas que utilizamos
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/80 font-semibold py-3 px-2">Cookie</th>
                  <th className="text-left text-white/80 font-semibold py-3 px-2">Tipo</th>
                  <th className="text-left text-white/80 font-semibold py-3 px-2">Propósito</th>
                  <th className="text-left text-white/80 font-semibold py-3 px-2">Duración</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 font-mono text-xs">pichangon_cookie_consent</td>
                  <td className="py-3 px-2">Necesaria</td>
                  <td className="py-3 px-2">Guarda tus preferencias de cookies</td>
                  <td className="py-3 px-2">1 año</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 font-mono text-xs">_ga</td>
                  <td className="py-3 px-2">Analítica</td>
                  <td className="py-3 px-2">Distingue usuarios únicos (Google Analytics)</td>
                  <td className="py-3 px-2">2 años</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 font-mono text-xs">_ga_*</td>
                  <td className="py-3 px-2">Analítica</td>
                  <td className="py-3 px-2">Mantiene el estado de sesión (Google Analytics 4)</td>
                  <td className="py-3 px-2">2 años</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cómo controlar las cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Cómo controlar y eliminar cookies
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">1. Desde nuestra web</h3>
                <p className="text-white/70 text-sm mb-3 leading-relaxed">
                  Puedes cambiar tus preferencias de cookies en cualquier momento haciendo clic en el 
                  botón de abajo:
                </p>
                <Button
                  onClick={handleResetConsent}
                  className="bg-pichangon-accent hover:bg-pichangon-accent/90 text-white"
                >
                  🍪 Cambiar preferencias de cookies
                </Button>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">2. Desde tu navegador</h3>
                <p className="text-white/70 text-sm mb-3 leading-relaxed">
                  También puedes configurar tu navegador para bloquear o eliminar cookies:
                </p>
                <ul className="space-y-2">
                  <li className="text-white/70 text-sm flex items-start gap-2">
                    <span className="text-pichangon-accent">→</span>
                    <div>
                      <span className="font-semibold text-white">Chrome:</span>{" "}
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pichangon-accent hover:text-pichangon-accent/80 underline"
                      >
                        Instrucciones para Chrome
                      </a>
                    </div>
                  </li>
                  <li className="text-white/70 text-sm flex items-start gap-2">
                    <span className="text-pichangon-accent">→</span>
                    <div>
                      <span className="font-semibold text-white">Firefox:</span>{" "}
                      <a
                        href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pichangon-accent hover:text-pichangon-accent/80 underline"
                      >
                        Instrucciones para Firefox
                      </a>
                    </div>
                  </li>
                  <li className="text-white/70 text-sm flex items-start gap-2">
                    <span className="text-pichangon-accent">→</span>
                    <div>
                      <span className="font-semibold text-white">Safari:</span>{" "}
                      <a
                        href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pichangon-accent hover:text-pichangon-accent/80 underline"
                      >
                        Instrucciones para Safari
                      </a>
                    </div>
                  </li>
                  <li className="text-white/70 text-sm flex items-start gap-2">
                    <span className="text-pichangon-accent">→</span>
                    <div>
                      <span className="font-semibold text-white">Edge:</span>{" "}
                      <a
                        href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pichangon-accent hover:text-pichangon-accent/80 underline"
                      >
                        Instrucciones para Edge
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  <span className="text-yellow-500 font-semibold">⚠️ Importante:</span> Si bloqueas 
                  todas las cookies, algunas funciones de la web podrían no funcionar correctamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Actualizaciones */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Actualizaciones de esta política
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en 
              las cookies que utilizamos o por razones operativas, legales o regulatorias.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Te recomendamos revisar esta página periódicamente para estar informado sobre cómo 
              utilizamos las cookies. La fecha de la última actualización aparece al inicio de este documento.
            </p>
          </div>
        </section>

        {/* Contacto */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Contacto
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Si tienes preguntas sobre esta Política de Cookies o sobre el uso de cookies en nuestra web, 
              contáctanos:
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white/60">📧</span>
              <a
                href="mailto:privacy@pichangon.com"
                className="text-pichangon-accent hover:text-pichangon-accent/80 font-semibold"
              >
                privacy@pichangon.com
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-white/10">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-white/20 text-white hover:bg-white/10 mb-4"
          >
            ← Volver al inicio
          </Button>
          <p className="text-white/60 text-sm">
            © 2025 PICHANGON. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}