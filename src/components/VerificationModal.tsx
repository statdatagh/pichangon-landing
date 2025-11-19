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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#2d5f3f] via-[#3a7a4f] to-[#2d5f3f] animate-in fade-in">
      {/* Patrón de fondo igual a la landing */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCAxNGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Logo Header - igual a la landing */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <img 
              src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
              alt="PICHANGON Logo"
              className="w-full h-full object-contain drop-shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="text-white text-xl md:text-2xl font-bold">PICHANGON</span>
        </div>

        {/* Card del modal */}
        <Card className="relative max-w-lg w-full p-8 md:p-12 bg-white/10 backdrop-blur-xl border-2 border-white/30 animate-in zoom-in-95 duration-300 shadow-2xl">
          {status === "success" ? (
            <>
              {/* ✅ ÉXITO */}
              <div className="flex flex-col items-center text-center">
                {/* Ícono con animación */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#2d5f3f] to-[#3a7a4f] flex items-center justify-center mb-6 animate-in zoom-in duration-500 shadow-lg">
                  <CheckCircle className="w-14 h-14 md:w-16 md:h-16 text-white" />
                </div>

                {/* Título */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  ¡Email verificado{name ? `, ${decodeURIComponent(name)}` : ""}!
                </h2>

                {/* Descripción */}
                <p className="text-white/90 text-lg mb-6">
                  Tu cuenta ha sido verificada exitosamente.
                </p>

                {/* Info box - con estilos de la landing */}
                <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-xl p-6 mb-8 w-full text-left shadow-sm">
                  <p className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    🎉 Ya puedes usar PICHANGON
                  </p>
                  <ul className="text-sm text-white/90 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-white font-bold">📱</span>
                      <span>Abre la app en tu teléfono para iniciar sesión</span>
                    </li>
                  </ul>
                </div>

                {/* Botones - con estilos de la landing */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
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
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6 animate-in zoom-in duration-500 shadow-lg">
                  <XCircle className="w-14 h-14 md:w-16 md:h-16 text-white" />
                </div>

                {/* Título */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Error de verificación
                </h2>

                {/* Descripción */}
                <p className="text-white/90 text-lg mb-6">
                  {reason === "invalid-token"
                    ? "El enlace de verificación es inválido o ya expiró. Los enlaces expiran después de 24 horas."
                    : reason === "no-token"
                    ? "El enlace de verificación está incompleto. Por favor, copia el enlace completo del email."
                    : reason === "server-error"
                    ? "Error del servidor. Por favor, intenta nuevamente en unos minutos."
                    : "Hubo un problema verificando tu email."}
                </p>

                {/* Info box de error */}
                <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400/40 rounded-xl p-6 mb-8 w-full text-left shadow-sm">
                  <p className="text-base font-bold text-white mb-3">
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
                      // Scroll a la sección de soporte
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

        {/* Footer - igual a la landing */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-white/60 text-sm">
            © 2025 PICHANGON. La plataforma definitiva para el fútbol amateur en Perú.
          </p>
        </div>
      </div>
    </div>
  );
}