import React from 'react'
import { WaterFlowDiagram } from '@/components/visualizers/WaterFlowDiagram'

export const LiveOperationsPage = () => <div className="space-y-6 pb-6">
  <header className="border-b border-[#DDE6E2] pb-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#5494DA]">Real-time monitoring</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#10231F]">Live Operations</h1><p className="mt-2 text-sm text-[#63736E]">Inspect the active process, equipment states, and current delivery conditions.</p></header>
  <WaterFlowDiagram />
  <section className="grid gap-4 md:grid-cols-3"><Condition label="Transfer pump P-01" value="Running" meta="18.4 L/min · 2.4 bar" status="Normal" /><Condition label="Primary filtration" value="Online" meta="0.30 NTU · 120 ppm TDS" status="Normal" /><Condition label="Wastewater collection" value="Advisory" meta="T3 trend is rising" status="Warning" /></section>
  <section className="rounded-xl border border-[#DDE6E2] bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#63736E]">Operating note</p><p className="mt-2 text-sm leading-6 text-[#10231F]">The facility is running in automatic mode. Equipment details are available by selecting a node in the process flow above.</p></section>
</div>
const Condition = ({ label, value, meta, status }: { label:string; value:string; meta:string; status:'Normal'|'Warning' }) => <div className="rounded-xl border border-[#DDE6E2] bg-white p-5"><p className="text-sm font-medium text-[#10231F]">{label}</p><div className="mt-4 flex items-center justify-between"><p className="text-lg font-semibold text-[#10231F]">{value}</p><span className={`text-xs font-medium ${status === 'Normal' ? 'text-[#18A878]' : 'text-[#D98A00]'}`}>● {status}</span></div><p className="mt-2 font-mono text-xs text-[#63736E]">{meta}</p></div>

