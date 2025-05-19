import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuthStore } from '../../store/authStore'
import { loginUser } from '../../services/authService' // Mock service
import { useNavigate } from 'react-router-dom'
import { Button } from '../common/Button' // Using common button

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  margin: 50px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary};
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 1em;
`

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error || 'red'};
  margin-bottom: 15px;
  font-size: 0.9em;
`

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login, isLoading, error, setLoading, setError } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { user, token } = await loginUser(username, password) // Using mock service
      login(user, token)
      navigate('/app/select-context', { replace: true }) // Go to tenant/label selection
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type='text'
          placeholder='Username (user1 or user2)'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        <Input
          type='password'
          placeholder='Password (any)'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <Button type='submit' disabled={isLoading} style={{ width: '100%' }}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </FormContainer>
  )
}

export default LoginForm
