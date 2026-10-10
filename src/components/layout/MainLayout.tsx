import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '@/components/common/Header'
import { Sidebar } from '@/components/common/Sidebar'
import { MobileNav } from '@/components/common/MobileNav'
import { Footer } from '@/components/common/Footer'
import { useAuth } from '@/auth/AuthContext'
import { normalizeRole } from '@/auth/permissions'

export const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [globalSearch, setGlobalSearch] = useState('')

  const currentRole = user?.role || 'SCADA'

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSidebarOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FB] text-[#0E1B2A] selection:bg-[#5494DA] selection:text-white">
      {/* Primary Header */}
      <Header
        onMenuToggle={() => setIsSidebarOpen(true)}
        currentRole={currentRole}
        activeAlertCount={3}
        onSearch={setGlobalSearch}
        userName={user?.name}
        onSignOut={() => {
          signOut()
          navigate('/login', { replace: true })
        }}
      />

      {/* Main Container */}
      <div className="flex-1 flex w-full">
        {/* Responsive Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentRole={currentRole}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0 overflow-y-auto">
          <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <Outlet context={{ currentRole, globalSearch }} />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        onOpenMenu={() => setIsSidebarOpen(true)}
        activeAlertCount={3}
      />
    </div>
  )
}
