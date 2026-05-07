import { ThemeDefinition } from '../types/theme';

export const THEMES: ThemeDefinition[] = [
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      background: '#020617', // slate-950
      foreground: '#ffffff',
      primary: '#00f2ff', // swift cyan
      secondary: '#7000ff', // swift purple
      accent: '#00f2ff',
      card: 'rgba(30, 41, 59, 0.5)', // slate-800/50
      border: 'rgba(255, 255, 255, 0.1)',
      textMuted: '#94a3b8' // slate-400
    },
    threed: {
      intensity: 1.5,
      ambientColor: '#404040',
      lightColor: '#00f2ff',
      environment: 'night'
    }
  },
  {
    id: 'light',
    name: 'Light Mode',
    colors: {
      background: '#f8fafc', // slate-50
      foreground: '#020617',
      primary: '#0ea5e9', // lighter blue
      secondary: '#6366f1',
      accent: '#0369a1',
      card: '#ffffff',
      border: 'rgba(0, 0, 0, 0.05)',
      textMuted: '#64748b' // slate-500
    },
    threed: {
      intensity: 2,
      ambientColor: '#ffffff',
      lightColor: '#ffffff',
      environment: 'city'
    }
  },
  {
    id: 'swift',
    name: 'Swift Brand',
    colors: {
      background: '#0f172a',
      foreground: '#ffffff',
      primary: '#facc15', // yellow
      secondary: '#000000',
      accent: '#facc15',
      card: 'rgba(30, 41, 59, 0.8)',
      border: 'rgba(250, 204, 21, 0.2)',
      textMuted: '#94a3b8'
    },
    threed: {
      intensity: 1.8,
      ambientColor: '#facc15',
      lightColor: '#ffffff',
      environment: 'warehouse'
    }
  },
  {
    id: 'diwali',
    name: 'Diwali Special 🪔',
    colors: {
      background: '#450a0a', // deep maroon
      foreground: '#fef3c7', // amber soft
      primary: '#fbbf24', // gold
      secondary: '#b91c1c', // red
      accent: '#f59e0b',
      card: 'rgba(127, 29, 29, 0.4)',
      border: 'rgba(251, 191, 36, 0.3)',
      textMuted: '#fcd34d'
    },
    threed: {
      intensity: 2.5,
      ambientColor: '#fbbf24',
      lightColor: '#f59e0b',
      environment: 'sunset'
    }
  },
  {
    id: 'holi',
    name: 'Holi Festival 🎨',
    colors: {
      background: '#fdf2f8', // pink-50
      foreground: '#831843', // maroon-900
      primary: '#ec4899', // pink-500
      secondary: '#8b5cf6', // violet-500
      accent: '#10b981', // emerald-500
      card: '#ffffff',
      border: 'rgba(236, 72, 153, 0.2)',
      textMuted: '#be185d'
    },
    threed: {
      intensity: 1.5,
      ambientColor: '#ec4899',
      lightColor: '#8b5cf6',
      environment: 'city'
    }
  }
];
