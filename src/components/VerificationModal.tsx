import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, XCircle, Download, Mail } from "lucide-react";

interface VerificationModalProps {
  status: "success" | "error" | null;
  email?: string;
  name?: string;
  reason?: string;
  onClose: () => void;
}

export function VerificationModal({
  status,
  name,
  reason,
  onClose,
}: VerificationModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status) {
      setIsVisible(true);
    }
  }, [status]);

  if (!status || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#2d5f3f] via-[#3a7a4f] to-[#2d5f3f] animate-in fade-in flex flex-col">
      {/* Patrón de fondo igual a la landing */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCAxNGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      {/* Logo Header - igual a la landing */}
      <div className="relative z-20 p-4 md:p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <img 
              src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
              alt="PICHANGON Logo"
              className="w-full h-full object-contain drop-shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="text-white text-lg md:text-xl font-bold">PICHANGON</span>
        </div>
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        {/* Card del modal */}
        <Card className="relative max-w-lg w-full p-8 md:p-12 bg-white/10 backdrop-blur-xl border-2 border-white/30 animate-in zoom-in-95 duration-300 shadow-2xl">
          {status === "success" ? (
            <>
              {/* ✅ ÉXITO */}
              <div className="flex flex-col items-center text-center">
                {/* Ícono con animación */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 animate-in zoom-in duration-500 shadow-lg border-2 border-white/30">
                  <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  ¡Email verificado{name ? `, ${decodeURIComponent(name)}` : ""}!
                </h2>

                {/* Descripción */}
                <p className="text-white/90 text-base md:text-lg mb-6">
                  Tu cuenta ha sido verificada exitosamente.
                </p>

                {/* Info box */}
                <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-xl p-5 mb-6 w-full text-left shadow-sm">
                  <p className="text-sm md:text-base font-bold text-white mb-3 flex items-center gap-2">
                    🎉 Ya puedes usar PICHANGON
                  </p>
                  <ul className="text-sm text-white/90 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-white font-bold text-base">📱</span>
                      <span>Abre la app en tu teléfono para iniciar sesión</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white font-bold text-base">💻</span>
                      <span>O descárgala si aún no la tienes</span>
                    </li>
                  </ul>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      handleClose();
                    }}
                    size="lg"
                    className="flex-1 bg-white text-[#2d5f3f] hover:bg-white/90 font-semibold gap-2 shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Descargar App
                  </Button>
                  <Button
                    onClick={handleClose}
                    size="lg"
                    variant="outline"
                    className="flex-1 border-2 border-white/50 text-white hover:bg-white/10"
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* ❌ ERROR */}
              <div className="flex flex-col items-center text-center">
                {/* Ícono con animación */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-500/30 backdrop-blur-sm flex items-center justify-center mb-6 animate-in zoom-in duration-500 shadow-lg border-2 border-red-400/50">
                  <XCircle className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  Error de verificación
                </h2>

                {/* Descripción */}
                <p className="text-white/90 text-base md:text-lg mb-6">
                  {reason === "invalid-token"
                    ? "El enlace de verificación es inválido o ya expiró. Los enlaces expiran después de 24 horas."
                    : reason === "no-token"
                    ? "El enlace de verificación está incompleto. Por favor, copia el enlace completo del email."
                    : reason === "server-error"
                    ? "Error del servidor. Por favor, intenta nuevamente en unos minutos."
                    : "Hubo un problema verificando tu email."}
                </p>

                {/* Info box de error */}
                <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400/40 rounded-xl p-5 mb-6 w-full text-left shadow-sm">
                  <p className="text-sm md:text-base font-bold text-white mb-3">
                    Posibles causas:
                  </p>
                  <ul className="text-sm text-white/90 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>El enlace ya fue utilizado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>El enlace ha expirado (válido por 24 horas)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>El enlace está dañado o incompleto</span>
                    </li>
                  </ul>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button
                    onClick={() => {
                      const supportButton = document.querySelector('[data-support-button]');
                      if (supportButton) {
                        (supportButton as HTMLElement).click();
                      }
                      handleClose();
                    }}
                    size="lg"
                    className="flex-1 bg-white text-[#2d5f3f] hover:bg-white/90 font-semibold gap-2 shadow-lg"
                  >
                    <Mail className="w-5 h-5" />
                    Contactar Soporte
                  </Button>
                  <Button
                    onClick={handleClose}
                    size="lg"
                    variant="outline"
                    className="flex-1 border-2 border-white/50 text-white hover:bg-white/10"
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Footer - igual a la landing */}
      <div className="relative z-20 py-4 md:py-6 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 text-xs md:text-sm">
            © 2025 PICHANGON. La plataforma definitiva para el fútbol amateur en Perú.
          </p>
        </div>
      </div>
    </div>
  );
}