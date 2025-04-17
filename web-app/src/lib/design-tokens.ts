export const designTokens = {
  colors: {
    primary: {
      blue: '#1F9FC0',
      teal: '#4BB9A6',
    },
    background: {
      card: 'white',
      main: '#F8F9FA',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      muted: '#9CA3AF',
    },
    border: '#E5E7EB',
  },
  spacing: {
    card: 'p-6',
    container: 'p-4 sm:p-6 lg:p-8',
    stack: 'space-y-4',
  },
  radius: {
    card: 'rounded-xl',
    button: 'rounded-lg',
    input: 'rounded-lg',
  },
  shadows: {
    card: 'shadow-lg shadow-gray-200/50',
    hover: 'hover:shadow-xl transition-shadow duration-200',
  },
} as const;

export const gradients = {
  primary: 'bg-gradient-to-r from-[#1F9FC0] to-[#4BB9A6]',
  hover: 'hover:from-[#1B8FAD] hover:to-[#43A695]',
} as const; 