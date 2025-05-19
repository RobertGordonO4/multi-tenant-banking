import React from 'react'
import styled from 'styled-components'
import { useTenantStore } from '../../store/tenantStore'

const DashboardContainer = styled.div`
  padding: 20px;
  h2 {
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 8px;
  }
`

const ConfigDisplay = styled.pre`
  background-color: #eee;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9em;
  margin-top: 15px;
  color: #333;
  text-wrap: auto;
`

const DashboardPage: React.FC = () => {
  const { currentTenantDetails, currentLabelDetails } = useTenantStore()

  if (!currentTenantDetails || !currentLabelDetails) {
    return <div>Loading context or context not set...</div>
  }

  return (
    <DashboardContainer>
      <h2>Dashboard</h2>
      <p>
        Welcome to the dashboard for{' '}
        <strong>{currentTenantDetails.name}</strong>.
      </p>
      <p>
        You are currently operating under the label:{' '}
        <strong>{currentLabelDetails.name}</strong> (ID:{' '}
        {currentLabelDetails.id}).
      </p>

      {currentLabelDetails.config &&
        Object.keys(currentLabelDetails.config).length > 0 && (
          <div>
            <h3>Label Specific Configuration:</h3>
            <ConfigDisplay>
              {JSON.stringify(currentLabelDetails.config, null, 2)}
            </ConfigDisplay>
          </div>
        )}

      <p style={{ marginTop: '20px' }}>
        This is a sample dashboard view. Content here would be specific to the
        tenant and label context.
      </p>
    </DashboardContainer>
  )
}

export default DashboardPage
