import { CalendarDays, Search, Download } from 'lucide-react'

export default function Topbar({ onSearch, onExport }: { onSearch: (q:string)=>void, onExport: ()=>void }){
  return (
    <div className="col-span-2 row-start-1 flex items-center gap-3 rounded-2xl bg-card px-4">
      <div className="flex items-center gap-2 text-accent font-semibold">
        <CalendarDays className="h-5 w-5"/>
        PulseCal
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#16161f] rounded-xl px-3 py-2">
          <Search className="h-4 w-4 opacity-70"/>
          <input onChange={e=>onSearch(e.target.value)} placeholder="Search events, tags, notes..." className="bg-transparent outline-none"/>
        </div>
        <button onClick={onExport} className="px-3 py-2 rounded-xl bg-accent/20 hover:bg-accent/30 transition flex items-center gap-2">
          <Download className="h-4 w-4"/> Export JSON
        </button>
      </div>
    </div>
  )
}
