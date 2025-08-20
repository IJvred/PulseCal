import { sameDay } from '../lib/date'
import type { CalEvent } from '../lib/db'

export default function MonthView({ date, events, onPickDay, onEdit }:{
  date: Date,
  events: CalEvent[],
  onPickDay: (d: Date)=>void,
  onEdit: (e: CalEvent)=>void
}){
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const startOffset = (start.getDay()+7-0)%7
  const gridStart = new Date(start); gridStart.setDate(1 - startOffset)
  const days = Array.from({length: 42}, (_,i)=> new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate()+i))

  return (
    <div className="grid grid-cols-7 gap-2">
      {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(h=> <div key={h} className="text-sm opacity-60 px-2">{h}</div>)}
      {days.map(d=>{
        const todays = events.filter(e=> sameDay(new Date(e.start), d))
        const dim = d.getMonth()!==date.getMonth()
        return (
          <div key={d.toISOString()} className={`rounded-xl bg-card min-h-[120px] p-2 flex flex-col gap-1 ${dim? 'opacity-50':''}`}
               onDoubleClick={()=>onPickDay(d)}>
            <div className="text-xs opacity-70">{d.getDate()}</div>
            <div className="flex flex-col gap-1 overflow-y-auto scrollbar-thin">
              {todays.map(e=> (
                <button key={e.id} onClick={()=>onEdit(e)} className="text-xs truncate px-2 py-1 rounded-lg" style={{background: (e.color||'#7c5cff')+ '33'}}>
                  {e.title}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
