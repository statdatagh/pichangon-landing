// src/pages/FieldOwnerDashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Legend,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL as string;
const GOOGLE_CLIENT_ID = '100841142335-0p0vtr494m7l7mk4h84uvtgmmtcmth5m.apps.googleusercontent.com';

const CHART_COLORS = {
  primary: '#10b981',
  secondary: '#059669',
  accent: '#34d399',
  gray: '#6b7280',
  lightGray: '#9ca3af'
};

// =================== INTERFACES ===================
interface UserInfo {
  name: string;
  user_type: string;
}

interface Stats {
  is_free: boolean;
  total_reservations: number;
  pending_approval: number;
  approved_pending_payment: number;
  confirmed_reservations: number;
  cancelled_reservations: number;
  total_revenue: string;
  avg_revenue_per_reservation: string;
  approval_rate: string;
  total_pichangas: number;
  completed_pichangas: number;
  total_players_served: number;
  total_collected: string;
  daily_avg: string;
  monthly_avg: string;
  best_day_label: string | null;
  best_day_amount: string;
  quorum_rate: string;
  top_slot: string | null;
  total_attendees: number;
  daily_avg_att: string;
  monthly_avg_att: string;
  best_day_label_att: string | null;
  best_day_attendees: number;
}

interface RevenueByMonth {
  month: string;
  month_name: string;
  reservations_count: number;
  revenue: string;
  avg_revenue: string;
}

interface AttendanceByMonth {
  month: string;
  month_name: string;
  total_attendees: number;
}

interface RevenuePeriod {
  period: string;
  period_label: string;
  revenue: string;
}

interface AttendancePeriod {
  period: string;
  period_label: string;
  attendees: number;
}

interface PopularSlot {
  slot_time: string;
  total_requests: number;
  confirmed_count: number;
  slot_revenue: string;
}

interface PeakDay {
  day_name: string;
  day_number: number;
  total_requests: number;
  confirmed_count: number;
}

interface TopOrganizer {
  id: number;
  name: string;
  district: string;
  total_reservations: number;
  confirmed_reservations: number;
  total_paid: string;
}

interface RecentReservation {
  id: number;
  reservation_date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_field_cost: string;
  amount_collected: string;
  target_amount: string;
  status: string;
  owner_approval_status: string;
  organizer_name: string;
  created_at: string;
  max_players: number;
  confirmed_count: number;
  collection_hours: number | null;
  attendance_hours: number | null;
}

