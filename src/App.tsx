import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/auth/AuthContext'
import { ProtectedRoute } from '@/auth/ProtectedRoute'
import { MainLayout } from '@/components/layout/MainLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { getDashboardRoute } from '@/auth/permissions'

// Landing Entry Experience
import { LandingPage } from '@/pages/LandingPage'

// Role Dashboards
import { ScadaDashboardPage } from '@/pages/scada/ScadaDashboardPage'
import { FacilitiesDashboardPage } from '@/pages/facilities/FacilitiesDashboardPage'
import { TenantDashboardPage } from '@/pages/tenant/TenantDashboardPage'

// Operational & Telemetry Pages
import { LiveOperationsPage } from '@/pages/LiveOperationsPage'
import { ProcessFlowPage } from '@/pages/ProcessFlowPage'
import { MonitoringPage } from '@/pages/MonitoringPage'
import { WaterQualityPage } from '@/pages/WaterQualityPage'
import { ConsumptionPage } from '@/pages/ConsumptionPage'
import { CollectionPage } from '@/pages/CollectionPage'
import { WastewaterPage } from '@/pages/WastewaterPage'
import { TanksPage } from '@/pages/TanksPage'
import { DevicesPage } from '@/pages/DevicesPage'
import { LeakDetectionPage } from '@/pages/LeakDetectionPage'
import { DrinkingWaterPage } from '@/pages/DrinkingWaterPage'
import { AiInsightsPage } from '@/pages/AiInsightsPage'
import { AlertsPage } from '@/pages/AlertsPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { RechargePage } from '@/pages/RechargePage'
import { UsersPage } from '@/pages/UsersPage'
import { SettingsPage } from '@/pages/SettingsPage'

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'

const RoleDashboardRedirect: React.FC = () => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={getDashboardRoute(user.role)} replace />
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Cinematic Landing Experience */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Group */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Protected Application Workspace */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              {/* Central Dashboard Redirect */}
              <Route path="/dashboard" element={<RoleDashboardRedirect />} />

              {/* Direct Path Aliases */}
              <Route path="/scada" element={<Navigate to="/scada/dashboard" replace />} />
              <Route path="/facilities" element={<Navigate to="/facilities/dashboard" replace />} />
              <Route path="/tenant" element={<Navigate to="/tenant/dashboard" replace />} />

              {/* Strict Role-Restricted Dashboards */}
              <Route
                path="/scada/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['scada_operator', 'SCADA', 'ADMIN']}>
                    <ScadaDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/facilities/dashboard"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      'facilities_lead',
                      'FACILITIES_LEAD',
                      'BUILDING_MANAGER',
                    ]}
                  >
                    <FacilitiesDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenant/dashboard"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      'tenant_observer',
                      'TENANT_OBSERVER',
                      'RESIDENT',
                    ]}
                  >
                    <TenantDashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Sensitive SCADA Operational Routes (Restricted to SCADA Operator) */}
              <Route
                path="/live-operations"
                element={
                  <ProtectedRoute allowedRoles={['scada_operator', 'SCADA', 'ADMIN']}>
                    <LiveOperationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/process-flow"
                element={
                  <ProtectedRoute allowedRoles={['scada_operator', 'SCADA', 'ADMIN']}>
                    <ProcessFlowPage />
                  </ProtectedRoute>
                }
              />

              {/* Shared Telemetry & Facility Pages */}
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/water-quality" element={<WaterQualityPage />} />
              <Route path="/consumption" element={<ConsumptionPage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/wastewater" element={<WastewaterPage />} />
              <Route path="/tanks" element={<TanksPage />} />
              <Route
                path="/devices"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      'scada_operator',
                      'SCADA',
                      'facilities_lead',
                      'FACILITIES_LEAD',
                      'ADMIN',
                      'BUILDING_MANAGER',
                    ]}
                  >
                    <DevicesPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/leak-detection" element={<LeakDetectionPage />} />
              <Route path="/drinking-water" element={<DrinkingWaterPage />} />
              <Route path="/ai-insights" element={<AiInsightsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/recharge" element={<RechargePage />} />
              <Route
                path="/users"
                element={
                  <ProtectedRoute allowedRoles={['scada_operator', 'SCADA', 'ADMIN']}>
                    <UsersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      'scada_operator',
                      'SCADA',
                      'facilities_lead',
                      'FACILITIES_LEAD',
                      'ADMIN',
                      'BUILDING_MANAGER',
                    ]}
                  >
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />

              {/* Aliases & Fallbacks */}
              <Route path="/storage" element={<Navigate to="/tanks" replace />} />
              <Route path="/sensors" element={<Navigate to="/monitoring" replace />} />
              <Route path="/wastewater-reuse" element={<Navigate to="/wastewater" replace />} />
              <Route path="/analytics" element={<Navigate to="/consumption" replace />} />
              <Route path="/predictive-modeling" element={<Navigate to="/ai-insights" replace />} />
              <Route path="/compliance" element={<Navigate to="/reports" replace />} />
              <Route path="/utility-ledger" element={<Navigate to="/recharge" replace />} />
              <Route path="/admin/access-control" element={<Navigate to="/users" replace />} />
              <Route path="/admin/calibration" element={<Navigate to="/settings" replace />} />
              <Route path="/admin/devices" element={<Navigate to="/devices" replace />} />
              <Route path="/admin/settings" element={<Navigate to="/settings" replace />} />
              <Route path="/admin/audit-log" element={<Navigate to="/reports" replace />} />
            </Route>
          </Route>

          {/* Fallbacks */}
          <Route path="/app" element={<RoleDashboardRedirect />} />
          <Route path="*" element={<RoleDashboardRedirect />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
