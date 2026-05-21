import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Calendar, MapPin, Users, Trophy, DollarSign } from "lucide-react";

interface TournamentData {
  id: number;
  name: string;
  description?: string;
  district?: string;
  location?: string;
  format: string;
  football_format?: string;
  entry_fee: number;
  prize_pool?: number;
  current_teams: number;
  max_teams: number;
  start_date?: string;
  image_url?: string;
  status: string;
  organizer_name?: string;
}

export function TournamentLandingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const deepLink = `pichangon://tournament/${id}`;
    window.location.href = deepLink;
    loadTournamentData();
  }, [id]);

  const loadTournamentData = async () => {
    try {
      const response = await fetch(`https://api.pichangon.com/tournaments/${id}`);
      if (!response.ok) throw new Error('Torneo no encontrado');
      const data = await response.json();
      setTournament(data.data.tournament);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Fecha por confirmar';
    return new Date(dateStr).toLocaleDateString('es-PE', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const formatFormat = (format?: string) => {
    if (!format) return 'Torneo';
    const map: Record<string, string> = {
      elimination: 'Eliminación directa',
      eliminacion_directa: 'Eliminación directa',
      league: 'Liga',
      liga: 'Liga',
      mixed: 'Mixto',
      mixto: 'Mixto',
    };
    return map[format] ?? format;
  };

  const formatFootball = (f?: string) => {
    if (!f) return '';
    const map: Record<string, string> = { futbol11: '11vs11', futbol7: '7vs7', futbol5: '5vs5' };
    return map[f] ?? f;
  };

  const detectOS = () => {
    const ua = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
    if (/android/i.test(ua)) return 'android';
    return 'other';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] to-[#051108] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pichangon-accent mx-auto mb-4"></div>
          <p className="text-white/70">Cargando torneo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] to-[#051108]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png" alt="PICHANGON" className="w-10 h-10" />
            <span className="text-white text-xl font-bold">PICHANGON</span>
          </div>
          <Button onClick={() => navigate('/')} variant="ghost" className="text-white hover:bg-white/10">Inicio</Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {error || !tournament ? (
          <Card className="card-dark p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-white mb-4">¡Te invitaron a un torneo!</h2>
            <p className="text-white/70 mb-6">Descarga PICHANGON para ver los detalles</p>
            <Button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.pichangon.app', '_blank')} className="bg-pichangon-accent hover:bg-pichangon-accent/90">
              Descargar App
            </Button>
          </Card>
        ) : (
          <>
            <Card className="card-dark overflow-hidden mb-6">
              {tournament.image_url && (
                <div className="h-48">
                  <img src={tournament.image_url} alt={tournament.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-white mb-2">{tournament.name}</h1>
                {tournament.description && (
                  <p className="text-white/60 text-sm mb-6">{tournament.description}</p>
                )}
                <div className="space-y-4">
                  {tournament.start_date && (
                    <div className="flex items-center gap-3 text-white/80">
                      <Calendar className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                      <span>{formatDate(tournament.start_date)}</span>
                    </div>
                  )}
                  {(tournament.location || tournament.district) && (
                    <div className="flex items-center gap-3 text-white/80">
                      <MapPin className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                      <span>{[tournament.location, tournament.district].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-white/80">
                    <Users className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>{tournament.current_teams}/{tournament.max_teams} equipos {formatFootball(tournament.football_format) && `· ${formatFootball(tournament.football_format)}`}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Trophy className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>{formatFormat(tournament.format)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <DollarSign className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>{tournament.entry_fee > 0 ? `S/. ${tournament.entry_fee} por equipo` : 'Inscripción gratuita'}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="card-dark p-6 text-center">
              <div className="text-5xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-white mb-2">Descarga PICHANGON para participar</h3>
              <p className="text-white/70 text-sm mb-4">Inscribe tu equipo y compite en este torneo</p>
              <div className="space-y-3">
                {detectOS() !== 'android' && (
                  <Button onClick={() => window.open('https://apps.apple.com/es/app/pichangon/id6755395709', '_blank')} className="w-full bg-black hover:bg-black/90 text-white">
                    📱 Descargar en App Store
                  </Button>
                )}
                {detectOS() !== 'ios' && (
                  <Button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.pichangon.app', '_blank')} className="w-full bg-pichangon-accent hover:bg-pichangon-accent/90 text-white">
                    🤖 Descargar en Play Store
                  </Button>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}