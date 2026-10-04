import React, { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Wallet, ShieldAlert, Plus } from 'lucide-react'

export const RechargePage: React.FC = () => {
  const [balanceLiters, setBalanceLiters] = useState(14500)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customLiters, setCustomLiters] = useState('5000')
  const [billingAccount, setBillingAccount] = useState('ACC-ALPHA-FACILITY')
  const [transactions, setTransactions] = useState([
    { id: 'TXN-8821', date: '2026-09-25', description: 'Municipal Quota Allocation Top-up', volume: '+5,000 L', rate: '$0.0030/L', amount: '$15.00', method: 'Direct Utility Transfer', status: 'SETTLED' },
    { id: 'TXN-8740', date: '2026-09-18', description: 'Automated Sub-metered Consumption Debit', volume: '-3,200 L', rate: '$0.0030/L', amount: '$9.60', method: 'Automated Meter Debit', status: 'SETTLED' },
    { id: 'TXN-8612', date: '2026-09-10', description: 'Municipal Quota Allocation Top-up', volume: '+10,000 L', rate: '$0.0028/L', amount: '$28.00', method: 'Corporate Purchase Order', status: 'SETTLED' },
  ])

  const tariffRatePerLiter = 0.0030

  const handleSimulatedTopup = (e: React.FormEvent) => {
    e.preventDefault()
    const vol = parseInt(customLiters, 10) || 1000
    const cost = (vol * tariffRatePerLiter).toFixed(2)
    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      description: 'Municipal Quota Allocation Top-up',
      volume: `+${vol.toLocaleString()} L`,
      rate: `$${tariffRatePerLiter.toFixed(4)}/L`,
      amount: `$${cost}`,
      method: 'Simulated Settlement',
      status: 'SETTLED',
    }
    setBalanceLiters((prev) => prev + vol)
    setTransactions([newTxn, ...transactions])
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Water Utility Account & Metered Quota Allocation"
        description="Municipal tariff ledger, prepaid volumetric quotas, automated sub-meter debits, and utility account reconciliation."
        badgeText="UTILITY ACCOUNTING"
        actions={
          <Button onClick={() => setIsModalOpen(true)} className="text-xs">
            <Plus className="h-3.5 w-3.5 mr-1" /> Allocate Quota Volume
          </Button>
        }
      />

      {/* Financial Gateway Staging Notice */}
      <div className="p-3 rounded bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-2 font-mono">
        <ShieldAlert className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 font-bold">Utility Billing Engine Notice</strong>: Financial settlements operate under enterprise sandbox protocol. Quota allocation executes deterministic ledger entries without live external banking charges.
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <Card className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[10px] text-slate-500 uppercase font-bold">Available Water Quota</div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {balanceLiters.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-500">Liters ({(balanceLiters / 1000).toFixed(1)} m³)</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">
            Sufficient for ~{(balanceLiters / 1180).toFixed(1)} days at current demand
          </div>
        </Card>

        <Card className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[10px] text-slate-500 uppercase font-bold">Standard Utility Tariff Rate</div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">$0.0030</span>
            <span className="text-xs font-mono text-slate-500">/ Liter ($3.00 / m³)</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Regulated municipal rate with secondary offset
          </div>
        </Card>

        <Card className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[10px] text-slate-500 uppercase font-bold">Current Month Metered Charges</div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">$24.96</span>
            <span className="text-xs font-mono text-slate-500">USD</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            8,320 Liters aggregate sub-metered volume
          </div>
        </Card>
      </div>

      {/* Regulated Tariff Slabs Table */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Municipal Tiered Consumption Tariff Slabs</CardTitle>
          <span className="text-[10px] font-mono text-slate-500">Volumetric Billing Structure</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Slab Tier</th>
                <th className="p-3">Monthly Volumetric Band</th>
                <th className="p-3 text-right">Unit Rate ($ / Liter)</th>
                <th className="p-3 text-right">Unit Rate ($ / m³)</th>
                <th className="p-3">Reclaimed Water Offset Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900">Slab 1 (Base Allocation)</td>
                <td className="p-3">0 – 5,000 Liters (0 – 5.0 m³)</td>
                <td className="p-3 text-right tabular-nums font-bold text-slate-900">$0.0025</td>
                <td className="p-3 text-right tabular-nums text-slate-800">$2.50</td>
                <td className="p-3 text-emerald-700">100% Exemption on Reused (T4)</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900">Slab 2 (Standard Commercial)</td>
                <td className="p-3">5,001 – 15,000 Liters (5.1 – 15.0 m³)</td>
                <td className="p-3 text-right tabular-nums font-bold text-slate-900">$0.0030</td>
                <td className="p-3 text-right tabular-nums text-slate-800">$3.00</td>
                <td className="p-3 text-emerald-700">100% Exemption on Reused (T4)</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900">Slab 3 (Surplus Surcharge)</td>
                <td className="p-3">&gt; 15,000 Liters (&gt; 15.0 m³)</td>
                <td className="p-3 text-right tabular-nums font-bold text-slate-900">$0.0045</td>
                <td className="p-3 text-right tabular-nums text-slate-800">$4.50</td>
                <td className="p-3 text-emerald-700">100% Exemption on Reused (T4)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Transaction History Ledger */}
      <Card className="bg-white border border-slate-200 rounded overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Water Quota Allocation & Sub-Meter Debit Ledger</CardTitle>
          <span className="text-[10px] font-mono text-slate-500">Audited Ledger Events</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Reference ID</th>
                <th className="p-3">Transaction Date</th>
                <th className="p-3">Description</th>
                <th className="p-3 text-right">Volume Delta</th>
                <th className="p-3 text-right">Effective Rate</th>
                <th className="p-3 text-right">Total Charge</th>
                <th className="p-3">Settlement Method</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{t.id}</td>
                  <td className="p-3 text-slate-600">{t.date}</td>
                  <td className="p-3 font-sans text-slate-900 font-medium">{t.description}</td>
                  <td className={`p-3 text-right font-bold tabular-nums ${t.volume.startsWith('+') ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {t.volume}
                  </td>
                  <td className="p-3 text-right text-slate-600">{t.rate}</td>
                  <td className="p-3 text-right font-bold text-slate-900 tabular-nums">{t.amount}</td>
                  <td className="p-3 font-sans text-slate-600">{t.method}</td>
                  <td className="p-3">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quota Volume Allocation Dialog */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded max-w-md w-full p-5 space-y-4 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Allocate Water Quota Volume
                </h3>
              </div>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                Sandbox Mode
              </span>
            </div>

            <form onSubmit={handleSimulatedTopup} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Billing Account Reference
                </label>
                <input
                  type="text"
                  value={billingAccount}
                  onChange={(e) => setBillingAccount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Requested Quota Volume (Liters)
                </label>
                <input
                  type="number"
                  step="500"
                  min="500"
                  value={customLiters}
                  onChange={(e) => setCustomLiters(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
                <div className="text-[10px] text-slate-500 mt-1">
                  Equivalent to {(parseInt(customLiters || '0', 10) / 1000).toFixed(2)} m³
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Effective Unit Tariff:</span>
                  <span className="font-bold text-slate-900">${tariffRatePerLiter.toFixed(4)} / L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Calculated Invoice:</span>
                  <span className="font-bold text-slate-900 text-sm">
                    ${((parseInt(customLiters || '0', 10) * tariffRatePerLiter) || 0).toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" className="flex-1" type="submit">
                  Confirm Allocation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
