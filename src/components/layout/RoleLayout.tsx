import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BarChart3, Bell, Droplets, FileText, Home, LogOut, Wrench } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { dashboardPathForRole } from '@/auth/permissions'

const navForRole = {
  BUILDING_MANAGER: [{ label: 'Overview', path: '/facilities/dashboard', icon: Home }, { label: 'Consumption', path: '/consumption', icon: BarChart3 }, { label: 'Facility alerts', path: '/alerts', icon: Bell }, { label: 'Reports', path: '/reports', icon: FileText }, { label: 'Maintenance', path: '/devices', icon: Wrench }],
  RESIDENT: [{ label: 'My usage', path: '/tenant/dashboard', icon: Home }, { label: 'Consumption', path: '/consumption', icon: BarChart3 }, { label: 'Notifications', path: '/alerts', icon: Bell }, { label: 'My reports', path: '/reports', icon: FileText }],
}

export const RoleLayout = () => { const { user, signOut } = useAuth(); const navigate = useNavigate(); const role = user?.role === 'RESIDENT' ? 'RESIDENT' : 'BUILDING_MANAGER'; const label = role === 'RESIDENT' ? 'Tenant Observer' : 'Facilities Lead'; const links = navForRole[role]
  return <div className="min-h-screen bg-[#F7F9F8] text-[#10231F]"><header className="border-b border-[#DDE6E2] bg-white"><div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6"><Link to={dashboardPathForRole(role)} className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-md bg-[#075B48] text-white"><Droplets className="h-4 w-4"/></span><b>SSWH</b><span className="rounded bg-[#E8F5F0] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#075B48]">{label}</span></Link><button onClick={()=>{signOut();navigate('/login',{replace:true})}} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#63736E] hover:bg-[#F7F9F8]"><LogOut className="h-4 w-4"/>Sign out</button></div></header><div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row"><aside className="border-b border-[#DDE6E2] bg-white p-3 lg:min-h-[calc(100vh-64px)] lg:w-60 lg:border-b-0 lg:border-r"><p className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[.14em] text-[#63736E]">{role === 'RESIDENT' ? 'Read-only workspace' : 'Facility workspace'}</p><nav className="flex gap-1 overflow-x-auto lg:flex-col">{links.map(({label,path,icon:Icon})=><NavLink key={path} to={path} className={({isActive})=>`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive?'bg-[#E8F5F0] font-medium text-[#075B48]':'text-[#63736E] hover:bg-[#F7F9F8]'}`}><Icon className="h-4 w-4"/>{label}</NavLink>)}</nav></aside><main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8"><Outlet /></main></div></div>
}
