// src/pages/PichangaLandingPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react";

interface PichangaData {
  id: number;
  title: string;
  date_time: string;
  location: string;
  district?: string;
  type: string;
  cost_per_player: number;
  max_players: number;
  participants: any[];
  image_url?: string;
}

export function PichangaLandingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pichanga, setPichanga] = useState<PichangaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // ✅ INTENTAR ABRIR LA APP INMEDIATAMENTE
    const deepLink = `pichangon://pichanga/${id}`;
    window.location.href = deepLink;

    // ✅ CARGAR INFO DE LA PICHANGA
    loadPichangaData();
  }, [id]);

  const loadPichangaData = async () => {
    try {
      const response = await fetch(`https://api.pichangon.com/pichangas/${id}`);
      if (!response.ok) throw new Error('Pichanga no encontrada');
      const data = await response.json();
      setPichanga(data);
      setLoading(false);
    } catch (err) {
      console.error('Error cargando pichanga:', err);
      setError(true);
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return 'Fecha por confirmar';
    const date = new Date(dateTime);
    return date.toLocaleDateString('es-PE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    if (!price || price === 0) return 'Gratis';
    return `S/. ${price}`;
  };

  const detectOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(userAgent)) return 'ios';
    if (/android/i.test(userAgent)) return 'android';
    return 'other';
  };

  const handleDownload = () => {
    const os = detectOS();
    if (os === 'ios') {
      window.open('https://apps.apple.com/es/app/pichangon/id6755395709', '_blank');
    } else if (os === 'android') {
      window.open('https://play.google.com/store/apps/details?id=com.pichangon.app', '_blank');
    } else {
      window.open('https://apps.apple.com/es/app/pichangon/id6755395709', '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] to-[#051108] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pichangon-accent mx-auto mb-4"></div>
          <p className="text-white/70">Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] to-[#051108]">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
              alt="PICHANGON"
              className="w-10 h-10"
            />
            <span className="text-white text-xl font-bold">PICHANGON</span>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            Inicio
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {error || !pichanga ? (
          <Card className="card-dark p-8 text-center">
            <div className="text-6xl mb-4">⚽</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              ¡Te invitaron a jugar!
            </h2>
            <p className="text-white/70 mb-6">
              Descarga PICHANGON para ver los detalles de esta pichanga
            </p>
            <Button
              onClick={handleDownload}
              className="bg-pichangon-accent hover:bg-pichangon-accent/90"
            >
              Descargar App
            </Button>
          </Card>
        ) : (
          <>
            {/* Pichanga Card */}
            <Card className="card-dark overflow-hidden mb-6">
              {/* Image */}
              {pichanga.image_url && (
                <div className="h-48 bg-gradient-to-br from-pichangon-accent/20 to-pichangon-accent/5">
                  <img 
                    src={pichanga.image_url}
                    alt={pichanga.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <h1 className="text-3xl font-bold text-white mb-6">
                  {pichanga.title}
                </h1>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/80">
                    <Calendar className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>{formatDateTime(pichanga.date_time)}</span>
                  </div>

                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>
                      {pichanga.location}
                      {pichanga.district && `, ${pichanga.district}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-white/80">
                    <Users className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>
                      {pichanga.participants?.length || 0}/{pichanga.max_players} jugadores
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-white/80">
                    <DollarSign className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>{formatPrice(pichanga.cost_per_player)} por jugador</span>
                  </div>

                  <div className="flex items-center gap-3 text-white/80">
                    <Clock className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>{pichanga.type}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Download CTA */}
            <Card className="card-dark p-6 text-center">
              <div className="mb-4">
                <div className="text-5xl mb-3">📱</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Descarga PICHANGON para unirte
                </h3>
                <p className="text-white/70 text-sm">
                  Únete a esta pichanga y encuentra muchas más cerca de ti
                </p>
              </div>

              <div className="space-y-3">
                {detectOS() === 'ios' && (
                  <Button
                    onClick={() => window.open('https://apps.apple.com/es/app/pichangon/id6755395709', '_blank')}
                    className="w-full bg-black hover:bg-black/90 text-white"
                  >
                    📱 Descargar en App Store
                  </Button>
                )}

                {detectOS() === 'android' && (
                  <Button
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.pichangon.app', '_blank')}
                    className="w-full bg-pichangon-accent hover:bg-pichangon-accent/90 text-white"
                  >
                    🤖 Descargar en Play Store
                  </Button>
                )}

                {detectOS() === 'other' && (
                  <>
                    <Button
                      onClick={() => window.open('https://apps.apple.com/es/app/pichangon/id6755395709', '_blank')}
                      className="w-full bg-black hover:bg-black/90 text-white"
                    >
                      📱 Descargar en App Store
                    </Button>
                    <Button
                      onClick={() => window.open('https://play.google.com/store/apps/details?id=com.pichangon.app', '_blank')}
                      className="w-full bg-pichangon-accent hover:bg-pichangon-accent/90 text-white"
                    >
                      🤖 Descargar en Play Store
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}