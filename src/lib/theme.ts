/**
 * 🎨 PICHANGON THEME
 * Colores centralizados basados en el theme de Flutter
 * Réplica exacta del theme.dart de la app móvil
 */

export const PichangonColors = {
  // ✅ Dark Mode Colors (Default)
  darkBackground: '#1A5A3E',
  darkCardBackground: '#2B6B4F',
  white: '#FFFFFF',
  lightGrey: '#AAAAAA',
  alertRed: '#CC0000',
  
  // ✅ Light Mode Colors
  lightBackground: '#FBFBFB',
  lightCardBackground: '#FFFFFF',
  darkGreen: '#003000',
  mediumGrey: '#666666',
  
  // ✅ Principal & Green variations
  accentGreen: '#10B981',
  greenDark: '#0C3E2F',
  greenMedium: '#2B6B4F',
  greenLight: '#B3E5BC',
  
  // ✅ Additional Colors
  blueLight: '#3B82F6',
  yellowWarn: '#F59E0B',
  yellowWarnDark: '#D97706',
  
  // ✅ Success/Error Text Colors
  darkSuccessText: '#15803D',
  lightSuccessText: '#166534',
  darkErrorText: '#991B1B',
  lightErrorText: '#7F1D1D',
  
  // ✅ GRADIENTES DE FONDO OSCURO
  gradientDarkTop: '#1F5438',
  gradientDarkCenter: '#163F2C',
  gradientDarkBottom: '#0A1F15',
  
  // ✅ GRADIENTES DE FONDO CLARO
  gradientLightTop: '#FAFBFA',
  gradientLightBottom: '#F5F7F6',
  
  // ✅ GRADIENTES PARA CARDS OSCURO
  cardGradientDarkStart: '#2D5F47',
  cardGradientDarkEnd: '#1F4A37',
  
  // ✅ GRADIENTES PARA CARDS CLARO
  cardGradientLightStart: '#F0FDF4',
  cardGradientLightEnd: '#F0FDF4',
  
  // ✅ BOTTOM NAV BAR OSCURO
  bottomNavDarkTop: '#0A1F15',
  bottomNavDarkBottom: '#0A1F15',
  
  // ✅ GLASSMORPHISM COLORS
  glass05: 'rgba(16, 185, 129, 0.05)',
  glass08: 'rgba(56, 142, 60, 0.08)',
  glass10: 'rgba(16, 185, 129, 0.10)',
  glass12: 'rgba(16, 185, 129, 0.12)',
  glass15: 'rgba(56, 142, 60, 0.15)',
  glass18: 'rgba(16, 185, 129, 0.18)',
  glass20: 'rgba(56, 142, 60, 0.20)',
  glass25: 'rgba(56, 142, 60, 0.25)',
  glass30: 'rgba(56, 142, 60, 0.30)',
  glass40: 'rgba(56, 142, 60, 0.40)',
  glass45: 'rgba(56, 142, 60, 0.45)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  glassShimmer: 'rgba(255, 255, 255, 0.10)',
  glassGlow: '#10B981',
} as const;

/**
 * 🎨 GRADIENTES PREDEFINIDOS
 * Equivalente a AppGradients en Flutter
 */
export const AppGradients = {
  // 🎨 Gradiente de fondo principal OSCURO
  backgroundDark: `linear-gradient(180deg, 
    ${PichangonColors.gradientDarkTop} 0%, 
    ${PichangonColors.gradientDarkCenter} 50%, 
    ${PichangonColors.gradientDarkBottom} 100%)`,
  
  // 🎨 Gradiente de fondo principal CLARO
  backgroundLight: `linear-gradient(180deg, 
    ${PichangonColors.gradientLightTop} 0%, 
    ${PichangonColors.gradientLightBottom} 100%)`,
  
  // 🎨 Gradiente para cards OSCURO
  cardDark: `linear-gradient(135deg, 
    ${PichangonColors.cardGradientDarkStart} 0%, 
    ${PichangonColors.cardGradientDarkEnd} 100%)`,
  
  // 🎨 Gradiente para cards CLARO
  cardLight: `linear-gradient(135deg, 
    ${PichangonColors.cardGradientLightStart} 0%, 
    ${PichangonColors.cardGradientLightEnd} 100%)`,
  
  // 🎨 Gradiente para BottomNavigationBar
  bottomNavDark: `linear-gradient(180deg, 
    rgba(10, 31, 21, 0.95) 0%, 
    ${PichangonColors.bottomNavDarkBottom} 100%)`,
} as const;

/**
 * 🎨 UTILIDADES DE TEMA
 */
export const getBackgroundGradient = (isDark: boolean): string => {
  return isDark ? AppGradients.backgroundDark : AppGradients.backgroundLight;
};

export const getCardGradient = (isDark: boolean): string => {
  return isDark ? AppGradients.cardDark : AppGradients.cardLight;
};

export const getCardBorderColor = (isDark: boolean): string => {
  return isDark 
    ? `rgba(255, 255, 255, 0.08)` 
    : `rgba(16, 185, 129, 0.12)`;
};

export const getTextColor = (isDark: boolean): string => {
  return isDark ? PichangonColors.white : PichangonColors.darkGreen;
};

export const getSecondaryTextColor = (isDark: boolean): string => {
  return isDark ? PichangonColors.lightGrey : PichangonColors.mediumGrey;
};

/**
 * 🎨 CLASES DE TAILWIND PRECONSTRUIDAS
 * Para usar directamente en componentes
 */
export const TailwindClasses = {
  // Backgrounds
  bgGradientDark: 'bg-gradient-dark',
  bgGradientLight: 'bg-gradient-light',
  
  // Cards
  cardDark: 'bg-gradient-card-dark border border-white/[0.08]',
  cardLight: 'bg-gradient-card-light border border-pichangon-accent/[0.12]',
  
  // Glass effects
  glassDark: 'bg-pichangon-glass-20 backdrop-blur-md border border-pichangon-glass-border',
  glassLight: 'bg-white/50 backdrop-blur-md border border-pichangon-accent/[0.12]',
  
  // Text colors
  textPrimary: 'text-white dark:text-white',
  textSecondary: 'text-white/80 dark:text-white/80',
  textMuted: 'text-white/60 dark:text-white/60',
} as const;

export default PichangonColors;