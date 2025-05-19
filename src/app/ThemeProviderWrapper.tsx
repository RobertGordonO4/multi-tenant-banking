import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useTenantStore } from '../store/tenantStore'
import { defaultTheme } from '../config/theme'
import { Theme } from '../types' // Import your full Theme type
import merge from 'lodash/merge' // For deep merging themes

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentThemeFromStore = useTenantStore((state) => state.currentTheme)
  const currentLabelDetails = useTenantStore(
    (state) => state.currentLabelDetails
  )
  const isInitialized = useTenantStore(
    (state) => !!state.currentTenantId || state.allTenantsData.length > 0
  )

  let themeToApply: Theme = defaultTheme

  if (isInitialized) {
    // currentThemeFromStore already has tenant-level theme overrides merged with defaultTheme
    // Now, we apply label-specific config overrides ON TOP of that
    let labelModifiedTheme = merge({}, currentThemeFromStore) // Create a new object to avoid mutating store's theme directly

    if (currentLabelDetails?.config?.weWantSquares) {
      labelModifiedTheme.borderRadius = '0px'
    }

    if (typeof currentLabelDetails?.config?.dashboardGap === 'number') {
      // Ensure the dashboard object exists
      if (!labelModifiedTheme.dashboard) {
        // This case should ideally not happen if currentThemeFromStore is properly initialized
        // with defaultTheme, which has a dashboard object.
        labelModifiedTheme.dashboard = { gap: defaultTheme.dashboard.gap }
      }
      labelModifiedTheme.dashboard.gap = `${currentLabelDetails.config.dashboardGap}px`
    }

    themeToApply = labelModifiedTheme
  }

  return <ThemeProvider theme={themeToApply}>{children}</ThemeProvider>
}
