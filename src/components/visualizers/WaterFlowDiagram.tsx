import React, { useState } from 'react'
import { ArrowRight, Droplets, Factory, Gauge, Sprout, Waves, X } from 'lucide-react'

type ProcessNode = { name: string; value: string; status: 'Normal' | 'Warning'; icon: React.ElementType; detail: string }

const process: ProcessNode[] = [
  { name: 'Source', value: '18.4 L/min', status: 'Normal', icon: Droplets, detail: 'Municipal and rainwater intake is stable.' },
  { name: 'Raw Water', value: '80% full', status: 'Normal', icon: Waves, detail: 'Raw water reserve is within the preferred operating range.' },
  { name: 'Transfer Pump', value: 'Running', status: 'Normal', icon: Gauge, detail: 'Pump P-01 is delivering 18.4 L/min at 2.4 bar.' },
  { name: 'Filtration', value: '0.30 NTU', status: 'Normal', icon: Factory, detail: 'Multi-barrier filtration is operating normally.' },
  { name: 'Clean Water', value: '62% full', status: 'Normal', icon: Droplets, detail: 'Clean water tank has 6.2 L available from 10.0 L capacity.' },
  { name: 'Reuse', value: '75% full', status: 'Warning', icon: Sprout, detail: 'Reuse loop is available. Inspect the T3 level advisory when convenient.' },
]

export const WaterFlowDiagram: React.FC = () => {
  const [selected, setSelected] = useState<ProcessNode | null>(null)

  return (
    <>
      <section className="rounded-xl border border-[#DDE6E2] bg-white p-5 sm:p-6" aria-labelledby="process-flow-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63736E]">Live water process</p>
            <h2 id="process-flow-title" className="mt-1 text-xl font-semibold text-[#10231F]">Flow is stable across treatment and reuse</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#075B48]"><span className="h-2 w-2 rounded-full bg-[#2386A8] animate-pulse" /> Live · Updated 5 seconds ago</div>
        </div>

        <div className="mt-6 flex items-stretch gap-2 overflow-x-auto pb-2">
          {process.map((node, index) => {
            const Icon = node.icon
            return (
              <React.Fragment key={node.name}>
                <button onClick={() => setSelected(node)} className="group min-w-[145px] flex-1 rounded-lg border border-[#DDE6E2] bg-[#F7F9F8] p-3 text-left transition hover:-translate-y-0.5 hover:border-[#075B48] hover:bg-white focus-visible:outline-[#075B48]">
                  <div className="flex items-center justify-between"><Icon className="h-4 w-4 text-[#075B48]" /><span className={`text-[11px] font-medium ${node.status === 'Warning' ? 'text-[#D98A00]' : 'text-[#075B48]'}`}>● {node.status}</span></div>
                  <div className="mt-5 text-sm font-semibold text-[#10231F]">{node.name}</div>
                  <div className="mt-1 font-mono text-xs text-[#63736E]">{node.value}</div>
                </button>
                {index < process.length - 1 && <div className="flex items-center text-[#2386A8]" aria-hidden="true"><ArrowRight className="h-5 w-5" /></div>}
              </React.Fragment>
            )
          })}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#E8F5F0] px-3 py-2 text-xs text-[#075B48]"><span className="font-semibold">Lifecycle:</span> Collection → Treatment → Storage → Consumption → Wastewater → Reclamation → Reuse</div>
      </section>

      {selected && <div className="fixed inset-0 z-[60]">
        <button className="absolute inset-0 bg-[#10231F]/30 backdrop-blur-[1px]" onClick={() => setSelected(null)} aria-label="Close equipment details" />
        <aside role="dialog" aria-modal="true" aria-label={`${selected.name} details`} className="absolute right-0 top-0 h-dvh w-full max-w-md bg-white p-6 shadow-2xl animate-in slide-in-from-right">
          <div className="flex items-start justify-between border-b border-[#DDE6E2] pb-5"><div><p className="text-xs font-semibold uppercase tracking-wider text-[#63736E]">Equipment detail</p><h2 className="mt-1 text-2xl font-semibold text-[#10231F]">{selected.name}</h2></div><button onClick={() => setSelected(null)} className="rounded-md p-2 text-[#63736E] hover:bg-[#F7F9F8]" aria-label="Close detail drawer"><X className="h-5 w-5" /></button></div>
          <div className="mt-6 flex items-center gap-2 text-sm text-[#075B48]"><span className={`h-2.5 w-2.5 rounded-full ${selected.status === 'Warning' ? 'bg-[#D98A00]' : 'bg-[#23865D]'}`} />{selected.status}</div>
          <div className="mt-8 grid grid-cols-2 gap-3"><Detail label="Current state" value={selected.value} /><Detail label="Flow" value="18.4 L/min" /><Detail label="Temperature" value="24.2°C" /><Detail label="Last updated" value="21:32:14" /></div>
          <p className="mt-7 rounded-lg bg-[#F7F9F8] p-4 text-sm leading-6 text-[#63736E]">{selected.detail}</p>
          <div className="mt-8 flex gap-3"><button className="rounded-md bg-[#075B48] px-4 py-2.5 text-sm font-medium text-white">View details</button><button className="rounded-md border border-[#DDE6E2] px-4 py-2.5 text-sm font-medium text-[#10231F]">View history</button></div>
        </aside>
      </div>}
    </>
  )
}

const Detail = ({ label, value }: { label: string; value: string }) => <div className="rounded-lg border border-[#DDE6E2] p-3"><p className="text-[11px] font-medium uppercase tracking-wider text-[#63736E]">{label}</p><p className="mt-2 font-mono text-sm font-semibold text-[#10231F]">{value}</p></div>
