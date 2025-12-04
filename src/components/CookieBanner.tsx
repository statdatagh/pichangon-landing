import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, Cookie, Settings } from "lucide-react";
import {
  hasGivenConsent,
  acceptAllCookies,
  acceptEssentialOnly,
  acceptCustomCookies,
  CookiePreferences,
} from "../utils/cookieConsent";
import { useNavigate } from "react-router-dom";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Mostrar banner solo si no ha dado consentimiento
    if (!hasGivenConsent()) {
      // Pequeño delay para mejor UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setIsVisible(false);
    // Recargar para activar analytics
    window.location.reload();
  };

  const handleRejectAll = () => {
    acceptEssentialOnly();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    acceptCustomCookies(preferences);
    setIsVisible(false);
    // Recargar si aceptó analytics
    if (preferences.analytics) {
      window.location.reload();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay oscuro cuando está en modo configuración */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Banner principal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="bg-pichangon-dark-card border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl">
            {!showSettings ? (
              // Vista simple
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  {/* Icono y texto */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <Cookie className="w-6 h-6 text-pichangon-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">
                          🍪 Usamos cookies para mejorar tu experiencia
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                          Utilizamos cookies propias y de terceros para analizar el uso de la web 
                          y mejorar nuestros servicios. Puedes aceptar todas las cookies, rechazarlas 
                          o configurar tus preferencias.{" "}
                          <button
                            onClick={() => navigate("/cookies")}
                            className="text-pichangon-accent hover:text-pichangon-accent/80 underline"
                          >
                            Más información
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                      variant="outline"
                      onClick={() => setShowSettings(true)}
                      className="border-white/20 text-white hover:bg-white/10 gap-2 whitespace-nowrap"
                    >
                      <Settings className="w-4 h-4" />
                      Configurar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRejectAll}
                      className="border-white/20 text-white hover:bg-white/10 whitespace-nowrap"
                    >
                      Solo esenciales
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-pichangon-accent hover:bg-pichangon-accent/90 text-white whitespace-nowrap"
                    >
                      Aceptar todas
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Vista de configuración
              <div className="p-6 md:p-8 relative">
                {/* Botón cerrar */}
                <button
                  onClick={() => setShowSettings(false)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-white font-bold text-xl mb-6">
                  Configuración de Cookies
                </h3>

                <div className="space-y-4 mb-6">
                  {/* Cookies necesarias */}
                  <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-white font-semibold">Cookies Necesarias</h4>
                        <span className="text-xs bg-pichangon-accent/20 text-pichangon-accent px-2 py-1 rounded">
                          Siempre activas
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">
                        Estas cookies son esenciales para el funcionamiento de la web 
                        (autenticación, preferencias básicas). No se pueden desactivar.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="w-12 h-6 bg-pichangon-accent rounded-full flex items-center px-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                  </div>

                  {/* Cookies analíticas */}
                  <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">Cookies Analíticas</h4>
                      <p className="text-white/70 text-sm">
                        Nos ayudan a entender cómo los usuarios interactúan con la web 
                        mediante Google Analytics. Todos los datos son anónimos.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() =>
                          setPreferences({ ...preferences, analytics: !preferences.analytics })
                        }
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.analytics ? "bg-pichangon-accent" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            preferences.analytics ? "translate-x-6" : ""
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>

                  {/* Cookies de marketing */}
                  <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">Cookies de Marketing</h4>
                      <p className="text-white/70 text-sm">
                        Utilizadas para mostrarte publicidad relevante. Actualmente no las usamos, 
                        pero podrían activarse en el futuro.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() =>
                          setPreferences({ ...preferences, marketing: !preferences.marketing })
                        }
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.marketing ? "bg-pichangon-accent" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            preferences.marketing ? "translate-x-6" : ""
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    className="border-white/20 text-white hover:bg-white/10 flex-1"
                  >
                    Rechazar todas
                  </Button>
                  <Button
                    onClick={handleSavePreferences}
                    className="bg-pichangon-accent hover:bg-pichangon-accent/90 text-white flex-1"
                  >
                    Guardar preferencias
                  </Button>
                </div>

                <p className="text-white/50 text-xs text-center mt-4">
                  Puedes cambiar tus preferencias en cualquier momento desde nuestra{" "}
                  <button
                    onClick={() => navigate("/cookies")}
                    className="text-pichangon-accent hover:text-pichangon-accent/80 underline"
                  >
                    Política de Cookies
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}