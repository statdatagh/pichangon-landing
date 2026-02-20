// App.tsx
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { 
  Search,
  CalendarCheck,
  Users,
  Download,
  HelpCircle,
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
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import FieldOwnerDashboard from './pages/FieldOwnerDashboard';
import { PichangaLandingPage } from './pages/PichangaLandingPage';


export default function App() {
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

    // ✅ INICIALIZAR TRACKING SI EL USUARIO YA ACEPTÓ COOKIES
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
      {/* Navigation */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/support" element={<SupportSection />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<FieldOwnerDashboard />} />
        <Route path="/pichanga/:id" element={<PichangaLandingPage />} />
      </Routes>

      {/* ✅ BANNER DE COOKIES */}
      <CookieBanner />
    </div>
  );
}

// Navbar Component
function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
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
          
          {/* Botones - Responsive */}
          <div className="flex gap-1.5 md:gap-4 items-center">
            {/* Inicio - Solo visible en desktop */}
            <Button 
              variant="ghost" 
              className="hidden sm:flex text-white hover:bg-pichangon-accent/20 hover:text-white text-sm md:text-base px-3 md:px-4"
              onClick={() => navigate("/")}
            >
              Inicio
            </Button>
            
            {/* Soporte */}
            <Button 
              variant="ghost" 
              className="text-white hover:bg-pichangon-accent/20 hover:text-white gap-1 md:gap-2 text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4"
              onClick={() => navigate("/support")}
            >
              <HelpCircle className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Soporte</span>
            </Button>
            
            {/* Dashboard - Texto adaptativo */}
            <Button 
              variant="ghost" 
              className="text-pichangon-accent hover:bg-pichangon-accent/20 hover:text-white border border-pichangon-accent/30 text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 font-semibold whitespace-nowrap"
              onClick={() => navigate("/dashboard")}
            >
              <span className="hidden sm:inline">Gestión Canchas</span>
              <span className="sm:hidden">Canchas</span>
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
      <div className="relative overflow-hidden py-8 md:py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Badge superior */}
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pichangon-accent/20 border border-pichangon-accent/30">
                <span className="w-2 h-2 rounded-full bg-pichangon-accent animate-pulse"></span>
                <span className="text-white text-xs sm:text-sm font-medium text-center">
                  La app para organizar fútbol amateur en Perú
                </span>
              </div>
            </div>

            {/* Grid principal: Texto a la izquierda, mockups a la derecha */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Contenido izquierdo */}
              <div className="text-center lg:text-left">
                {/* Título grande */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                  <span className="block text-white">Pelotea.</span>
                  <span className="block bg-gradient-to-r from-pichangon-accent to-green-400 bg-clip-text text-transparent">
                    Donde quieras.
                  </span>
                  <span className="block bg-gradient-to-r from-pichangon-accent to-green-400 bg-clip-text text-transparent">
                    Cuando quieras.
                  </span>
                </h1>
                
                {/* Descripción */}
                <p className="text-white/80 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Encuentra pichangas cerca de ti, únete a una gran comunidad futbolera 
                  en Perú y vive cada partido como si fuera la final.
                </p>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                  <a 
                    href="https://apps.apple.com/es/app/pichangon/id6755395709" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <img 
                      src="https://res.cloudinary.com/davyafbvj/image/upload/v1770725318/apple-1_iaq2mx.png"
                      alt="Descargar en App Store"
                      className="h-12 sm:h-14 w-auto"
                    />
                  </a>
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.pichangon.app&pcampaignid=web_share" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <img 
                      src="https://res.cloudinary.com/davyafbvj/image/upload/v1770725372/disponible-en-google-play-badge_kjqimi.png"
                      alt="Descargar en Google Play"
                      className="h-12 sm:h-14 w-auto"
                    />
                  </a>
                </div>
              </div>

              {/* Mockups derecha - Más dinámicos */}
              <div className="relative hidden lg:block">
                <div className="relative h-[600px]">
                  {/* Phone 1 - Principal con animación */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[300px] h-[600px] rounded-[50px] bg-black border-[12px] border-gray-900 overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 z-20">
                    <div className="w-full h-full bg-gradient-to-br from-pichangon-dark-bg to-pichangon-dark-card flex items-center justify-center">
                      <img 
                        src="https://res.cloudinary.com/davyafbvj/image/upload/v1764331877/Mockups_App_qusmuo.png"
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
                        src="https://res.cloudinary.com/davyafbvj/image/upload/v1764331877/Mockups_App_1_wiqoqh.png"
                        alt="PICHANGON Features"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Phone 3 - Secundario derecha */}
                  <div className="absolute right-0 top-32 w-[220px] h-[440px] rounded-[35px] bg-black border-[10px] border-gray-900 overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 z-10 opacity-70">
                    <div className="w-full h-full bg-gradient-to-br from-pichangon-dark-bg to-pichangon-dark-card flex items-center justify-center">
                      <img 
                        src="https://res.cloudinary.com/davyafbvj/image/upload/v1764331877/Mockups_App_2_j6lgto.png"
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
      <div className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-pichangon-accent text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wider">
              Cómo funciona
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white px-4">
              De la descarga al partido
              <br />
              <span className="text-white/60">en 3 simples pasos</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Step 1 */}
            <Card className="card-dark p-6 md:p-8 hover-lift">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-pichangon-accent/20 flex items-center justify-center mb-4 md:mb-6">
                <Search className="w-7 h-7 md:w-8 md:h-8 text-pichangon-accent" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                Encuentra tu partido
              </h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Explora cientos de pichangas en las mejores canchas, con horarios convenientes y niveles que se ajustan a tu preferencia.
              </p>
              
              {/* Mini mockup */}
              <div className="mt-6 md:mt-8 rounded-2xl overflow-hidden bg-black/30 p-4">
                <div className="aspect-[9/16] rounded-xl bg-gradient-to-br from-pichangon-accent/20 to-pichangon-accent/5 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/davyafbvj/image/upload/v1764331877/Mockups_App_5_e9ajtx.png "
                    alt="Pantalla de búsqueda"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="text-white/50 text-sm">Pantalla de búsqueda</div>';
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="card-dark p-6 md:p-8 hover-lift">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-pichangon-accent/20 flex items-center justify-center mb-4 md:mb-6">
                <CalendarCheck className="w-7 h-7 md:w-8 md:h-8 text-pichangon-accent" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                Reserva tu lugar
              </h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Revisa los detalles del partido, invita a tus amigos e interactúa con otros jugadores confirmados.
              </p>
              
              {/* Mini mockup */}
              <div className="mt-6 md:mt-8 rounded-2xl overflow-hidden bg-black/30 p-4">
                <div className="aspect-[9/16] rounded-xl bg-gradient-to-br from-pichangon-accent/20 to-pichangon-accent/5 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/davyafbvj/image/upload/v1764331877/Mockups_App_2_j6lgto.png"
                    alt="Detalles del partido"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="text-white/50 text-sm">Detalles del partido</div>';
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="card-dark p-6 md:p-8 hover-lift">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-pichangon-accent/20 flex items-center justify-center mb-4 md:mb-6">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-pichangon-accent" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                Llega y juega
              </h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Regístrate en la cancha, disfruta del fútbol y haz nuevas amistades con personas que comparten tu pasión por el deporte.
              </p>
              
              {/* Mini mockup */}
              <div className="mt-6 md:mt-8 rounded-2xl overflow-hidden bg-black/30 p-4">
                <div className="aspect-[9/16] rounded-xl bg-gradient-to-br from-pichangon-accent/20 to-pichangon-accent/5 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/davyafbvj/image/upload/v1764331877/Mockups_App_4_vrxcrm.png"
                    alt="Día del partido"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="text-white/50 text-sm">Día del partido</div>';
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 px-4">
            ¿Listo para jugar?
          </h2>
          <p className="text-white/80 text-base sm:text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Descarga PICHANGON hoy y únete a miles de jugadores en todo Perú.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button 
              size="lg" 
              className="bg-pichangon-accent hover:bg-pichangon-accent/90 text-white gap-2 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
              onClick={() => window.open('https://apps.apple.com/es/app/pichangon/id6755395709', '_blank')}
            >
              <Download className="w-5 h-5" />
              Descargar ahora
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="py-8 md:py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4">
            <button
              onClick={() => navigate("/privacy")}
              className="text-pichangon-accent hover:text-pichangon-accent/80 text-xs sm:text-sm underline"
            >
              Política de Privacidad
            </button>
            <span className="text-white/40 hidden sm:inline">•</span>
            <button
              onClick={() => navigate("/terms")}
              className="text-pichangon-accent hover:text-pichangon-accent/80 text-xs sm:text-sm underline"
            >
              Términos y Condiciones
            </button>
            <span className="text-white/40 hidden sm:inline">•</span>
            <button
              onClick={() => navigate("/cookies")}
              className="text-pichangon-accent hover:text-pichangon-accent/80 text-xs sm:text-sm underline"
            >
              Política de Cookies
            </button>
          </div>
          <p className="text-white/60 text-xs sm:text-sm px-4 leading-relaxed">
            © 2025 PICHANGON. Plataforma digital para fútbol amateur en Perú.  
            <br className="sm:hidden" />
            Pichangón es una plataforma operada bajo la marca PICHANGÓN DEL BARRIO.
          </p>
        </div>
      </footer>
    </>
  );
}