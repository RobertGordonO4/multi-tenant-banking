import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../screens/auth/LoginPage'
import DashboardPage from '../screens/dashboard/DashboardPage'
import SettingsPage from '../screens/settings/SettingsPage'
import NotFoundPage from '../screens/errors/NotFoundPage'
import ProtectedAppLayout from '../components/layout/ProtectedAppLayout'
import { ThemeProviderWrapper } from './ThemeProviderWrapper'
import GlobalStyles from './GlobalStyles'
import TenantLabelSelectionPage from '../screens/selection/TenantLabelSelectionPage'
import { useAuthStore } from '../store/authStore'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <BrowserRouter>
      <ThemeProviderWrapper>
        <GlobalStyles />
        <Routes>
          <Route path='/login' element={<LoginPage />} />

          <Route
            path='/app'
            element={
              isAuthenticated ? (
                <Navigate to='/app/select-context' replace />
              ) : (
                <Navigate to='/login' replace />
              )
            }
          />
          <Route
            path='/app/select-context'
            element={
              isAuthenticated ? (
                <TenantLabelSelectionPage />
              ) : (
                <Navigate to='/login' replace />
              )
            }
          />

          <Route
            path='/app/:tenantId/:labelId'
            element={
              isAuthenticated ? (
                <ProtectedAppLayout />
              ) : (
                <Navigate to='/login' replace />
              )
            }
          >
            <Route index element={<Navigate to='dashboard' replace />} />
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='settings' element={<SettingsPage />} />
            {/* Add more tenant/label specific routes here */}
          </Route>

          <Route
            path='/'
            element={
              <Navigate
                to={isAuthenticated ? '/app/select-context' : '/login'}
                replace
              />
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </ThemeProviderWrapper>
    </BrowserRouter>
  )
}

export default App
