import React from 'react'
import styled from 'styled-components'
import { useTenantStore } from '../../store/tenantStore'

const DashboardContainer = styled.div`
  padding: 20px;
  display: grid;
  gap: ${(props) => props.theme.dashboard.gap};
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
  border-radius: ${(props) =>
    props.theme.borderRadius}; // Use theme border radius
  font-size: 0.9em;
  margin-top: 15px;
  color: #333;
  white-space: pre-wrap; /* Allow text to wrap */
  word-break: break-all; /* Break long words/strings */
`

const VatInfo = styled.p`
  margin-top: 20px;
  font-style: italic;
  color: ${(props) => props.theme.colors.secondary};
`

const LegalText = styled.p`
  margin-top: 15px;
  font-size: 0.85em;
  color: #555;
  border-top: 1px solid #eee;
  padding-top: 15px;
  line-height: 1.6;
`

const DashboardPage: React.FC = () => {
  const { currentTenantDetails, currentLabelDetails } = useTenantStore()

  if (!currentTenantDetails || !currentLabelDetails) {
    return <div>Loading context or context not set...</div>
  }

  // Get VAT percentage from label config, or default to 20
  const vatPercentage = currentLabelDetails.config?.VATPercentage ?? 20
  const legalText =
    currentLabelDetails.config?.specificLegalText ??
    'This is the default legal text.'

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
            <h3>Label Specific Configuration (Raw):</h3>
            <ConfigDisplay>
              {JSON.stringify(currentLabelDetails.config, null, 2)}
            </ConfigDisplay>
          </div>
        )}

      <p style={{ marginTop: '20px' }}>
        This is a sample dashboard view. Content here would be specific to the
        tenant and label context.
      </p>

      <VatInfo>Applicable VAT Rate for this context: {vatPercentage}%.</VatInfo>

      <LegalText>{legalText}</LegalText>
    </DashboardContainer>
  )
}

export default DashboardPage
