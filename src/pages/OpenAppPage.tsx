// src/pages/OpenAppPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export function OpenAppPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ INTENTAR ABRIR LA APP INMEDIATAMENTE
    window.location.href = "pichangon://";
  }, []);

  const detectOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(userAgent)) return "ios";
    if (/android/i.test(userAgent)) return "android";
    return "other";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] to-[#051108] flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img
            src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
            alt="PICHANGON"
            className="w-10 h-10"
          />
          <span className="text-white text-xl font-bold">PICHANGON</span>
        </div>

        <Card className="card-dark p-8 text-center">
          <div className="text-6xl mb-4">⚽</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            ¡Bienvenido a PICHANGON!
          </h2>
          <p className="text-white/70 text-sm mb-6">
            Si la app no se abrió automáticamente, descárgala aquí:
          </p>

          <div className="space-y-3">
            {(detectOS() === "ios" || detectOS() === "other") && (
              <Button
                onClick={() =>
                  window.open(
                    "https://apps.apple.com/es/app/pichangon/id6755395709",
                    "_blank"
                  )
                }
                className="w-full bg-black hover:bg-black/90 text-white"
              >
                🍎 Descargar en App Store
              </Button>
            )}

            {(detectOS() === "android" || detectOS() === "other") && (
              <Button
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.pichangon.app",
                    "_blank"
                  )
                }
                className="w-full bg-pichangon-accent hover:bg-pichangon-accent/90 text-white"
              >
                🤖 Descargar en Google Play
              </Button>
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 text-white/50 hover:text-white/80 text-sm underline"
          >
            Ir al sitio web
          </button>
        </Card>
      </div>
    </div>
  );
}