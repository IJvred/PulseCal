import type { CalEvent } from '../lib/db'
import { startOfDay, addDays } from '../lib/date'

export default function WeekView({ date, events, onEdit }:{ date: Date, events: CalEvent[], onEdit:(e:CalEvent)=>void }){
  const weekStart = (()=>{ const d=new Date(date); d.setDate(d.getDate() - ((d.getDay()+7-0)%7)); return startOfDay(d) })()
  const days = Array.from({length:7},(_,i)=> addDays(weekStart,i))
  function bucket(day: Date){
    return events.filter(e=> new Date(e.start).toDateString()===day.toDateString())
      .sort((a,b)=> new Date(a.start).getTime()-new Date(b.start).getTime())
  }
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(d=> (
        <div key={d.toISOString()} className="rounded-xl bg-card p-2 min-h-[400px]">
          <div className="text-sm opacity-70 mb-2">{d.toLocaleDateString(undefined,{weekday:'short', month:'short', day:'numeric'})}</div>
          <div className="flex flex-col gap-2">
            {bucket(d).map(e=> (
              <button key={e.id} onClick={()=>onEdit(e)} className="rounded-lg p-2 text-sm text-left" style={{background:(e.color||'#7c5cff')+'33'}}>
                <div className="font-medium">{e.title}</div>
                <div className="opacity-70 text-xs">{fmt(e.start)} — {fmt(e.end)}</div>
                {e.tags?.length? <div className="opacity-70 text-xs mt-1">{e.tags.join(', ')}</div>: null}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function fmt(iso: string){ const d=new Date(iso); return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }
