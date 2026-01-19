// App.tsx
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { 
  Search,
  CalendarCheck,
  Users,
  Download,
  HelpCircle,
  Moon,
  Sun,
  Apple,
  Play
} from "lucide-react";
import { SupportSection } from "./components/SupportSection";
import { VerificationModal } from "./components/VerificationModal";
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { FAQ } from "./components/FAQ";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { CookieBanner } from "./components/CookieBanner";
import { CookiePolicy } from "./components/CookiePolicy";
import { initializeTracking } from "./utils/cookieConsent";
import { useState, useEffect } from "react";
import { useTheme } from "./components/theme-provider";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

export default function App() {
  const { theme, setTheme } = useTheme();
  
  const [verificationStatus, setVerificationStatus] = useState<{
    status: "success" | "error" | null;
    email?: string;
    name?: string;
    reason?: string;
  }>({
    status: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verification = params.get("verification");
    const email = params.get("email");
    const name = params.get("name");
    const reason = params.get("reason");

    if (verification === "success" || verification === "error") {
      setVerificationStatus({
        status: verification as "success" | "error",
        email: email || undefined,
        name: name || undefined,
        reason: reason || undefined,
      });

      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 3000);
    }

    initializeTracking();
  }, []);

  const handleCloseVerification = () => {
    setVerificationStatus({ status: null });
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  if (verificationStatus.status) {
    return (
      <VerificationModal
        status={verificationStatus.status}
        email={verificationStatus.email}
        name={verificationStatus.name}
        reason={verificationStatus.reason}
        onClose={handleCloseVerification}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] via-60% to-[#051108]">
      <Navbar theme={theme} setTheme={setTheme} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/support" element={<SupportSection />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>

      <CookieBanner />
    </div>
  );
}

function Navbar({ theme, setTheme }: { theme: string; setTheme: (theme: "dark" | "light") => void }) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
                alt="Pichangón logo"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <span className="text-white text-lg md:text-xl font-bold">Pichangón</span>
          </Link>
          
          <div className="flex gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              Inicio
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 gap-1"
              onClick={() => navigate("/support")}
            >
              <HelpCircle className="w-4 h-4" />
              Soporte
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:bg-white/10"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative overflow-hidden py-12 md:py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">

            {/* Badge superior */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pichangon-accent/20 border border-pichangon-accent/30">
                <span className="w-2 h-2 rounded-full bg-pichangon-accent animate-pulse"></span>
                <span className="text-white text-sm font-medium">
                  La app para organizar fútbol amateur en Perú
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block text-white">Pelotea.</span>
                  <span className="block bg-gradient-to-r from-pichangon-accent to-green-400 bg-clip-text text-transparent">
                    Donde quieras.
                  </span>
                  <span className="block bg-gradient-to-r from-pichangon-accent to-green-400 bg-clip-text text-transparent">
                    Cuando quieras.
                  </span>
                </h1>
                
                <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Encuentra pichangas cerca de ti, únete a una comunidad futbolera
                  y vive cada partido como si fuera una final.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 gap-2 font-semibold">
                    <Apple className="w-5 h-5" />
                    App Store
                  </Button>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 gap-2 font-semibold">
                    <Play className="w-5 h-5" />
                    Google Play
                  </Button>
                </div>
              </div>

              {/* Mockups sin cambios */}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ¿Listo para jugar?
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
            Descarga Pichangón y forma parte de la comunidad de fútbol amateur.
          </p>
          <Button size="lg" className="bg-pichangon-accent text-white gap-2">
            <Download className="w-5 h-5" />
            Descargar ahora
          </Button>
        </div>
      </div>

      <FAQ />

      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-2">
            <button onClick={() => navigate("/privacy")} className="text-pichangon-accent text-sm underline">
              Política de Privacidad
            </button>
            <button onClick={() => navigate("/terms")} className="text-pichangon-accent text-sm underline">
              Términos y Condiciones
            </button>
            <button onClick={() => navigate("/cookies")} className="text-pichangon-accent text-sm underline">
              Política de Cookies
            </button>
          </div>

          <p className="text-white/60 text-sm">
            © 2025 Pichangón. Plataforma digital para la organización de fútbol amateur en Perú.
          </p>

          <p className="text-white/40 text-xs mt-2">
            Pichangón es operado bajo la marca registrada PICHANGÓN DEL BARRIO.
          </p>
        </div>
      </footer>
    </>
  );
}