import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { 
  MapPin, 
  Trophy, 
  Users, 
  MessageCircle, 
  User, 
  CreditCard,
  Bell,
  ChevronRight,
  Star,
  Smartphone,
  Download,
  HelpCircle
} from "lucide-react";
import { SupportSection } from "./components/SupportSection";
import { VerificationModal } from "./components/VerificationModal";
import { useState, useEffect } from "react";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "support">("home");
  
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
    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const verification = params.get("verification");
    const email = params.get("email");
    const name = params.get("name");
    const reason = params.get("reason");

    console.log('🔍 DEBUG - Parámetros detectados:', { verification, email, name, reason });

    if (verification === "success" || verification === "error") {
      console.log('✅ Mostrando modal de verificación');
      
      setVerificationStatus({
        status: verification as "success" | "error",
        email: email || undefined,
        name: name || undefined,
        reason: reason || undefined,
      });

      // Limpiar URL después de 2 segundos (sin recargar)
      setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete('verification');
        url.searchParams.delete('email');
        url.searchParams.delete('name');
        url.searchParams.delete('reason');
        window.history.replaceState({}, document.title, url.pathname);
      }, 2000);
    }
  }, []); // ✅ Solo ejecutar una vez al montar el componente

  // ✅ FUNCIÓN PARA CERRAR EL MODAL
  const handleCloseVerification = () => {
    setVerificationStatus({ status: null });
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d5f3f] via-[#3a7a4f] to-[#2d5f3f]">
      {/* ✅ MODAL DE VERIFICACIÓN */}
      <VerificationModal
        status={verificationStatus.status}
        email={verificationStatus.email}
        name={verificationStatus.name}
        reason={verificationStatus.reason}
        onClose={handleCloseVerification}
      />

      {/* Navigation Header */}
      <nav className="bg-[#2d5f3f]/50 backdrop-blur border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("home")}>
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
            
            <div className="flex gap-2 md:gap-4">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 text-sm md:text-base px-3 md:px-4"
                onClick={() => setCurrentView("home")}
              >
                Inicio
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 gap-1 md:gap-2 text-sm md:text-base px-3 md:px-4"
                onClick={() => setCurrentView("support")}
                data-support-button  // ✅ AGREGAR ESTO
              >
                <HelpCircle className="w-3 h-3 md:w-4 md:h-4" />
                Soporte
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Conditional Rendering */}
      {currentView === "support" ? (
        <SupportSection />
      ) : (
        <>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCAxNGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
                  alt="PICHANGON Logo"
                  className="w-full h-full object-contain drop-shadow-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h1 className="text-white text-2xl md:text-3xl font-bold">PICHANGON</h1>
            </div>
            
            <h2 className="text-white text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
              La App para Organizar tu Fútbol
            </h2>
            
            <p className="text-white/90 text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
              ¿Cansado de organizar pichangas por WhatsApp? La plataforma definitiva para el fútbol amateur en Perú.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#2d5f3f] hover:bg-gray-100 gap-2 text-sm md:text-base">
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                Descargar para iOS
              </Button>
              <Button size="lg" className="bg-white text-[#2d5f3f] hover:bg-gray-100 gap-2 text-sm md:text-base">
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                Descargar para Android
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h3 className="text-white text-center text-2xl md:text-4xl mb-8 md:mb-12">Características Principales</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <Card className="bg-white/10 backdrop-blur border-white/20 p-4 hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-white mb-2">Pichangas al Instante</h4>
            <p className="text-white/80 text-sm mb-3">
              Encuentra pichangas cerca de ti en tiempo real. Filtra por ubicación, fecha y precio.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#16a085] text-white text-xs">Tiempo real</Badge>
              <Badge className="bg-[#e67e22] text-white text-xs">Pagos integrados</Badge>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-white/10 backdrop-blur border-white/20 p-4 hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-white mb-2">Grupos y Comunidad</h4>
            <p className="text-white/80 text-sm mb-3">
              Crea o únete a grupos de fútbol de tu barrio. Chat grupal integrado.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#9b59b6] text-white text-xs">Grupos privados</Badge>
              <Badge className="bg-[#16a085] text-white text-xs">Chat incluido</Badge>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-white/10 backdrop-blur border-white/20 p-4 hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-white mb-2">Chat en Tiempo Real</h4>
            <p className="text-white/80 text-sm mb-3">
              Mensajería instantánea para coordinar partidos. Notificaciones push integradas.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#16a085] text-white text-xs">Instantáneo</Badge>
              <Badge className="bg-[#3498db] text-white text-xs">Push notifications</Badge>
            </div>
          </Card>

          {/* Feature 4 */}
          <Card className="bg-white/10 backdrop-blur border-white/20 p-4 hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-white mb-2">Tu Perfil Futbolero</h4>
            <p className="text-white/80 text-sm mb-3">
              Lleva el registro de todos tus partidos. Estadísticas personales y evaluaciones.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#16a085] text-white text-xs">Estadísticas</Badge>
              <Badge className="bg-[#e67e22] text-white text-xs">Historial</Badge>
            </div>
          </Card>

          {/* Feature 5 */}
          <Card className="bg-white/10 backdrop-blur border-white/20 p-4 hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-white mb-2">Gestión de Pagos</h4>
            <p className="text-white/80 text-sm mb-3">
              Sube comprobantes de pago por Yape, Plin o transferencias. Sistema de verificación manejada por ti.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-purple-600 text-white text-xs">Yape</Badge>
              <Badge className="bg-blue-600 text-white text-xs">Plin</Badge>
            </div>
          </Card>

          {/* Feature 6 */}
          <Card className="bg-white/10 backdrop-blur border-white/20 p-4 hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-white mb-2">Notificaciones Inteligentes</h4>
            <p className="text-white/80 text-sm mb-3">
              Recibe alertas de nuevas pichangas. Recordatorios automáticos de partidos.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#e67e22] text-white text-xs">Alertas</Badge>
              <Badge className="bg-[#16a085] text-white text-xs">Recordatorios</Badge>
            </div>
          </Card>
        </div>
      </div>

      {/* Ideal Para Section */}
      <div className="bg-white/5 backdrop-blur py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-white text-center text-2xl md:text-4xl mb-8 md:mb-12">Ideal para</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-white text-sm md:text-base">Jugadores que buscan partidos regulares</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-white text-sm md:text-base">Organizadores de torneos barriales</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-white text-sm md:text-base">Grupos de amigos que juegan semanalmente</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-white text-sm md:text-base">Equipos amateur que buscan competencia</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-white text-sm md:text-base">Dueños de canchas que quieren optimizar reservas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Pichangon */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <h3 className="text-white text-center text-2xl md:text-4xl mb-8 md:mb-12">¿Por qué PICHANGON?</h3>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <div className="flex gap-3 md:gap-4 items-start">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#2d5f3f]" />
            </div>
            <div>
              <h5 className="text-white text-lg md:text-xl mb-1 md:mb-2">Diseñada para el fútbol peruano</h5>
              <p className="text-white/80 text-sm md:text-base">Conocemos la cultura y pasión por el fútbol en Perú</p>
            </div>
          </div>
          
          <div className="flex gap-3 md:gap-4 items-start">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#2d5f3f]" />
            </div>
            <div>
              <h5 className="text-white text-lg md:text-xl mb-1 md:mb-2">Interfaz simple e intuitiva</h5>
              <p className="text-white/80 text-sm md:text-base">Fácil de usar para todos los jugadores</p>
            </div>
          </div>
          
          <div className="flex gap-3 md:gap-4 items-start">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#2d5f3f]" />
            </div>
            <div>
              <h5 className="text-white text-lg md:text-xl mb-1 md:mb-2">Todo en un solo lugar</h5>
              <p className="text-white/80 text-sm md:text-base">No más coordinación por múltiples apps</p>
            </div>
          </div>
          
          <div className="flex gap-3 md:gap-4 items-start">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#2d5f3f]" />
            </div>
            <div>
              <h5 className="text-white text-lg md:text-xl mb-1 md:mb-2">Comunidad activa y creciente</h5>
              <p className="text-white/80 text-sm md:text-base">Únete a miles de jugadores en todo el país</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white/10 backdrop-blur py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-white text-2xl md:text-4xl mb-4 md:mb-6">
            Únete a la Revolución del Fútbol Amateur
          </h3>
          <p className="text-white/90 text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Descarga PICHANGON y descubre lo fácil que es organizar, jugar y disfrutar del deporte más popular del Perú.
          </p>
          <p className="text-white text-lg md:text-2xl mb-6 md:mb-8">
            ¡Tu próxima pichanga está a un tap de distancia!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#2d5f3f] hover:bg-gray-100 gap-2 text-sm md:text-base">
              <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
              Descargar App
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 md:py-8">
        <div className="container mx-auto px-4 text-center text-white/60 text-sm md:text-base">
          <p>© 2025 PICHANGON. La plataforma definitiva para el fútbol amateur en Perú.</p>
        </div>
      </footer>
        </>
      )}
    </div>
  );
}