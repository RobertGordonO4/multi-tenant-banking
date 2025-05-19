import { User } from '../types'
import { mockUsers } from '../config/mockData'

interface LoginResponse {
  user: User
  token: string
}

// Mock login function
export const loginUser = (
  username: string,
  password?: string
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate network delay
      const user = mockUsers.find((u) => u.username === username)
      // Password validation is skipped in this mock for simplicity
      console.log('Mock login attempt:', { username, password })
      if (user) {
        const token = `mock-token-for-${user.id}-${Date.now()}`
        console.log('Login successful:', user)
        resolve({ user, token })
      } else {
        console.log('Login failed: User not found')
        reject(new Error('Invalid username or password'))
      }
    }, 500)
  })
}
