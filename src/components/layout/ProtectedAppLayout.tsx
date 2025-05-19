import React, { useEffect } from 'react'
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useTenantStore } from '../../store/tenantStore'
import Header from './Header'
import styled from 'styled-components'

const AppLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`

const ProtectedAppLayout: React.FC = () => {
  const { tenantId, labelId } = useParams<{
    tenantId: string
    labelId: string
  }>()
  const navigate = useNavigate()
  const location = useLocation()

  const { user, isAuthenticated } = useAuthStore()
  const {
    allTenantsData,
    setCurrentTenantAndLabel,
    loadInitialData,
    currentTenantId: storeTenantId,
    currentLabelId: storeLabelId,
  } = useTenantStore()

  useEffect(() => {
    if (allTenantsData.length === 0) {
      loadInitialData()
    }
  }, [loadInitialData, allTenantsData.length])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true })
      return
    }

    if (!user || allTenantsData.length === 0 || !tenantId || !labelId) {
      // Data still loading or params missing, can add loading state or redirect
      // If params are missing and user is authenticated, they should be at select-context
      if (isAuthenticated && (!tenantId || !labelId)) {
        navigate('/app/select-context', { replace: true })
      }
      return
    }

    // Prevent re-setting if context is already correct and matches URL
    if (tenantId === storeTenantId && labelId === storeLabelId) {
      return
    }

    const tenant = allTenantsData.find((t) => t.id === tenantId)

    if (!tenant || !user.accessibleTenantIds.includes(tenantId)) {
      console.warn(`Access denied or tenant ${tenantId} not found.`)
      navigate('/app/select-context?error=invalid_tenant', { replace: true })
      return
    }

    const label = tenant.labels.find((l) => l.id === labelId)
    if (!label) {
      console.warn(`Label ${labelId} not found in tenant ${tenantId}.`)
      // Attempt to navigate to first label of the tenant or selection page
      if (tenant.labels.length > 0) {
        navigate(
          `/app/${tenantId}/${tenant.labels[0].id}${location.pathname.split('/').slice(4).join('/') || '/dashboard'}`,
          { replace: true }
        )
      } else {
        navigate('/app/select-context?error=invalid_label', { replace: true })
      }
      return
    }

    setCurrentTenantAndLabel(tenantId, labelId)
  }, [
    tenantId,
    labelId,
    user,
    isAuthenticated,
    allTenantsData,
    setCurrentTenantAndLabel,
    navigate,
    location,
    storeTenantId,
    storeLabelId,
  ])

  // Show loading or placeholder if context not yet fully resolved
  // This check ensures that we don't render Outlet until tenant/label from URL is processed
  if (
    !storeTenantId ||
    !storeLabelId ||
    storeTenantId !== tenantId ||
    storeLabelId !== labelId
  ) {
    // Or tenant/label data is not yet loaded for the first time
    if (allTenantsData.length === 0 || !user) {
      return <div>Loading application context...</div> // Or a spinner
    }
    // If tenantId/labelId are present but not yet set in store, useEffect is working.
    // This can happen on initial load or context switch.
    return <div>Initializing context...</div>
  }

  return (
    <AppLayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </AppLayoutContainer>
  )
}

export default ProtectedAppLayout
