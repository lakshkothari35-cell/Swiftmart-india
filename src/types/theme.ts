export type ThemeType = 'light' | 'dark' | 'swift' | 'diwali' | 'holi';

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  card: string;
  border: string;
  textMuted: string;
}

export interface ThemeDefinition {
  id: ThemeType;
  name: string;
  colors: ThemeColors;
  threed: {
    intensity: number;
    ambientColor: string;
    lightColor: string;
    environment: 'city' | 'sunset' | 'night' | 'warehouse';
  };
}
