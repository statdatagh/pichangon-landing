// src/components/ResetPasswordPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AlertCircle, CheckCircle, Eye, EyeOff, Lock, KeyRound } from 'lucide-react';

// ✅ MISMA URL QUE SUPPORTSSECTION - Consistencia en toda la app
const API_BASE_URL = 'https://pichangon.onrender.com/api';

// ✅ Toast simple sin dependencias
const showToast = (message: string, type: 'success' | 'error') => {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 24px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(toast);
      document.head.removeChild(style);
    }, 300);
  }, 3000);
};

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const token = searchParams.get('token');
  const errorParam = searchParams.get('error');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (errorParam) {
      const errorMessages: { [key: string]: string } = {
        'no-token': 'El enlace está incompleto',
        'invalid-token': 'El enlace es inválido o ya expiró',
        'server-error': 'Error del servidor. Intenta nuevamente',
      };
      setError(errorMessages[errorParam] || 'Error desconocido');
    }
  }, [errorParam]);

  const validatePassword = (pwd: string): string[] => {
    const errors: string[] = [];
    if (pwd.length < 6) errors.push('Mínimo 6 caracteres');
    if (!/(?=.*[a-z])/.test(pwd)) errors.push('Debe contener minúscula');
    if (!/(?=.*[A-Z])/.test(pwd)) errors.push('Debe contener mayúscula');
    if (!/(?=.*\d)/.test(pwd)) errors.push('Debe contener número');
    return errors;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) {
      setPasswordErrors(validatePassword(value));
    } else {
      setPasswordErrors([]);
    }
    setError('');
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => navigate('/'), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pwdErrors = validatePassword(password);
    if (pwdErrors.length > 0) {
      setPasswordErrors(pwdErrors);
      setError(pwdErrors[0]);
      showToast(pwdErrors[0], 'error');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      showToast('Las contraseñas no coinciden', 'error');
      return;
    }

    if (!token) {
      setError('Token no válido');
      showToast('Token no válido', 'error');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        showToast('Contraseña actualizada exitosamente', 'success');
      } else {
        setError(result.message || 'Error actualizando contraseña');
        showToast(result.message || 'Error actualizando contraseña', 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión con el servidor');
      showToast('Error de conexión', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#2d5f3f] via-[#3a7a4f] to-[#2d5f3f] animate-in fade-in flex flex-col min-h-screen overflow-hidden">
      {/* Patrón de fondo igual a la landing */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCAxNGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      {/* Logo Header - igual a la landing */}
      <div className="relative z-20 p-4 md:p-6">
        <div className="flex items-center gap-2">
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
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 overflow-y-auto">
        {/* Card del modal */}
        <Card className="relative max-w-lg w-full p-8 md:p-12 bg-white/10 backdrop-blur-xl border-2 border-white/30 animate-in zoom-in-95 duration-300 shadow-2xl my-8">
          {success ? (
            <>
              {/* ✅ ÉXITO */}
              <div className="flex flex-col items-center text-center">
                {/* Ícono con animación */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 animate-in zoom-in duration-500 shadow-lg border-2 border-white/30">
                  <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  ¡Contraseña actualizada!
                </h2>

                {/* Descripción */}
                <p className="text-white/90 text-base md:text-lg mb-6">
                  Tu contraseña ha sido cambiada exitosamente.
                </p>

                {/* Info box */}
                <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-xl p-5 mb-6 w-full text-center shadow-sm">
                  <p className="text-sm md:text-base font-bold text-white mb-3">
                    Ya puedes usar PICHANGON
                  </p>
                  <ul className="text-sm text-white/90 space-y-2">
                    <li>Abre la app en tu teléfono para iniciar sesión</li>
                    <li>O descárgala si aún no la tienes</li>
                  </ul>
                </div>

                {/* Botón */}
                <div className="w-full">
                  <Button
                    onClick={handleClose}
                    size="lg"
                    className="w-full bg-white/20 text-white hover:bg-white hover:text-[#2d5f3f] font-semibold border-2 border-white transition-all"
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </>
          ) : errorParam || !token ? (
            <>
              {/* ❌ ERROR */}
              <div className="flex flex-col items-center text-center">
                {/* Ícono con animación */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-500/30 backdrop-blur-sm flex items-center justify-center mb-6 animate-in zoom-in duration-500 shadow-lg border-2 border-red-400/50">
                  <AlertCircle className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  Error de verificación
                </h2>

                {/* Descripción */}
                <p className="text-white/90 text-base md:text-lg mb-6">
                  {error || 'El enlace de recuperación es inválido o ya expiró.'}
                </p>

                {/* Info box de error */}
                <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400/40 rounded-xl p-5 mb-6 w-full text-center shadow-sm">
                  <p className="text-sm md:text-base font-bold text-white mb-3">
                    Posibles causas:
                  </p>
                  <ul className="text-sm text-white/90 space-y-2">
                    <li>El enlace ya fue utilizado</li>
                    <li>El enlace ha expirado (válido por 1 hora)</li>
                    <li>El enlace está dañado o incompleto</li>
                  </ul>
                </div>

                {/* Botón */}
                <div className="w-full">
                  <Button
                    onClick={handleClose}
                    size="lg"
                    className="w-full bg-white/20 text-white hover:bg-white hover:text-[#2d5f3f] font-semibold border-2 border-white transition-all"
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 📝 FORMULARIO */}
              <div className="flex flex-col items-center">
                {/* Ícono */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 animate-in zoom-in duration-500 shadow-lg border-2 border-white/30">
                  <KeyRound className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white text-center">
                  Nueva contraseña
                </h2>

                {/* Descripción */}
                <p className="text-white/90 text-base md:text-lg mb-6 text-center">
                  Ingresa tu nueva contraseña
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                  {/* Nueva contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nueva contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 pointer-events-none z-10" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        className="w-full pl-10 pr-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus-visible:border-white/50"
                        placeholder="Mínimo 6 caracteres"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    
                    {/* Requisitos de contraseña */}
                    {password && (
                      <div className="mt-2 space-y-1">
                        {['Mínimo 6 caracteres', 'Debe contener minúscula', 'Debe contener mayúscula', 'Debe contener número'].map((req, idx) => {
                          const isValid = !passwordErrors.includes(req);
                          return (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <div className={`w-1.5 h-1.5 rounded-full ${isValid ? 'bg-green-400' : 'bg-white/30'}`} />
                              <span className={isValid ? 'text-green-400' : 'text-white/50'}>{req}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Confirmar contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Confirmar contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 pointer-events-none z-10" />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setError('');
                        }}
                        className="w-full pl-10 pr-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus-visible:border-white/50"
                        placeholder="Repite tu contraseña"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    
                    {/* Indicador de coincidencia */}
                    {confirmPassword && (
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full ${password === confirmPassword ? 'bg-green-400' : 'bg-red-400'}`} />
                        <span className={password === confirmPassword ? 'text-green-400' : 'text-red-400'}>
                          {password === confirmPassword ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Error general */}
                  {error && (
                    <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400/40 rounded-xl p-3">
                      <p className="text-sm text-white flex items-start gap-2">
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Botón submit */}
                  <Button
                    type="submit"
                    disabled={loading || passwordErrors.length > 0 || password !== confirmPassword || !password || !confirmPassword}
                    size="lg"
                    className="w-full bg-white/20 text-white hover:bg-white hover:text-[#2d5f3f] font-semibold border-2 border-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Actualizando...
                      </span>
                    ) : (
                      'Actualizar contraseña'
                    )}
                  </Button>
                </form>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Footer - igual a la landing */}
      <div className="relative z-20 py-4 md:py-6 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 text-xs md:text-sm">
            © 2025 PICHANGON. Plataforma digital para fútbol amateur en Perú.  
            Pichangón es una plataforma operada bajo la marca PICHANGÓN DEL BARRIO.
          </p>
        </div>
      </div>
    </div>
  );
}