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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <Card className="relative max-w-md w-full p-8 bg-white dark:bg-gray-900 animate-in zoom-in-95 duration-300">
        {status === "success" ? (
          <>
            {/* Éxito */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-500" />
              </div>

              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                ¡Email verificado{name ? `, ${decodeURIComponent(name)}` : ""}!
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Tu cuenta ha sido verificada exitosamente.
              </p>

              <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 w-full text-left">
                <p className="text-sm font-semibold text-green-900 dark:text-green-400 mb-2">
                  🎉 Ya puedes usar PICHANGON:
                </p>
                <ul className="text-sm text-green-800 dark:text-green-500 space-y-1">
                  <li>📱 Abre la app en tu teléfono para iniciar sesión</li>
                  <li>💻 O descárgala si aún no la tienes</li>
                </ul>
              </div>

              <div className="flex gap-3 w-full">
                <Button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    handleClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-[#2d5f3f] to-[#3a7a4f] hover:opacity-90"
                >
                  📥 Descargar App
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Error */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <XCircle className="w-12 h-12 text-red-600 dark:text-red-500" />
              </div>

              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                Error de verificación
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {reason === "invalid-token"
                  ? "El enlace de verificación es inválido o ya expiró. Los enlaces expiran después de 24 horas."
                  : reason === "no-token"
                  ? "El enlace de verificación está incompleto. Por favor, copia el enlace completo del email."
                  : reason === "server-error"
                  ? "Error del servidor. Por favor, intenta nuevamente en unos minutos."
                  : "Hubo un problema verificando tu email."}
              </p>

              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 w-full text-left">
                <p className="text-sm font-semibold text-red-900 dark:text-red-400 mb-2">
                  Posibles causas:
                </p>
                <ul className="text-sm text-red-800 dark:text-red-500 space-y-1">
                  <li>• El enlace ya fue utilizado</li>
                  <li>• El enlace ha expirado (válido por 24 horas)</li>
                  <li>• El enlace está dañado o incompleto</li>
                </ul>
              </div>

              <div className="flex gap-3 w-full">
                <Button
                  onClick={() => {
                    // Scroll a la sección de soporte
                    const supportButton = document.querySelector('[data-support-button]');
                    if (supportButton) {
                      (supportButton as HTMLElement).click();
                    }
                    handleClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-[#2d5f3f] to-[#3a7a4f] hover:opacity-90"
                >
                  📧 Contactar Soporte
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}