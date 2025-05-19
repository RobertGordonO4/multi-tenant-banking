import { Theme } from '../types' // Ensure Theme is imported from your types

export const defaultTheme: Theme = {
  colors: {
    primary: '#007bff', // Default blue
    secondary: '#6c757d', // Default gray
    background: '#f8f9fa',
    text: '#212529',
    headerBackground: '#343a40',
    headerText: '#ffffff',
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
  },
  logoUrl: 'default-logo.png',
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  borderRadius: '4px',
  dashboard: {
    gap: '5px',
  },
}
