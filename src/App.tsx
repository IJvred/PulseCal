import { useEffect, useMemo, useState } from 'react'
import Shell from './components/Shell'
import Topbar from './components/Topbar'
import Sidebar, { ViewMode } from './components/Sidebar'
import CalendarHeader from './components/CalendarHeader'
import MonthView from './components/MonthView'
import WeekView from './components/WeekView'
import DayView from './components/DayView'
import StatsView from './components/StatsView'
import EventDialog from './components/EventDialog'
import { listEventsExpanded, saveEvent, exportJSON } from './lib/storage'
import type { CalEvent } from './lib/db'

export default function App(){
  const [mode,setMode] = useState<ViewMode>('month')
  const [date,setDate] = useState(new Date())
  const [events,setEvents] = useState<CalEvent[]>([])
  const [search,setSearch] = useState('')
  const [activeTags,setActiveTags] = useState<string[]>([])
  const [editing,setEditing] = useState<CalEvent|undefined>()
  const [dialogOpen,setDialogOpen] = useState(false)

  const rangeStart = useMemo(()=>{
    if(mode==='month') return new Date(date.getFullYear(), date.getMonth(), 1)
    if(mode==='week') { const d=new Date(date); d.setDate(d.getDate() - ((d.getDay()+7-0)%7)); return d }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  },[date,mode])
  const rangeEnd = useMemo(()=>{
    if(mode==='month') return new Date(date.getFullYear(), date.getMonth()+1, 0, 23,59,59,999)
    if(mode==='week') { const d=new Date(rangeStart); d.setDate(d.getDate()+6); d.setHours(23,59,59,999); return d }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23,59,59,999)
  },[date,mode,rangeStart])

  async function refresh(){
    const data = await listEventsExpanded(rangeStart, rangeEnd)
    setEvents(data)
  }

  useEffect(()=>{ refresh() },[rangeStart.toISOString(), rangeEnd.toISOString()])

  const tags = useMemo(()=> Array.from(new Set(events.flatMap(e=> e.tags||[]))).sort(), [events])
  const filtered = useMemo(()=>{
    let out = events
    if(search) {
      const q = search.toLowerCase()
      out = out.filter(e=> (e.title+ (e.notes||'') + (e.tags||[]).join(',')).toLowerCase().includes(q))
    }
    if(activeTags.length){ out = out.filter(e=> e.tags?.some(t=> activeTags.includes(t))) }
    return out
  },[events,search,activeTags])

  function openNew(day?: Date){
    setEditing(day? {
      title:'', start:new Date(day.getFullYear(),day.getMonth(),day.getDate(),9,0).toISOString(),
      end:new Date(day.getFullYear(),day.getMonth(),day.getDate(),10,0).toISOString(),
      all_day:false, tags:[]
    } as any: undefined)
    setDialogOpen(true)
  }
  function openEdit(e: CalEvent){ setEditing(e); setDialogOpen(true) }

  async function handleSave(e: CalEvent){ await saveEvent(e); setDialogOpen(false); await refresh() }
  async function handleExport(){ const blob = new Blob([await exportJSON()], {type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='pulsecal.json'; a.click(); URL.revokeObjectURL(url) }

  return (
    <Shell>
      <Topbar onSearch={setSearch} onExport={handleExport} />
      <Sidebar mode={mode} setMode={setMode} tags={tags} activeTags={activeTags} setActiveTags={setActiveTags} />

      <main className="row-start-2 col-start-2 grid gap-3">
        {mode!=='stats' && <CalendarHeader date={date} setDate={setDate} onNew={()=>openNew(date)} />}
        {mode==='month' && <MonthView date={date} events={filtered} onPickDay={d=>openNew(d)} onEdit={openEdit} />}
        {mode==='week' && <WeekView date={date} events={filtered} onEdit={openEdit} />}
        {mode==='day' && <DayView date={date} events={filtered} onEdit={openEdit} />}
        {mode==='stats' && <StatsView start={rangeStart} end={rangeEnd} events={filtered} />}
      </main>

      <EventDialog open={dialogOpen} onClose={()=>setDialogOpen(false)} onSave={handleSave} initial={editing} />
    </Shell>
  )
}
