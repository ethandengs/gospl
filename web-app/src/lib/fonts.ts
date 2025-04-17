import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const fonts = {
  sans: GeistSans.variable,
  mono: GeistMono.variable,
  heading: 'vortice-concept',
} as const;

export const fontClass = `${fonts.sans} ${fonts.mono} font-sans antialiased`;

// Font weights
export const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Font styles
export const fontStyles = {
  normal: 'normal',
  italic: 'italic',
} as const; 