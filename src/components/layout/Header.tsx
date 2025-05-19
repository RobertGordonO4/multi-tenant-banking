import React from 'react'
import styled from 'styled-components'
import { useNavigate, useParams, NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useTenantStore } from '../../store/tenantStore'
import { Tenant } from '../../types'

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.headerBackground};
  color: ${(props) => props.theme.colors.headerText};
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  box-sizing: border-box;
`

const Branding = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 30%;

  img {
    height: 40px;
    margin-right: 15px;
  }
  h1 {
    font-size: 1.2em;
    margin: 0;
    white-space: nowrap;
  }
`

const AppNavigation = styled.nav`
  display: flex;
  justify-content: center; /* Center links within this nav block */
  align-items: center;
  gap: 20px;
`

const StyledNavLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.headerText};
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: bold;
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 15px;
  width: 35%;
`

const ContextInfo = styled.div`
  font-size: 0.9em;
  text-align: right;
  white-space: nowrap;
  line-height: 1.4;

  div {
    line-height: inherit;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: white;
    color: #333;
    max-width: 150px;
  }
  button {
    padding: 8px 12px;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      opacity: 0.9;
    }
  }
`

const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { tenantId: currentUrlTenantId, labelId: currentUrlLabelId } =
    useParams()
  const { user, logout: authLogout } = useAuthStore()
  const {
    allTenantsData,
    currentTenantDetails,
    currentLabelDetails,
    clearTenantContext,
  } = useTenantStore()

  const handleLogout = () => {
    authLogout()
    clearTenantContext()
    navigate('/login')
  }

  const accessibleTenants = React.useMemo(() => {
    if (!user || !allTenantsData) return []
    return allTenantsData.filter((t) => user.accessibleTenantIds.includes(t.id))
  }, [user, allTenantsData])

  const getCurrentPageSuffix = () => {
    if (!currentUrlTenantId || !currentUrlLabelId) return '/dashboard'
    const basePath = `/app/${currentUrlTenantId}/${currentUrlLabelId}`
    if (location.pathname.startsWith(basePath)) {
      const suffix = location.pathname.substring(basePath.length)
      return suffix || '/dashboard'
    }
    return '/dashboard'
  }

  const handleTenantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTenantId = event.target.value
    const selectedTenant = allTenantsData.find((t) => t.id === newTenantId)
    if (selectedTenant && selectedTenant.labels.length > 0) {
      const pageSuffix = getCurrentPageSuffix()
      navigate(
        `/app/${newTenantId}/${selectedTenant.labels[0].id}${pageSuffix}`
      )
    }
  }

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLabelId = event.target.value
    if (currentTenantDetails) {
      const pageSuffix = getCurrentPageSuffix()
      navigate(`/app/${currentTenantDetails.id}/${newLabelId}${pageSuffix}`)
    }
  }

  const logoSrc = currentTenantDetails?.theme?.logoUrl
    ? `/assets/logos/${currentTenantDetails.theme.logoUrl}`
    : '/assets/logos/default-logo.png'

  const baseAppPath = `/app/${currentUrlTenantId}/${currentUrlLabelId}`

  return (
    <StyledHeader>
      <Branding>
        <img
          src={logoSrc}
          alt={currentTenantDetails?.name || 'Platform Logo'}
        />
        <h1>{currentTenantDetails?.name || 'Banking Platform'}</h1>
      </Branding>

      {currentUrlTenantId && currentUrlLabelId ? (
        <AppNavigation>
          <StyledNavLink to={`${baseAppPath}/dashboard`}>
            Dashboard
          </StyledNavLink>
          <StyledNavLink to={`${baseAppPath}/settings`}>Settings</StyledNavLink>
        </AppNavigation>
      ) : (
        <div
          style={{ flexGrow: 1 }}
        /> /* Placeholder to maintain spacing if nav not shown */
      )}

      <RightSection>
        <Controls>
          {currentTenantDetails && accessibleTenants.length > 1 && (
            <select
              value={currentTenantDetails.id}
              onChange={handleTenantChange}
            >
              {accessibleTenants.map((tenant: Tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          )}
          {currentTenantDetails && currentTenantDetails.labels.length > 1 && (
            <select
              value={currentLabelDetails?.id || ''}
              onChange={handleLabelChange}
            >
              {currentTenantDetails.labels.map((label) => (
                <option key={label.id} value={label.id}>
                  {label.name}
                </option>
              ))}
            </select>
          )}
          <button onClick={handleLogout}>Logout</button>
        </Controls>

        <ContextInfo>
          {currentTenantDetails && currentLabelDetails && (
            <>
              <div>Tenant: {currentTenantDetails.name}</div>
              <div>
                Label: {currentLabelDetails.name} ({currentLabelDetails.id})
              </div>
            </>
          )}
          {user && <div>User: {user.username}</div>}
        </ContextInfo>
      </RightSection>
    </StyledHeader>
  )
}

export default Header
