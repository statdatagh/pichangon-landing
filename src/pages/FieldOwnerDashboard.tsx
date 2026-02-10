// src/pages/FieldOwnerDashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://pichangon.onrender.com/api';
const GOOGLE_CLIENT_ID = '100841142335-0p0vtr494m7l7mk4h84uvtgmmtcmth5m.apps.googleusercontent.com';

// ✅ COLORES ADAPTADOS A LA LANDING
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

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

interface FieldTypeData {
  field_type: string;
  total_count: number;
  completed_count: number;
  avg_occupancy: string;
  revenue: string;
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
  occupancy_by_field_type: FieldTypeData[];
  recent_pichangas: RecentPichanga[];
  top_participants: TopParticipant[];
  payment_stats: PaymentStats;
  generated_at: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
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
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'pichangas'>('overview');

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
      console.log('🔐 Google login iniciado');
      
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
      
      console.log('✅ Login con Google exitoso');
    } catch (err: any) {
      console.error('❌ Error en Google login:', err);
      
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
    console.error('❌ Google login falló');
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
  // 🔐 PANTALLA DE LOGIN - ESTILO LANDING
  // ====================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] via-60% to-[#051108]">
        {/* Navbar */}
        <nav className="sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                  <img 
                    src="https://res.cloudinary.com/davyafbvj/image/upload/v1754813192/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc_vho8ni.png"
                    alt="PICHANGON Logo"
                    className="w-full h-full object-contain drop-shadow-lg"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <span className="text-white text-lg md:text-xl font-bold">PICHANGON</span>
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="text-white/80 hover:text-white text-sm md:text-base px-4 py-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                ← Volver al inicio
              </button>
            </div>
          </div>
        </nav>

        {/* Contenido central */}
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pichangon-accent/20 border border-pichangon-accent/30 mb-6">
                <span className="text-pichangon-accent text-sm font-medium">Dashboard para Dueños de Canchas</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Accede a tu
                <br />
                <span className="bg-gradient-to-r from-pichangon-accent to-green-400 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              
              <p className="text-white/70 text-lg">
                Gestiona tus canchas y visualiza estadísticas en tiempo real
              </p>
            </div>

            {/* Card de Login */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              {/* ✅ BOTÓN DE GOOGLE */}
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

              {/* Divisor */}
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
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
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
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Contraseña
                  </label>
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
                ¿No tienes cuenta?{' '}
                <a href="/" className="text-pichangon-accent hover:text-pichangon-accent/80 font-medium">
                  Regístrate aquí
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================================
  // 📊 PANTALLA DE CARGA
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
  const fieldTypeData = dashboardData.occupancy_by_field_type;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] via-60% to-[#051108]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F2919]/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Dashboard de Pichangas
              </h1>
              <p className="text-sm text-white/60 mt-1">
                Bienvenido, {dashboardData.user_info.name}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar
              </button>
              <button
                onClick={() => loadDashboard(localStorage.getItem('field_owner_token') || '')}
                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                🔄 Actualizar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#0F2919]/50 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {(['overview', 'analytics', 'pichangas'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-pichangon-accent text-pichangon-accent'
                    : 'border-transparent text-white/60 hover:text-white/80'
                }`}
              >
                {tab === 'overview' && '📊 Resumen'}
                {tab === 'analytics' && '📈 Análisis'}
                {tab === 'pichangas' && '⚽ Pichangas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Pichangas"
                value={stats.total_pichangas}
                icon="⚽"
                color="bg-pichangon-accent"
                subtitle={`${stats.completed_pichangas} completadas`}
              />
              <StatCard
                title="Ingresos Totales"
                value={`S/ ${stats.total_revenue}`}
                icon="💰"
                color="bg-blue-500"
                subtitle="Acumulado"
              />
              <StatCard
                title="Ocupación Promedio"
                value={`${stats.avg_occupancy}%`}
                icon="📊"
                color="bg-purple-500"
                subtitle="De capacidad"
              />
              <StatCard
                title="Jugadores Atendidos"
                value={stats.total_players_served}
                icon="👥"
                color="bg-orange-500"
                subtitle="Total"
              />
            </div>

            {/* Revenue Chart */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl mb-8">
              <h2 className="text-xl font-bold text-white mb-6">Ingresos por Mes (últimos 12 meses)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month_name" stroke="#ffffff80" />
                  <YAxis stroke="#ffffff80" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 41, 25, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Ingresos (S/)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Field Type Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-6">Ocupación por Tipo de Cancha</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={fieldTypeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="field_type" stroke="#ffffff80" />
                    <YAxis stroke="#ffffff80" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 41, 25, 0.95)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="avg_occupancy" fill="#3b82f6" name="Ocupación %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-6">Distribución de Ingresos</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={fieldTypeData}
                      dataKey="revenue"
                      nameKey="field_type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {fieldTypeData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 41, 25, 0.95)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Top Participants */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Top 10 Jugadores Recurrentes</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/80 font-medium">#</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Nombre</th>
                      <th className="text-right py-3 px-4 text-white/80 font-medium">Participaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.top_participants.map((participant, index) => (
                      <tr key={participant.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-pichangon-accent">{index + 1}</td>
                        <td className="py-3 px-4 text-white">{participant.name}</td>
                        <td className="py-3 px-4 text-right font-semibold text-white">{participant.times_participated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Estadísticas de Pagos</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                  <p className="text-3xl font-bold text-blue-300">
                    {dashboardData.payment_stats.total_participants}
                  </p>
                  <p className="text-sm text-white/60 mt-1">Total Participantes</p>
                </div>
                <div className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                  <p className="text-3xl font-bold text-green-300">
                    {dashboardData.payment_stats.paid_participants}
                  </p>
                  <p className="text-sm text-white/60 mt-1">Pagos Confirmados</p>
                </div>
                <div className="text-center p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                  <p className="text-3xl font-bold text-yellow-300">
                    {dashboardData.payment_stats.pending_proofs}
                  </p>
                  <p className="text-sm text-white/60 mt-1">Pendientes</p>
                </div>
                <div className="text-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                  <p className="text-3xl font-bold text-red-300">
                    {dashboardData.payment_stats.rejected_proofs}
                  </p>
                  <p className="text-sm text-white/60 mt-1">Rechazados</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pichangas' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Pichangas Recientes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Título</th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Fecha</th>
                    <th className="text-center py-3 px-4 text-white/80 font-medium">Ocupación</th>
                    <th className="text-right py-3 px-4 text-white/80 font-medium">Ingresos</th>
                    <th className="text-center py-3 px-4 text-white/80 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recent_pichangas.map((pichanga) => (
                    <tr key={pichanga.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-medium text-white">{pichanga.title}</td>
                      <td className="py-3 px-4 text-sm text-white/60">
                        {new Date(pichanga.date_time).toLocaleString('es-PE', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-sm">
                          {pichanga.current_players}/{pichanga.max_players}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-pichangon-accent">
                        S/ {pichanga.total_collected}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
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
// 📊 COMPONENTE: TARJETA DE ESTADÍSTICA
// ====================================================================
function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-white/60 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-xs text-white/50 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`${color} text-white p-4 rounded-full`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}

// ✅ WRAPPER CON GOOGLE PROVIDER
function FieldOwnerDashboard() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <FieldOwnerDashboardContent />
    </GoogleOAuthProvider>
  );
}

export default FieldOwnerDashboard;