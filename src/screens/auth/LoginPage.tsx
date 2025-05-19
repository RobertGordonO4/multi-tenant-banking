import React from 'react'
import LoginForm from '../../components/auth/LoginForm'
import styled from 'styled-components'
import { useAuthStore } from '../../store/authStore'
import { Navigate } from 'react-router-dom'

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align to top for better view with header */
  min-height: 100vh;
  padding-top: 5vh; /* Add some padding from the top */
  background-color: ${(props) => props.theme.colors.background};
`

const PlatformTitle = styled.h1`
  font-size: 2em;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 30px;
`

const LoginPage: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    // If already authenticated, redirect to the app's tenant/label selection or last known context
    return <Navigate to='/app/select-context' replace />
  }
  return (
    <LoginPageContainer>
      <PlatformTitle>Cloud-Native Banking Platform</PlatformTitle>
      <LoginForm />
    </LoginPageContainer>
  )
}

export default LoginPage
