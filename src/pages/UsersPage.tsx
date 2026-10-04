import React, { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { UserPlus, Check, Minus } from 'lucide-react'
import { UserRole } from '@/types'

export const UsersPage: React.FC = () => {
  const [users] = useState([
    { id: 'USR-01', name: 'Chief Operations Officer', email: 'admin@waterwise.internal', role: 'ADMIN' as UserRole, building: 'All Facilities (Campus Wide)', lastLogin: '10 mins ago', status: 'ACTIVE' },
    { id: 'USR-02', name: 'Alpha Facilities Lead', email: 'lead.alpha@waterwise.internal', role: 'BUILDING_MANAGER' as UserRole, building: 'Building Alpha-1', lastLogin: '1 hour ago', status: 'ACTIVE' },
    { id: 'USR-03', name: 'Beta Facilities Lead', email: 'lead.beta@waterwise.internal', role: 'BUILDING_MANAGER' as UserRole, building: 'Building Beta-2', lastLogin: 'Yesterday', status: 'ACTIVE' },
    { id: 'USR-04', name: 'Apt 201 Resident', email: 'resident201@alpha.internal', role: 'RESIDENT' as UserRole, building: 'Alpha-1 (Apt 201)', lastLogin: '3 days ago', status: 'ACTIVE' },
    { id: 'USR-05', name: 'Apt 304 Resident', email: 'resident304@alpha.internal', role: 'RESIDENT' as UserRole, building: 'Alpha-1 (Apt 304)', lastLogin: '5 days ago', status: 'ACTIVE' },
  ])

  const rbacMatrix = [
    { permission: 'View Real-time Sensor Telemetry', admin: true, manager: true, resident: true },
    { permission: 'Inspect Tank Hydraulic Levels', admin: true, manager: true, resident: false },
    { permission: 'Acknowledge SCADA Alarms', admin: true, manager: true, resident: false },
    { permission: 'Calibrate Tank Capacities & Limits', admin: true, manager: false, resident: false },
    { permission: 'Trigger Manual Hardware Relays (Pumps)', admin: true, manager: false, resident: false },
    { permission: 'Export Regulatory Compliance Reports', admin: true, manager: true, resident: false },
    { permission: 'Manage User Accounts & Roles', admin: true, manager: false, resident: false },
    { permission: 'View Apartment Sub-Meter Ledger', admin: true, manager: true, resident: true },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Role-Based Access Control (RBAC) & Operator Directory"
        description="Multi-tier security authorization, facility segregation, and credential management."
        badgeText="RBAC ENFORCED"
        actions={
          <Button className="text-xs">
            <UserPlus className="h-3.5 w-3.5 mr-1" /> Add Authorized Operator
          </Button>
        }
      />

      {/* RBAC Permission Matrix */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">SCADA Privilege Authorization Matrix</CardTitle>
          <span className="text-[10px] font-mono text-slate-500">Security Segmentation Policy</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Permission Scope</th>
                <th className="p-3 text-center">SCADA Administrator</th>
                <th className="p-3 text-center">Facilities Lead</th>
                <th className="p-3 text-center">Tenant Observer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rbacMatrix.map((row) => (
                <tr key={row.permission} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-sans font-medium text-slate-800">{row.permission}</td>
                  <td className="p-3 text-center">
                    {row.admin ? (
                      <span className="inline-flex items-center text-emerald-700 font-bold">
                        <Check className="h-4 w-4 mx-auto" />
                      </span>
                    ) : (
                      <Minus className="h-4 w-4 mx-auto text-slate-300" />
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {row.manager ? (
                      <span className="inline-flex items-center text-emerald-700 font-bold">
                        <Check className="h-4 w-4 mx-auto" />
                      </span>
                    ) : (
                      <Minus className="h-4 w-4 mx-auto text-slate-300" />
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {row.resident ? (
                      <span className="inline-flex items-center text-emerald-700 font-bold">
                        <Check className="h-4 w-4 mx-auto" />
                      </span>
                    ) : (
                      <Minus className="h-4 w-4 mx-auto text-slate-300" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Operator Directory Table */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Authorized Operator & Tenant Directory</CardTitle>
          <span className="text-[10px] font-mono text-slate-500">Active Authentication Credentials</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">User ID</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Security Role</th>
                <th className="p-3">Assigned Facility</th>
                <th className="p-3">Last Active</th>
                <th className="p-3">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{u.id}</td>
                  <td className="p-3 font-sans font-bold text-slate-900">{u.name}</td>
                  <td className="p-3 text-slate-600">{u.email}</td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200 text-slate-800">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 font-sans text-slate-700">{u.building}</td>
                  <td className="p-3 text-slate-500 text-[11px]">{u.lastLogin}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
