import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BarChart3, Bell, FileText, Home, LogOut, Wrench } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { dashboardPathForRole } from '@/auth/permissions'
import sswhLogo from '@/Logo/SSWH-LOGO.jpg'

const navForRole = {
  BUILDING_MANAGER: [{ label: 'Overview', path: '/facilities/dashboard', icon: Home }, { label: 'Consumption', path: '/consumption', icon: BarChart3 }, { label: 'Facility alerts', path: '/alerts', icon: Bell }, { label: 'Reports', path: '/reports', icon: FileText }, { label: 'Maintenance', path: '/devices', icon: Wrench }],
  RESIDENT: [{ label: 'My usage', path: '/tenant/dashboard', icon: Home }, { label: 'Consumption', path: '/consumption', icon: BarChart3 }, { label: 'Notifications', path: '/alerts', icon: Bell }, { label: 'My reports', path: '/reports', icon: FileText }],
}

export const RoleLayout = () => { const { user, signOut } = useAuth(); const navigate = useNavigate(); const role = user?.role === 'RESIDENT' ? 'RESIDENT' : 'BUILDING_MANAGER'; const label = role === 'RESIDENT' ? 'Tenant Observer' : 'Facilities Lead'; const links = navForRole[role]
  return <div className="min-h-screen bg-[#F4F8FB] text-[#0E1B2A]"><header className="border-b border-[#D1E2F5] bg-white"><div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6"><Link to={dashboardPathForRole(role)} className="flex items-center gap-2"><img src={sswhLogo} alt="SSWH Logo" className="h-8 w-8 rounded object-contain bg-white p-0.5 border border-[#D1E2F5] shadow-sm"/><div><b className="block text-sm leading-none">SSWH</b><span className="text-[10px] text-[#4A637D]">Smart Sustainable Water Harvesting</span></div><span className="rounded bg-[#EAF3FD] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#5494DA]">{label}</span></Link><button onClick={()=>{signOut();navigate('/login',{replace:true})}} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#4A637D] hover:bg-[#F4F8FB]"><LogOut className="h-4 w-4"/>Sign out</button></div></header><div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row"><aside className="border-b border-[#D1E2F5] bg-white p-3 lg:min-h-[calc(100vh-64px)] lg:w-60 lg:border-b-0 lg:border-r"><p className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[.14em] text-[#4A637D]">{role === 'RESIDENT' ? 'Read-only workspace' : 'Facility workspace'}</p><nav className="flex gap-1 overflow-x-auto lg:flex-col">{links.map(({label,path,icon:Icon})=><NavLink key={path} to={path} className={({isActive})=>`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive?'bg-[#EAF3FD] font-medium text-[#5494DA]':'text-[#4A637D] hover:bg-[#F4F8FB]'}`}><Icon className="h-4 w-4"/>{label}</NavLink>)}</nav></aside><main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8"><Outlet /></main></div></div>
}
