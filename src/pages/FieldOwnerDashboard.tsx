// src/pages/FieldOwnerDashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://pichangon.onrender.com/api';
const GOOGLE_CLIENT_ID = '100841142335-0p0vtr494m7l7mk4h84uvtgmmtcmth5m.apps.googleusercontent.com';

// Paleta de colores profesional (tonos verdes del tema)
const CHART_COLORS = {
  primary: '#10b981',    // Verde principal
  secondary: '#059669',  // Verde oscuro
  accent: '#34d399',     // Verde claro
  gray: '#6b7280',       // Gris neutro
  lightGray: '#9ca3af'   // Gris claro
};

const PIE_COLORS = ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0'];

// =================== INTERFACES ===================
interface UserInfo {
  name: string;
  user_type: string;
}

interface Stats {
  total_pichangas: number;
  completed_pichangas: number;
  cancelled_pichangas: number;
  open_pichangas: number;
  total_revenue: string;
  avg_occupancy: string;
  total_players_served: number;
}

interface RevenueByMonth {
  month: string;
  month_name: string;
  pichangas_count: number;
  revenue: string;
  avg_occupancy: string;
}

interface RecentPichanga {
  id: number;
  title: string;
  date_time: string;
  max_players: number;
  current_players: number;
  cost_per_player: number;
  field_type: string;
  type: string;
  total_collected: string;
  status: string;
  created_at: string;
}

interface TopParticipant {
  id: number;
  name: string;
  times_participated: number;
}

interface PaymentStats {
  total_participants: number;
  paid_participants: number;
  approved_proofs: number;
  pending_proofs: number;
  rejected_proofs: number;
}

interface DashboardData {
  user_info: UserInfo;
  stats: Stats;
  revenue_by_month: RevenueByMonth[];
  participants_by_district: ParticipantsByDistrict[];
  peak_hours: PeakHour[];
  peak_days: PeakDay[];
  recent_pichangas: RecentPichanga[];
  top_participants: TopParticipant[];
  payment_stats: PaymentStats;
  generated_at: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

interface ParticipantsByDistrict {
  district: string;
  total_participants: number;
  pichangas_count: number;
  percentage: number;
}

interface PeakHour {
  time_range: string;
  pichangas_count: number;
}

interface PeakDay {
  day_name: string;
  pichangas_count: number;
}


// =================== COMPONENTE PRINCIPAL ===================
function FieldOwnerDashboardContent() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'resumen' | 'analisis' | 'pichangas'>('resumen');
  const [peakTab, setPeakTab] = useState<'hours' | 'days'>('hours');