interface DashboardData {
  user_info: UserInfo;
  stats: Stats;
  revenue_by_month: RevenueByMonth[];
  attendance_by_month: AttendanceByMonth[];
  popular_slots: PopularSlot[];
  peak_days: PeakDay[];
  top_organizers: TopOrganizer[];
  recent_reservations: RecentReservation[];
  revenue_by_day: RevenuePeriod[];
  revenue_by_month_detail: RevenuePeriod[];
  revenue_by_year: RevenuePeriod[];
  attendance_by_day: AttendancePeriod[];
  attendance_by_month_detail: AttendancePeriod[];
  attendance_by_year: AttendancePeriod[];
  generated_at: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
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
  const [activeTab, setActiveTab] = useState<'resumen' | 'analisis' | 'reservas'>('resumen');
  const [peakTab, setPeakTab] = useState<'slots' | 'days'>('slots');

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
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
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
      XLSX.utils.book_append_sheet(wb, ws, 'Reservas');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, response.data.filename);
    } catch (err) {
      alert('Error exportando a Excel');
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });

  const formatTime = (timeStr: string) =>
    String(timeStr).substring(0, 5);

  const formatHours = (hours: number | null) => {
    if (!hours) return '-';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const statusLabel = (status: string, approvalStatus: string) => {
    if (approvalStatus === 'pending_approval') return { label: 'Pendiente aprobación', color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' };
    if (status === 'confirmed') return { label: 'Confirmada', color: 'bg-green-500/20 border-green-500/30 text-green-300' };
    if (status === 'cancelled') return { label: 'Cancelada', color: 'bg-red-500/20 border-red-500/30 text-red-300' };
    if (status === 'pending') return { label: 'En proceso', color: 'bg-blue-500/20 border-blue-500/30 text-blue-300' };
    return { label: status, color: 'bg-gray-500/20 border-gray-500/30 text-gray-300' };
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
                ¿No tienes cuenta? Descarga nuestra app, regístrate y contáctanos a{' '}
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
  const isFree = stats.is_free;
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
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-white/50">
                  Bienvenido, {dashboardData.user_info.name}
                </p>
                {isFree && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-pichangon-accent/20 border border-pichangon-accent/30 text-pichangon-accent font-medium">
                    Cancha gratuita
                  </span>
                )}
              </div>
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
            {(['resumen', 'analisis', 'reservas'] as const).map((tab) => (
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
                {tab === 'reservas' && 'Reservas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 md:px-6 py-6">

        {/* ══════════════════════ RESUMEN ══════════════════════ */}
        {activeTab === 'resumen' && (
          <>
            {stats.pending_approval > 0 && (
              <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-5 py-4 flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <p className="text-yellow-300 text-sm font-medium">
                  Tienes <span className="font-bold">{stats.pending_approval}</span> {stats.pending_approval === 1 ? 'reserva pendiente' : 'reservas pendientes'} de aprobación
                </p>
              </div>
            )}

            {/* Stats Cards — condicional según tipo de cancha */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="TOTAL RESERVAS"
                value={stats.total_reservations}
                subtitle={`${stats.confirmed_reservations} confirmadas`}
              />
              <StatCard
                title="TASA DE RESERVAS CONCRETADAS"
                value={`${stats.approval_rate}%`}
                subtitle="Sobre el total de reservas solicitadas"
              />
              {isFree ? (
                <>
                  <StatCard
                    title="TASA DE QUÓRUM"
                    value={`${stats.quorum_rate}%`}
                    subtitle="Reservas con asistencia completa"
                  />
                  <StatCard
                    title="HORARIO MÁS RESERVADO"
                    value={stats.top_slot ?? '—'}
                    subtitle="Hora de inicio más solicitada"
                  />
                </>
              ) : (
                <>
                  <StatCard
                    title="INGRESOS TOTALES"
                    value={`S/ ${stats.total_revenue}`}
                    subtitle="Total recaudado"
                  />
                  <StatCard
                    title="JUGADORES ATENDIDOS"
                    value={stats.total_players_served}
                    subtitle="Total histórico"
                  />
                </>
              )}
            </div>

            {/* Gráfico principal — condicional */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                {isFree ? 'Asistentes por mes' : 'Ingresos por mes'}
              </h2>
              {isFree ? (
                dashboardData.attendance_by_month.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.attendance_by_month}>
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
                      <YAxis stroke="#ffffff40" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(15, 41, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '13px', padding: '12px' }}
                        labelFormatter={(value) => {
                          const [year, month] = value.split('-');
                          const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                          return `${months[parseInt(month) - 1]} ${year}`;
                        }}
                        formatter={(value: any) => [value, 'Asistentes']}
                      />
                      <Line
                        type="monotone"
                        dataKey="total_attendees"
                        stroke={CHART_COLORS.primary}
                        strokeWidth={3}
                        dot={{ fill: CHART_COLORS.primary, r: 5, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-white/50">
                    No hay datos disponibles
                  </div>
                )
              ) : (
                revenueData && revenueData.length > 0 ? (
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
                        contentStyle={{ backgroundColor: 'rgba(15, 41, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '13px', padding: '12px' }}
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
                )
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pipeline de reservas */}
              <PipelineChart
                pending={stats.pending_approval}
                inProcess={stats.approved_pending_payment}
                confirmed={stats.confirmed_reservations}
                cancelled={stats.cancelled_reservations}
              />

              {/* Slots populares / Días pico */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setPeakTab('slots')}
                    className={`px-4 py-2 text-sm rounded-lg ${peakTab === 'slots' ? 'bg-pichangon-accent text-white' : 'bg-white/10 text-white/60'}`}
                  >
                    Horarios populares
                  </button>
                  <button
                    onClick={() => setPeakTab('days')}
                    className={`px-4 py-2 text-sm rounded-lg ${peakTab === 'days' ? 'bg-pichangon-accent text-white' : 'bg-white/10 text-white/60'}`}
                  >
                    Días pico
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={peakTab === 'slots' ? dashboardData.popular_slots : dashboardData.peak_days}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey={peakTab === 'slots' ? 'slot_time' : 'day_name'}
                      stroke="#ffffff40"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis stroke="#ffffff40" style={{ fontSize: '12px' }} />
                    <Tooltip
                      cursor={false}
                      contentStyle={{ backgroundColor: 'rgba(15,41,25,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '13px', padding: '12px' }}
                      formatter={(value: any) => [`${value}`, 'Solicitudes']}
                    />
                    <Bar dataKey="total_requests" fill={CHART_COLORS.primary} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════ ANÁLISIS ══════════════════════ */}
        {activeTab === 'analisis' && (
          <div className="space-y-6">
            {/* Top Organizadores Recurrentes */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">Top Organizadores Recurrentes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-6 text-white/60 font-medium text-sm">Posición</th>
                      <th className="text-left py-3 px-6 text-white/60 font-medium text-sm">Nombre</th>
                      <th className="text-left py-3 px-6 text-white/60 font-medium text-sm">Distrito</th>
                      <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">Reservas</th>
                      <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">Confirmadas</th>
                      {!isFree && (
                        <th className="text-right py-3 px-6 text-white/60 font-medium text-sm">Total pagado</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.top_organizers.map((org, index) => (
                      <tr key={org.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-6 text-pichangon-accent font-semibold">{index + 1}</td>
                        <td className="py-3 px-6 text-white">{org.name}</td>
                        <td className="py-3 px-6 text-white/50 text-sm">{org.district}</td>
                        <td className="py-3 px-6 text-center text-white">{org.total_reservations}</td>
                        <td className="py-3 px-6 text-center text-green-300">{org.confirmed_reservations}</td>
                        {!isFree && (
                          <td className="py-3 px-6 text-right text-pichangon-accent font-medium">S/ {org.total_paid}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recaudación / Asistencia — condicional */}
            {isFree ? (
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Asistencia</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total asistentes',  value: stats.total_attendees,                                               color: 'text-white',             sub: undefined },
                    { label: 'Promedio diario',    value: stats.daily_avg_att,                                                color: 'text-pichangon-accent',  sub: undefined },
                    { label: 'Promedio mensual',   value: stats.monthly_avg_att,                                              color: 'text-pichangon-accent',  sub: undefined },
                    { label: 'Mejor día',          value: stats.best_day_label_att ? `${stats.best_day_attendees} asist.` : '—', color: 'text-pichangon-accent', sub: stats.best_day_label_att || undefined },
                  ].map((card) => (
                    <div key={card.label}>
                      <p className="text-xs text-white/50 uppercase tracking-wide text-center mb-2">{card.label}</p>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center h-20">
                        <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                        {card.sub && <p className="text-xs text-white/40 mt-1">{card.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Recaudación</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total recaudado',  value: `S/ ${stats.total_collected}`,                              color: 'text-white',            sub: undefined },
                    { label: 'Promedio diario',  value: `S/ ${stats.daily_avg}`,                                    color: 'text-pichangon-accent', sub: undefined },
                    { label: 'Promedio mensual', value: `S/ ${stats.monthly_avg}`,                                  color: 'text-pichangon-accent', sub: undefined },
                    { label: 'Mejor día',        value: stats.best_day_label ? `S/ ${stats.best_day_amount}` : '—', color: 'text-pichangon-accent', sub: stats.best_day_label || undefined },
                  ].map((card) => (
                    <div key={card.label}>
                      <p className="text-xs text-white/50 uppercase tracking-wide text-center mb-2">{card.label}</p>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center h-20">
                        <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                        {card.sub && <p className="text-xs text-white/40 mt-1">{card.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gráfico por período — condicional */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-4">
                {isFree ? 'Asistencia por período' : 'Recaudación por período'}
              </h2>
              {isFree ? (
                <AttendanceDetailChart
                  byDay={dashboardData.attendance_by_day ?? []}
                  byMonth={dashboardData.attendance_by_month_detail ?? []}
                  byYear={dashboardData.attendance_by_year ?? []}
                />
              ) : (
                <RevenueDetailChart
                  byDay={dashboardData.revenue_by_day ?? []}
                  byMonth={dashboardData.revenue_by_month_detail ?? []}
                  byYear={dashboardData.revenue_by_year ?? []}
                />
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════ RESERVAS ══════════════════════ */}
        {activeTab === 'reservas' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Reservas Recientes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-6 text-white/60 font-medium text-sm">Organizador</th>
                    <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">Solicitud</th>
                    <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">Fecha reserva</th>
                    <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">Horario</th>
                    {!isFree && (
                      <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">Costo cancha</th>
                    )}
                    <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">
                      {isFree ? 'Asistencia' : 'Recaudado'}
                    </th>
                    <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">
                      {isFree ? 'Tiempo asistencia completa' : 'Tiempo Pago Completo'}
                    </th>
                    <th className="text-center py-3 px-6 text-white/60 font-medium text-sm">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recent_reservations.map((r) => {
                    const s = statusLabel(r.status, r.owner_approval_status);
                    const createdAt = new Date(r.created_at);
                    const createdDate = createdAt.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
                    const createdTime = createdAt.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
                    const progressPct = isFree
                      ? (r.max_players > 0 ? Math.min((r.confirmed_count / r.max_players) * 100, 100) : 0)
                      : (parseFloat(r.total_field_cost) > 0 ? Math.min((parseFloat(r.amount_collected) / parseFloat(r.total_field_cost)) * 100, 100) : 0);

                    return (
                      <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-6 text-white">{r.organizer_name}</td>
                        <td className="py-3 px-6 text-center">
                          <p className="text-sm text-white/70">{createdDate}</p>
                          <p className="text-xs text-white/40">{createdTime}</p>
                        </td>
                        <td className="py-3 px-6 text-sm text-white/60 text-center">{formatDate(r.reservation_date)}</td>
                        <td className="py-3 px-6 text-center text-sm text-white/60">
                          {formatTime(r.start_time)} – {formatTime(r.end_time)}
                        </td>
                        {!isFree && (
                          <td className="py-3 px-6 text-center font-semibold text-pichangon-accent">
                            S/ {r.total_field_cost}
                          </td>
                        )}
                        <td className="py-3 px-6 text-center">
                          <div className="flex flex-col gap-1 w-[140px] mx-auto">
                            <div className="flex justify-between text-xs text-white/50">
                              {isFree ? (
                                <>
                                  <span>{r.confirmed_count} confirmados</span>
                                  <span>{r.max_players} máx</span>
                                </>
                              ) : (
                                <>
                                  <span>S/ {r.amount_collected}</span>
                                  <span>S/ {r.total_field_cost}</span>
                                </>
                              )}
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-pichangon-accent"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center text-sm text-white/70">
                          {isFree ? formatHours(r.attendance_hours) : formatHours(r.collection_hours)}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium border ${s.color}`}>
                            {s.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
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
// COMPONENTE: TARJETA DE ESTADÍSTICA
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

// ====================================================================
// COMPONENTE: PIPELINE CHART
// ====================================================================
function PipelineChart({ pending, inProcess, confirmed, cancelled }: {
  pending: number;
  inProcess: number;
  confirmed: number;
  cancelled: number;
}) {
  const items = [
    { label: 'Pendientes',  value: pending,   color: '#6ee7b7' },
    { label: 'En proceso',  value: inProcess, color: '#10b981' },
    { label: 'Confirmadas', value: confirmed, color: '#059669' },
    { label: 'Canceladas',  value: cancelled, color: '#2d6a4f' },
  ].filter(i => i.value > 0);

  const total = items.reduce((acc, i) => acc + i.value, 0);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl h-full">
      <h2 className="text-lg font-semibold text-white mb-2">Pipeline de reservas</h2>
      {total === 0 ? (
        <div className="h-[260px] flex items-center justify-center text-white/50 text-sm">
          No hay reservas aún
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
            >
              {items.map((item, index) => (
                <Cell key={index} fill={item.color} opacity={0.9} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(15,41,25,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '13px', padding: '10px 14px' }}
              itemStyle={{ color: '#ffffff' }}
              labelStyle={{ color: '#9ca3af' }}
              formatter={(value: any, name: string) => [
                `${value} (${Math.round(value / total * 100)}%)`,
                name
              ]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

// ====================================================================
// COMPONENTE: REVENUE DETAIL CHART (canchas de pago)
// ====================================================================
function RevenueDetailChart({ byDay = [], byMonth = [], byYear = [] }: {
  byDay?: { period: string; period_label: string; revenue: string }[];
  byMonth?: { period: string; period_label: string; revenue: string }[];
  byYear?: { period: string; period_label: string; revenue: string }[];
}) {
  const [tab, setTab] = React.useState<'day' | 'month' | 'year'>('day');
  const data = tab === 'day' ? byDay : tab === 'month' ? byMonth : byYear;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(['day', 'month', 'year'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-sm rounded-lg ${tab === t ? 'bg-pichangon-accent text-white' : 'bg-white/10 text-white/60'}`}
          >
            {t === 'day' ? 'Por día' : t === 'month' ? 'Por mes' : 'Por año'}
          </button>
        ))}
      </div>
      {data.length === 0 ? (
        <div className="h-[220px] flex items-center justify-center text-white/50 text-sm">
          No hay datos disponibles
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="period_label" stroke="#ffffff40" style={{ fontSize: '11px' }} />
            <YAxis stroke="#ffffff40" style={{ fontSize: '11px' }} tickFormatter={(v) => `S/ ${v}`} />
            <Tooltip
              cursor={false}
              contentStyle={{ backgroundColor: 'rgba(15,41,25,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '13px', padding: '10px 14px' }}
              itemStyle={{ color: '#ffffff' }}
              labelStyle={{ color: '#9ca3af' }}
              formatter={(value: any) => [`S/ ${parseFloat(value).toFixed(2)}`, 'Recaudado']}
            />
            <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

// ====================================================================
// COMPONENTE: ATTENDANCE DETAIL CHART (canchas gratuitas)
// ====================================================================
function AttendanceDetailChart({ byDay = [], byMonth = [], byYear = [] }: {
  byDay?: { period: string; period_label: string; attendees: number }[];
  byMonth?: { period: string; period_label: string; attendees: number }[];
  byYear?: { period: string; period_label: string; attendees: number }[];
}) {
  const [tab, setTab] = React.useState<'day' | 'month' | 'year'>('day');
  const data = tab === 'day' ? byDay : tab === 'month' ? byMonth : byYear;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(['day', 'month', 'year'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-sm rounded-lg ${tab === t ? 'bg-pichangon-accent text-white' : 'bg-white/10 text-white/60'}`}
          >
            {t === 'day' ? 'Por día' : t === 'month' ? 'Por mes' : 'Por año'}
          </button>
        ))}
      </div>
      {data.length === 0 ? (
        <div className="h-[220px] flex items-center justify-center text-white/50 text-sm">
          No hay datos disponibles
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="period_label" stroke="#ffffff40" style={{ fontSize: '11px' }} />
            <YAxis stroke="#ffffff40" style={{ fontSize: '11px' }} />
            <Tooltip
              cursor={false}
              contentStyle={{ backgroundColor: 'rgba(15,41,25,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '13px', padding: '10px 14px' }}
              itemStyle={{ color: '#ffffff' }}
              labelStyle={{ color: '#9ca3af' }}
              formatter={(value: any) => [value, 'Asistentes']}
            />
            <Bar dataKey="attendees" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

// ====================================================================
// WRAPPER CON GOOGLE PROVIDER
// ====================================================================
function FieldOwnerDashboard() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <FieldOwnerDashboardContent />
    </GoogleOAuthProvider>
  );
}

export default FieldOwnerDashboard;