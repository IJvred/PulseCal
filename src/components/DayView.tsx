import type { CalEvent } from '../lib/db'

export default function DayView({ date, events, onEdit }:{ date: Date, events: CalEvent[], onEdit:(e:CalEvent)=>void }){
  const todays = events.filter(e=> new Date(e.start).toDateString()===date.toDateString())
    .sort((a,b)=> new Date(a.start).getTime()-new Date(b.start).getTime())
  return (
    <div className="rounded-2xl bg-card p-2">
      <div className="text-sm opacity-70 mb-2">{date.toLocaleDateString(undefined,{weekday:'long', month:'short', day:'numeric'})}</div>
      <div className="grid gap-2">
        {todays.map(e=> (
          <button key={e.id} onClick={()=>onEdit(e)} className="rounded-lg p-2 text-left" style={{background:(e.color||'#7c5cff')+'33'}}>
            <div className="text-sm font-medium">{e.title}</div>
            <div className="opacity-70 text-xs">{fmt(e.start)} — {fmt(e.end)} {e.all_day? '(all day)':''}</div>
            {e.notes? <div className="opacity-70 text-xs mt-1 line-clamp-2">{e.notes}</div>: null}
            {e.tags?.length? <div className="opacity-70 text-xs mt-1">{e.tags.join(', ')}</div>: null}
          </button>
        ))}
        {!todays.length && <div className="opacity-50 text-sm">No events today.</div>}
      </div>
    </div>
  )
}

function fmt(iso: string){ const d=new Date(iso); return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }
