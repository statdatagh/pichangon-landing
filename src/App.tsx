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
import { FAQ } from "./components/FAQ";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { useState, useEffect } from "react";
import { useTheme } from "./components/theme-provider";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

export default function App() {
  const { theme, setTheme } = useTheme();
  
  // ✅ ESTADO PARA VERIFICACIÓN
  const [verificationStatus, setVerificationStatus] = useState<{
    status: "success" | "error" | null;
    email?: string;
    name?: string;
    reason?: string;
  }>({
    status: null,
  });

  // ✅ DETECTAR PARÁMETROS DE VERIFICACIÓN EN LA URL
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
      {/* Navigation */}
      <Navbar theme={theme} setTheme={setTheme} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/support" element={<SupportSection />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

// Navbar Component
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
                alt="PICHANGON Logo"
                className="w-full h-full object-contain drop-shadow-lg"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <span className="text-white text-lg md:text-xl font-bold">PICHANGON</span>
          </Link>
          
          <div className="flex gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 text-sm md:text-base px-3 md:px-4"
              onClick={() => navigate("/")}
            >
              Inicio
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 gap-1 md:gap-2 text-sm md:text-base px-3 md:px-4"
              onClick={() => navigate("/support")}
            >
              <HelpCircle className="w-3 h-3 md:w-4 md:h-4" />
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

// HomePage Component
function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden py-12 md:py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Badge superior */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pichangon-accent/20 border border-pichangon-accent/30">
                <span className="w-2 h-2 rounded-full bg-pichangon-accent animate-pulse"></span>
                <span className="text-white text-sm font-medium">La app #1 para fútbol amateur en Perú</span>
              </div>
            </div>

            {/* Grid principal: Texto a la izquierda, mockups a la derecha */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenido izquierdo */}
              <div className="text-center lg:text-left">
                {/* Título grande */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block text-white">Pichanguea.</span>
                  <span className="block bg-gradient-to-r from-pichangon-accent to-green-400 bg-clip-text text-transparent">
                    Donde quieras.
                  </span>
                  <span className="block bg-gradient-to-r from-pichangon-accent to-green-400 bg-clip-text text-transparent">
                    Cuando quieras.
                  </span>
                </h1>
                
                {/* Descripción */}
                <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Encuentra pichangas cerca de ti, únete a la comunidad futbolera más grande 
                  de Perú y vive cada partido como si fuera la final.
                </p>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 gap-2 font-semibold group">
                    <Apple className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    App Store
                  </Button>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 gap-2 font-semibold group">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Google Play
                  </Button>
                </div>
              </div>

              {/* Mockups derecha - Más dinámicos */}
              <div className="relative hidden lg:block">
                <div className="relative h-[600px]">
                  {/* Phone 1 - Principal con animación */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[300px] h-[600px] rounded-[50px] bg-black border-[12px] border-gray-900 overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 z-20">
                    <div className="w-full h-full bg-gradient-to-br from-pichangon-dark-bg to-pichangon-dark-card flex items-center justify-center">
                      <img 
                        src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
                        alt="PICHANGON App"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-30"></div>
                  </div>
                  
                  {/* Phone 2 - Secundario izquierda */}
                  <div className="absolute left-0 top-20 w-[240px] h-[480px] rounded-[40px] bg-black border-[10px] border-gray-900 overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 z-10 opacity-80">
                    <div className="w-full h-full bg-gradient-to-br from-pichangon-dark-bg to-pichangon-dark-card flex items-center justify-center">
                      <img 
                        src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
                        alt="PICHANGON Features"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Phone 3 - Secundario derecha */}
                  <div className="absolute right-0 top-32 w-[220px] h-[440px] rounded-[35px] bg-black border-[10px] border-gray-900 overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 z-10 opacity-70">
                    <div className="w-full h-full bg-gradient-to-br from-pichangon-dark-bg to-pichangon-dark-card flex items-center justify-center">
                      <img 
                        src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
                        alt="PICHANGON Community"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Elementos decorativos */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-pichangon-accent/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-green-500/10 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-pichangon-accent text-sm font-semibold mb-2 uppercase tracking-wider">Cómo funciona</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              De la descarga al partido
              <br />
              <span className="text-white/60">en 3 simples pasos</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Step 1 */}
            <Card className="card-dark p-8 hover-lift">
              <div className="w-16 h-16 rounded-2xl bg-pichangon-accent/20 flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-pichangon-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Encuentra tu partido</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Explora cientos de pichangas en las mejores canchas, con horarios convenientes y niveles que se ajustan a tu preferencia.
              </p>
              
              {/* Mini mockup */}
              <div className="mt-8 rounded-2xl overflow-hidden bg-black/30 p-4">
                <div className="aspect-[9/16] rounded-xl bg-gradient-to-br from-pichangon-accent/20 to-pichangon-accent/5 flex items-center justify-center">
                  <div className="text-white/50 text-sm">Pantalla de búsqueda</div>
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="card-dark p-8 hover-lift">
              <div className="w-16 h-16 rounded-2xl bg-pichangon-accent/20 flex items-center justify-center mb-6">
                <CalendarCheck className="w-8 h-8 text-pichangon-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Reserva tu lugar</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Revisa los detalles del partido, invita a tus amigos e interactúa con otros jugadores confirmados.
              </p>
              
              {/* Mini mockup */}
              <div className="mt-8 rounded-2xl overflow-hidden bg-black/30 p-4">
                <div className="aspect-[9/16] rounded-xl bg-gradient-to-br from-pichangon-accent/20 to-pichangon-accent/5 flex items-center justify-center">
                  <div className="text-white/50 text-sm">Detalles del partido</div>
                </div>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="card-dark p-8 hover-lift">
              <div className="w-16 h-16 rounded-2xl bg-pichangon-accent/20 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-pichangon-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Llega y juega</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Regístrate en la cancha, disfruta del fútbol y haz nuevas amistades con personas que comparten tu pasión por el deporte.
              </p>
              
              {/* Mini mockup */}
              <div className="mt-8 rounded-2xl overflow-hidden bg-black/30 p-4">
                <div className="aspect-[9/16] rounded-xl bg-gradient-to-br from-pichangon-accent/20 to-pichangon-accent/5 flex items-center justify-center">
                  <div className="text-white/50 text-sm">Día del partido</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ¿Listo para jugar?
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
            Descarga PICHANGON hoy y únete a miles de jugadores en todo Perú.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-pichangon-accent hover:bg-pichangon-accent/90 text-white gap-2">
              <Download className="w-5 h-5" />
              Descargar ahora
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto px-4 text-center">
          <button
            onClick={() => navigate("/privacy")}
            className="text-pichangon-accent hover:text-pichangon-accent/80 text-sm mb-2 underline"
          >
            Política de Privacidad
          </button>
          <p className="text-white/60 text-sm">
            © 2025 PICHANGON. La plataforma definitiva para el fútbol amateur en Perú.
          </p>
        </div>
      </footer>
    </>
  );
}