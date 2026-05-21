import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Users, MapPin, Shield, Trophy } from "lucide-react";

interface TeamData {
  id: number;
  name: string;
  description: string;
  district?: string;
  logo_url?: string;
  captain_name: string;
  max_players: number;
  players: any[];
  stats: {
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
  };
}

export function TeamLandingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // ✅ INTENTAR ABRIR LA APP INMEDIATAMENTE
    const deepLink = `pichangon://team/${id}`;
    window.location.href = deepLink;

    // ✅ CARGAR INFO DEL EQUIPO
    loadTeamData();
  }, [id]);

  const loadTeamData = async () => {
    try {
      const response = await fetch(`https://api.pichangon.com/teams/${id}`);
      if (!response.ok) throw new Error('Equipo no encontrado');
      const data = await response.json();
      setTeam(data.data.team);
      setLoading(false);
    } catch (err) {
      console.error('Error cargando equipo:', err);
      setError(true);
      setLoading(false);
    }
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
        {error || !team ? (
          <Card className="card-dark p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              ¡Te invitaron a un equipo!
            </h2>
            <p className="text-white/70 mb-6">
              Descarga PICHANGON para ver los detalles de este equipo
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
            {/* Team Card */}
            <Card className="card-dark overflow-hidden mb-6">
              {/* Logo / Header */}
              <div className="h-32 bg-gradient-to-br from-pichangon-accent/30 to-pichangon-accent/10 flex items-center justify-center">
                {team.logo_url ? (
                  <img
                    src={team.logo_url}
                    alt={team.name}
                    className="h-24 w-24 object-cover rounded-full border-4 border-pichangon-accent/50"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-pichangon-accent/20 border-4 border-pichangon-accent/50 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {team.name.substring(0, 1).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h1 className="text-3xl font-bold text-white mb-2 text-center">
                  {team.name}
                </h1>

                {team.description && (
                  <p className="text-white/60 text-sm text-center mb-6">
                    {team.description}
                  </p>
                )}

                <div className="space-y-4">
                  {team.district && (
                    <div className="flex items-center gap-3 text-white/80">
                      <MapPin className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                      <span>{team.district}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-white/80">
                    <Shield className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>Capitán: {team.captain_name}</span>
                  </div>

                  <div className="flex items-center gap-3 text-white/80">
                    <Users className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                    <span>
                      {team.players?.length || 0}/{team.max_players} jugadores
                    </span>
                  </div>

                  {team.stats?.matchesPlayed > 0 && (
                    <div className="flex items-center gap-3 text-white/80">
                      <Trophy className="w-5 h-5 text-pichangon-accent flex-shrink-0" />
                      <span>
                        {team.stats.matchesPlayed} partidos · {team.stats.wins}V {team.stats.draws}E {team.stats.losses}D
                      </span>
                    </div>
                  )}
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
                  Únete a este equipo y juega pichangas y torneos
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