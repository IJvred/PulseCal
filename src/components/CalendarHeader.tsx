import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

export default function CalendarHeader({
  date, setDate, onNew
}:{ date: Date, setDate: (d:Date)=>void, onNew:()=>void }){
  const month = date.toLocaleString(undefined,{ month:'long', year:'numeric'})
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-white/5" onClick={()=>setDate(new Date(date.getFullYear(), date.getMonth()-1, 1))}><ChevronLeft/></button>
        <div className="text-lg font-semibold">{month}</div>
        <button className="p-2 rounded-lg hover:bg-white/5" onClick={()=>setDate(new Date(date.getFullYear(), date.getMonth()+1, 1))}><ChevronRight/></button>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-2 rounded-xl bg-accent/30 hover:bg-accent/40" onClick={()=>setDate(new Date())}>Today</button>
        <button className="px-3 py-2 rounded-xl bg-accent/30 hover:bg-accent/40 flex items-center gap-2" onClick={onNew}><Plus className="h-4 w-4"/> New</button>
      </div>
    </div>
  )
}
