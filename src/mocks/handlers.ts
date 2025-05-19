import { http, HttpResponse } from 'msw'
import { mockUsers, mockTenantData } from '../config/mockData'

export const handlers = [
  // Mock login
  http.post('/api/login', async ({ request }) => {
    const { username, password } = (await request.json()) as Record<
      string,
      string
    >

    // In a real app, you'd validate the password too
    const user = mockUsers.find((u) => u.username === username)

    if (user) {
      // Simulate session token
      const token = `mock-token-for-${user.id}-${Date.now()}`
      return HttpResponse.json({ user, token })
    } else {
      return HttpResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      )
    }
  }),

  // Mock fetching all tenants data (platform admin might see this)
  // Or this could be filtered by user access if the backend does that
  http.get('/api/tenants', () => {
    // For simplicity, returning all mock tenant data.
    // In a real scenario, this might be user-specific or require auth.
    return HttpResponse.json(mockTenantData)
  }),

  // Mock fetching a specific tenant's data
  http.get('/api/tenants/:tenantId', ({ params }) => {
    const { tenantId } = params
    const tenant = mockTenantData.find((t) => t.id === tenantId)

    if (tenant) {
      return HttpResponse.json(tenant)
    } else {
      return HttpResponse.json({ message: 'Tenant not found' }, { status: 404 })
    }
  }),

  // Add more handlers as needed for other API calls
  // e.g., GET /api/tenants/:tenantId/labels/:labelId/config
]
