import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useTenantStore } from '../store/tenantStore'
import { defaultTheme } from '../config/theme'

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentTheme = useTenantStore((state) => state.currentTheme)
  const isInitialized = useTenantStore(
    (state) => !!state.currentTenantId || state.allTenantsData.length > 0
  )

  // Use default theme until tenant context is established, or if no specific theme,
  // currentTheme from store will already be correctly merged.
  const themeToApply = isInitialized ? currentTheme : defaultTheme

  return <ThemeProvider theme={themeToApply}>{children}</ThemeProvider>
}
