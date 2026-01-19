import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, XCircle } from "lucide-react";

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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#2d5f3f] via-[#3a7a4f] to-[#2d5f3f] animate-in fade-in flex flex-col min-h-screen overflow-hidden">
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
                <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-xl p-5 mb-6 w-full text-center shadow-sm">
                  <p className="text-sm md:text-base font-bold text-white mb-3">
                    Ya puedes usar PICHANGON
                  </p>
                  <ul className="text-sm text-white/90 space-y-2">
                    <li>Abre la app en tu teléfono para iniciar sesión</li>
                    <li>O descárgala si aún no la tienes</li>
                  </ul>
                </div>

                {/* Botón */}
                <div className="w-full">
                  <Button
                    onClick={handleClose}
                    size="lg"
                    className="w-full bg-white/20 text-white hover:bg-white hover:text-[#2d5f3f] font-semibold border-2 border-white transition-all"
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
                <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400/40 rounded-xl p-5 mb-6 w-full text-center shadow-sm">
                  <p className="text-sm md:text-base font-bold text-white mb-3">
                    Posibles causas:
                  </p>
                  <ul className="text-sm text-white/90 space-y-2">
                    <li>El enlace ya fue utilizado</li>
                    <li>El enlace ha expirado (válido por 24 horas)</li>
                    <li>El enlace está dañado o incompleto</li>
                  </ul>
                </div>

                {/* Botón */}
                <div className="w-full">
                  <Button
                    onClick={handleClose}
                    size="lg"
                    className="w-full bg-white/20 text-white hover:bg-white hover:text-[#2d5f3f] font-semibold border-2 border-white transition-all"
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
      <div className="relative z-20 py-4 md:py-6 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 text-xs md:text-sm">
            © 2025 PICHANGON. Plataforma digital para fútbol amateur en Perú.  
            Pichangón es una plataforma operada bajo la marca PICHANGÓN DEL BARRIO.
          </p>
        </div>
      </div>
    </div>
  );
}