  useEffect(() => {
    const token = localStorage.getItem('field_owner_token');
    if (token) {
      setIsAuthenticated(true);
      loadDashboard(token);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data.data;

      if (user.user_type !== 'field_owner') {
        setError('Solo dueños de canchas pueden acceder a este dashboard');
        setLoading(false);
        return;
      }

      localStorage.setItem('field_owner_token', token);
      setIsAuthenticated(true);
      loadDashboard(token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/google`, {
        idToken: credentialResponse.credential
      });

      const { token, user } = response.data.data;

      if (user.user_type !== 'field_owner') {
        setError('Solo dueños de canchas pueden acceder a este dashboard');
        setLoading(false);
        return;
      }

      localStorage.setItem('field_owner_token', token);
      setIsAuthenticated(true);
      loadDashboard(token);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Solo dueños de canchas pueden acceder a este dashboard');
      } else {
        setError(err.response?.data?.message || 'Error al iniciar sesión con Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Error al iniciar sesión con Google. Por favor, intenta de nuevo.');
  };

  const loadDashboard = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/field-owner/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data.data);
    } catch (err: any) {
      console.error('Error cargando dashboard:', err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('field_owner_token');
    setIsAuthenticated(false);
    setDashboardData(null);
  };

  const exportToExcel = async () => {
    try {
      const token = localStorage.getItem('field_owner_token');
      const response = await axios.get(`${API_URL}/field-owner/export-excel`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data.data;
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Pichangas');
      
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      saveAs(blob, response.data.filename);
    } catch (err) {
      alert('Error exportando a Excel');
      console.error(err);
    }
  };

  // ====================================================================
  // PANTALLA DE LOGIN
  // ====================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] via-60% to-[#051108]">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pichangon-accent/20 border border-pichangon-accent/30 mb-6">
                <span className="text-pichangon-accent text-sm font-medium">Dashboard para Dueños de Canchas</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Accede a tu Dashboard
              </h1>
              
              <p className="text-white/70 text-lg">
                Gestiona tus canchas y visualiza estadísticas en tiempo real
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="filled_black"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  logo_alignment="left"
                  width="100%"
                />
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/60">O continúa con email</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pichangon-accent focus:border-transparent transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pichangon-accent focus:border-transparent transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pichangon-accent hover:bg-pichangon-accent/90 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Accediendo...' : 'Acceder con Email'}
                </button>
              </form>

              <p className="text-center text-sm text-white/50 mt-6">
                ¿No tienes cuenta? Descarga nuestra app, regístrate y contáctanos a {' '}
                <a href="/" className="text-pichangon-accent hover:text-pichangon-accent/80 font-medium">
                  contacto@pichangon.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================================
  // PANTALLA DE CARGA
  // ====================================================================
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] via-60% to-[#051108] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pichangon-accent/30 border-t-pichangon-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80 text-lg">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = dashboardData.stats;
  const revenueData = dashboardData.revenue_by_month;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] via-60% to-[#051108]">
      {/* Header */}
      <header className="bg-[#0F2919]/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img 
                      src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
                      alt="PICHANGON"
                      className="w-full h-full object-contain drop-shadow-lg"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  <span className="text-white text-xl font-bold">PICHANGON</span>
                </button>
              </div>
              <p className="text-sm text-white/50 mt-1">
                Bienvenido, {dashboardData.user_info.name}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar
              </button>
              <button
                onClick={() => loadDashboard(localStorage.getItem('field_owner_token') || '')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#0F2919]/50 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-1">
            {(['resumen', 'analisis', 'pichangas'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium text-sm transition-all ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-pichangon-accent'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                {tab === 'resumen' && 'Resumen'}
                {tab === 'analisis' && 'Análisis'}
                {tab === 'pichangas' && 'Pichangas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 md:px-6 py-6">
        {activeTab === 'resumen' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="TOTAL PICHANGAS"
                value={stats.total_pichangas}
                subtitle={`${stats.completed_pichangas} completadas`}
              />
              <StatCard
                title="INGRESOS TOTALES"
                value={`S/ ${stats.total_revenue}`}
                subtitle="Acumulado"
              />
              <StatCard
                title="OCUPACIÓN PROMEDIO"
                value={`${stats.avg_occupancy}%`}
                subtitle="Últimos 30 días"
              />
              <StatCard
                title="JUGADORES ATENDIDOS"
                value={stats.total_players_served}
                subtitle="Total histórico"
              />
            </div>

            {/* Revenue Chart - MEJORADO */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">Ingresos por mes</h2>
              {revenueData && revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#ffffff40" 
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => {
                        const [year, month] = value.split('-');
                        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                        return `${months[parseInt(month) - 1]} '${year.slice(2)}`;
                      }}
                    />
                    <YAxis 
                      stroke="#ffffff40" 
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `S/ ${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 41, 25, 0.95)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '13px',
                        padding: '12px'
                      }}
                      labelFormatter={(value) => {
                        const [year, month] = value.split('-');
                        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                        return `${months[parseInt(month) - 1]} ${year}`;
                      }}
                      formatter={(value: any, name: string) => {
                        if (name === 'revenue') return [`S/ ${parseFloat(value).toFixed(2)}`, 'Ingresos'];
                        return [value, name];
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke={CHART_COLORS.primary} 
                      strokeWidth={3} 
                      name="revenue"
                      dot={{ fill: CHART_COLORS.primary, r: 5, strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-white/50">
                  No hay datos de ingresos disponibles
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* DISTRIBUCIÓN POR DISTRITO */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-4">
                Distribución de participantes por distrito
              </h2>

              {dashboardData.participants_by_district.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={dashboardData.participants_by_district}
                      dataKey="total_participants"
                      nameKey="district"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={(entry: any) =>
                        `${entry.district}: ${entry.total_participants} (${entry.percentage}%)`
                      }
                    >
                      {dashboardData.participants_by_district.map((_, index) => (
                        <Cell
                          key={index}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 41, 25, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '13px',
                        padding: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
                      }}
                      itemStyle={{ color: '#ffffff' }}
                      labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                      formatter={(value: any) => [`${value} jugadores`, 'Participantes']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-white/50 text-sm text-center">
                  No hay datos de participantes
                </p>
              )}
            </div>

              {/* HORAS / DÍAS PICO */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setPeakTab('hours')}
                    className={`px-4 py-2 text-sm rounded-lg ${
                      peakTab === 'hours'
                        ? 'bg-pichangon-accent text-white'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    Horas pico
                  </button>

                  <button
                    onClick={() => setPeakTab('days')}
                    className={`px-4 py-2 text-sm rounded-lg ${
                      peakTab === 'days'
                        ? 'bg-pichangon-accent text-white'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    Días pico
                  </button>
                </div>

                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={
                      peakTab === 'hours'
                        ? dashboardData.peak_hours
                        : dashboardData.peak_days
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey={peakTab === 'hours' ? 'time_range' : 'day_name'}
                      stroke="#ffffff40"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#ffffff40"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      cursor={false}
                      contentStyle={{
                        backgroundColor: 'rgba(15,41,25,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '13px',
                        padding: '12px'
                      }}
                      formatter={(value: any) => [`${value}`, 'Pichangas']}
                    />
                    <Bar
                      dataKey="pichangas_count"
                      fill={CHART_COLORS.primary}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analisis' && (
          <div className="space-y-6">
            {/* Top Participants */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">Top 10 Jugadores Recurrentes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-6 text-white/60 font-medium text-sm">Posición</th>
                      <th className="text-left py-3 px-6 text-white/60 font-medium text-sm">Nombre</th>
                      <th className="text-right py-3 px-6 text-white/60 font-medium text-sm">Participaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.top_participants.map((participant, index) => (
                      <tr key={participant.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-6 text-pichangon-accent font-semibold">{index + 1}</td>
                        <td className="py-3 px-6 text-white">{participant.name}</td>
                        <td className="py-3 px-6 text-right text-white font-medium">{participant.times_participated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-4">Estadísticas de Pagos</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-3xl font-bold text-white">
                    {dashboardData.payment_stats.total_participants}
                  </p>
                  <p className="text-sm text-white/50 mt-1">Total Participantes</p>
                </div>
                <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-3xl font-bold text-pichangon-accent">
                    {dashboardData.payment_stats.paid_participants}
                  </p>
                  <p className="text-sm text-white/50 mt-1">Pagos Confirmados</p>
                </div>
                <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-400">
                    {dashboardData.payment_stats.pending_proofs}
                  </p>
                  <p className="text-sm text-white/50 mt-1">Pendientes</p>
                </div>
                <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-3xl font-bold text-red-400">
                    {dashboardData.payment_stats.rejected_proofs}
                  </p>
                  <p className="text-sm text-white/50 mt-1">Rechazados</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pichangas' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Pichangas Recientes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-6 text-white/60 font-medium text-sm">Título</th>
                    <th className="text-left py-3 px-6 text-white/60 font-medium text-sm">Fecha</th>
                    <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">Ocupación</th>
                    <th className="text-right py-3 px-6 text-white/60 font-medium text-sm">Ingresos</th>
                    <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recent_pichangas.map((pichanga) => (
                    <tr key={pichanga.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-6 text-white">{pichanga.title}</td>
                      <td className="py-3 px-6 text-sm text-white/60">
                        {new Date(pichanga.date_time).toLocaleString('es-PE', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-white rounded-md text-sm">
                          {pichanga.current_players}/{pichanga.max_players}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-right font-semibold text-pichangon-accent">
                        S/ {pichanga.total_collected}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium border ${
                          pichanga.status === 'completed' ? 'bg-green-500/20 border-green-500/30 text-green-300' :
                          pichanga.status === 'open' ? 'bg-blue-500/20 border-blue-500/30 text-blue-300' :
                          pichanga.status === 'cancelled' ? 'bg-red-500/20 border-red-500/30 text-red-300' :
                          'bg-gray-500/20 border-gray-500/30 text-gray-300'
                        }`}>
                          {pichanga.status === 'completed' ? 'Completada' :
                           pichanga.status === 'open' ? 'Abierta' :
                           pichanga.status === 'cancelled' ? 'Cancelada' : pichanga.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ====================================================================
// COMPONENTE: TARJETA DE ESTADÍSTICA (MINIMALISTA)
// ====================================================================
function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl">
      <p className="text-xs font-medium text-white/50 mb-2 uppercase tracking-wide">{title}</p>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {subtitle && (
        <p className="text-xs text-white/40">{subtitle}</p>
      )}
    </div>
  );
}

// WRAPPER CON GOOGLE PROVIDER
function FieldOwnerDashboard() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <FieldOwnerDashboardContent />
    </GoogleOAuthProvider>
  );
}

export default FieldOwnerDashboard;