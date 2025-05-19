import React from 'react'
import styled from 'styled-components'
import { useTenantStore } from '../../store/tenantStore'

const SettingsContainer = styled.div`
  padding: 20px;
  h2 {
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 8px;
  }
`

const SettingsPage: React.FC = () => {
  const { currentTenantDetails, currentLabelDetails } = useTenantStore()

  if (!currentTenantDetails || !currentLabelDetails) {
    return <div>Loading context or context not set...</div>
  }

  return (
    <SettingsContainer>
      <h2>Settings</h2>
      <p>
        Settings for tenant: <strong>{currentTenantDetails.name}</strong>
      </p>
      <p>
        Current label context: <strong>{currentLabelDetails.name}</strong>
      </p>
      <p>
        Tenant-specific settings and label-specific configurations would be
        managed here. Access rules and UI customizations might also be
        configured from a settings panel like this, depending on the
        administrative roles.
      </p>
      {/* Add example settings form elements here */}
    </SettingsContainer>
  )
}

export default SettingsPage
