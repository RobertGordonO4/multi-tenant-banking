import { create } from 'zustand'
import { Tenant, Label, Theme } from '../types'
import { mockTenantData } from '../config/mockData'
import { defaultTheme } from '../config/theme'
import merge from 'lodash/merge'

interface TenantState {
  allTenantsData: Tenant[] // All tenants data available to the system
  currentTenantId: string | null
  currentLabelId: string | null

  currentTenantDetails: Tenant | null
  currentLabelDetails: Label | null
  currentTheme: Theme

  // Actions
  loadInitialData: () => void // To load all tenant data
  setCurrentTenantAndLabel: (tenantId: string, labelId: string) => void
  clearTenantContext: () => void
}

export const useTenantStore = create<TenantState>((set, get) => ({
  allTenantsData: [],
  currentTenantId: null,
  currentLabelId: null,
  currentTenantDetails: null,
  currentLabelDetails: null,
  currentTheme: defaultTheme,

  loadInitialData: () => {
    // In a real app, this would fetch from an API
    set({ allTenantsData: mockTenantData })
  },

  setCurrentTenantAndLabel: (tenantId, labelId) => {
    const { allTenantsData } = get()
    const tenant = allTenantsData.find((t) => t.id === tenantId)

    if (!tenant) {
      console.error(`Tenant with ID ${tenantId} not found.`)
      set({
        currentTenantId: null,
        currentLabelId: null,
        currentTenantDetails: null,
        currentLabelDetails: null,
        currentTheme: defaultTheme,
      })
      return
    }

    const label = tenant.labels.find((l) => l.id === labelId)

    if (!label) {
      console.error(`Label with ID ${labelId} not found in tenant ${tenantId}.`)
      // Potentially fall back to first label or clear context
      set({
        currentTenantId: tenantId,
        currentLabelId: null,
        currentTenantDetails: tenant,
        currentLabelDetails: null,
        currentTheme: merge({}, defaultTheme, tenant.theme), // Theme of tenant, but no label
      })
      return
    }

    const newTheme = merge({}, defaultTheme, tenant.theme)

    set({
      currentTenantId: tenantId,
      currentLabelId: labelId,
      currentTenantDetails: tenant,
      currentLabelDetails: label,
      currentTheme: newTheme,
    })
  },

  clearTenantContext: () => {
    set({
      currentTenantId: null,
      currentLabelId: null,
      currentTenantDetails: null,
      currentLabelDetails: null,
      currentTheme: defaultTheme,
    })
  },
}))
