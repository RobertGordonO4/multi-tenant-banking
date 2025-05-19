// Theme definition
export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  text: string
  headerBackground: string
  headerText: string
  // Add more color definitions as needed
  error?: string
  success?: string
  warning?: string
}

export interface ThemeTypography {
  fontFamily: string
  fontSize: string
  // Add more typography definitions
}

export interface Theme {
  colors: ThemeColors
  typography?: ThemeTypography // Optional
  logoUrl?: string // Relative path to logo in /public/assets/logos or full URL
  spacing?: {
    small: string
    medium: string
    large: string
  }
  borderRadius?: string
}

// Label definition
export interface Label {
  id: string
  name: string
  config?: Record<string, any> // For label-specific configurations like feature flags
}

// Tenant definition
export interface Tenant {
  id: string
  name: string
  theme: Partial<Theme> // Allows overriding parts of the default theme
  labels: Label[]
}

// User definition
export interface User {
  id: string
  username: string
  accessibleTenantIds: string[] // List of tenant IDs this user can access
}
