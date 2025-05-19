import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthStore } from '../store/authStore'
import { useTenantStore } from '../store/tenantStore'
import { Tenant } from '../types' // Make sure Tenant type is imported
import { Select } from '../components/common/Select'

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  select {
    padding: 10px;
    margin: 10px 0;
    min-width: 250px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    padding: 10px 20px;
    margin-top: 20px;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
      background-color: #ccc;
    }
  }
`

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error || 'red'};
  margin-bottom: 15px;
`

const TenantLabelSelectionPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()
  const { allTenantsData, loadInitialData, setCurrentTenantAndLabel } =
    useTenantStore()

  const [selectedTenantId, setSelectedTenantId] = useState<string>('')
  const [selectedLabelId, setSelectedLabelId] = useState<string>('')
  const [accessibleTenants, setAccessibleTenants] = useState<Tenant[]>([])
  const [labelsForSelectedTenant, setLabelsForSelectedTenant] = useState<
    Tenant['labels']
  >([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (allTenantsData.length === 0) {
      loadInitialData()
    }
  }, [loadInitialData, allTenantsData.length])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const error = queryParams.get('error')
    if (error === 'invalid_tenant')
      setErrorMessage('Invalid or inaccessible tenant specified.')
    if (error === 'invalid_label')
      setErrorMessage('Invalid label specified for the selected tenant.')
  }, [location.search])

  useEffect(() => {
    if (user && allTenantsData.length > 0) {
      const tenants = allTenantsData.filter(
        (t) => user.accessibleTenantIds.includes(t.id) && t.labels.length > 0
      )
      setAccessibleTenants(tenants)
      if (tenants.length > 0) {
        // Pre-select first tenant if none selected or if previous selection is invalid
        if (
          !selectedTenantId ||
          !tenants.find((t) => t.id === selectedTenantId)
        ) {
          setSelectedTenantId(tenants[0].id)
        }
      } else {
        setErrorMessage("You don't have access to any active tenants/labels.")
      }
    }
  }, [user, allTenantsData, selectedTenantId])

  useEffect(() => {
    if (selectedTenantId) {
      const tenant = accessibleTenants.find((t) => t.id === selectedTenantId)
      if (tenant) {
        setLabelsForSelectedTenant(tenant.labels)
        if (tenant.labels.length > 0) {
          // Pre-select first label if none selected or if previous selection is invalid
          if (
            !selectedLabelId ||
            !tenant.labels.find((l) => l.id === selectedLabelId)
          ) {
            setSelectedLabelId(tenant.labels[0].id)
          }
        } else {
          setSelectedLabelId('') // No labels for this tenant
        }
      } else {
        setLabelsForSelectedTenant([])
        setSelectedLabelId('')
      }
    } else {
      setLabelsForSelectedTenant([])
      setSelectedLabelId('')
    }
  }, [selectedTenantId, accessibleTenants, selectedLabelId])

  const handleProceed = () => {
    if (selectedTenantId && selectedLabelId) {
      setCurrentTenantAndLabel(selectedTenantId, selectedLabelId) // Update store immediately
      navigate(`/app/${selectedTenantId}/${selectedLabelId}/dashboard`, {
        replace: true,
      })
    } else {
      setErrorMessage('Please select both a tenant and a label.')
    }
  }

  if (!user) {
    return <p>Loading user information...</p> // Or redirect to login
  }
  if (allTenantsData.length === 0) {
    return <p>Loading tenant data...</p>
  }
  if (accessibleTenants.length === 0 && !errorMessage) {
    // if no accessible tenants and no specific error yet
    return (
      <p>
        You do not have access to any tenants, or no tenants have configured
        labels. Please contact support.
      </p>
    )
  }

  return (
    <SelectionContainer>
      <h2>Select Your Context</h2>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <label htmlFor='tenant-select'>Select Tenant:</label>
      <Select
        id='tenant-select'
        value={selectedTenantId}
        onChange={(e) => {
          setSelectedTenantId(e.target.value)
          setSelectedLabelId('') // Reset label when tenant changes
        }}
        disabled={accessibleTenants.length === 0}
      >
        <option value='' disabled>
          -- Select a Tenant --
        </option>
        {accessibleTenants.map((tenant) => (
          <option key={tenant.id} value={tenant.id}>
            {tenant.name}
          </option>
        ))}
      </Select>

      {selectedTenantId && labelsForSelectedTenant.length > 0 && (
        <>
          <label htmlFor='label-select'>Select Label:</label>
          <Select
            id='label-select'
            value={selectedLabelId}
            onChange={(e) => setSelectedLabelId(e.target.value)}
            disabled={labelsForSelectedTenant.length === 0}
          >
            <option value='' disabled>
              -- Select a Label --
            </option>
            {labelsForSelectedTenant.map((label) => (
              <option key={label.id} value={label.id}>
                {label.name}
              </option>
            ))}
          </Select>
        </>
      )}
      {selectedTenantId && labelsForSelectedTenant.length === 0 && (
        <p>This tenant has no labels configured.</p>
      )}

      <button
        onClick={handleProceed}
        disabled={!selectedTenantId || !selectedLabelId}
      >
        Proceed to Dashboard
      </button>
    </SelectionContainer>
  )
}

export default TenantLabelSelectionPage
