import { useEffect, useState } from 'react'
import type { CalEvent } from '../lib/db'
import { v4 as uuid } from 'uuid'

export default function EventDialog({ open, onClose, onSave, initial }:{
  open: boolean,
  onClose: ()=>void,
  onSave: (e: CalEvent)=>void,
  initial?: Partial<CalEvent>
}){
  const [title,setTitle] = useState(initial?.title||'')
  const [date,setDate] = useState(initial?.start? new Date(initial.start).toISOString().slice(0,10) : new Date().toISOString().slice(0,10))
  const [startTime,setStartTime] = useState(initial?.start? new Date(initial.start).toISOString().slice(11,16) : '09:00')
  const [endTime,setEndTime] = useState(initial?.end? new Date(initial.end).toISOString().slice(11,16) : '10:00')
  const [allDay,setAllDay] = useState(initial?.all_day||false)
  const [notes,setNotes] = useState(initial?.notes||'')
  const [tags,setTags] = useState<string[]>(initial?.tags||[])
  const [color,setColor] = useState(initial?.color||'#7c5cff')
  const [rrule,setRrule] = useState(initial?.rrule||'')

  useEffect(()=>{
    if(!open) return
    setTitle(initial?.title||'')
    setDate(initial?.start? new Date(initial.start).toISOString().slice(0,10) : new Date().toISOString().slice(0,10))
    setStartTime(initial?.start? new Date(initial.start).toISOString().slice(11,16) : '09:00')
    setEndTime(initial?.end? new Date(initial.end).toISOString().slice(11,16) : '10:00')
    setAllDay(initial?.all_day||false)
    setNotes(initial?.notes||'')
    setTags(initial?.tags||[])
    setColor(initial?.color||'#7c5cff')
    setRrule(initial?.rrule||'')
  },[open])

  if(!open) return null

  function handleSave(){
    const start = new Date(`${date}T${allDay? '00:00':startTime}:00`)
    const end = new Date(`${date}T${allDay? '23:59':endTime}:00`)
    const evt: CalEvent = {
      id: initial?.id || uuid(),
      title, start: start.toISOString(), end: end.toISOString(),
      all_day: allDay, notes, tags, color, rrule: rrule.trim()||undefined
    }
    onSave(evt)
  }

  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center z-50">
      <div className="w-[560px] max-w-[92vw] rounded-2xl bg-card p-4 grid gap-3">
        <div className="text-lg font-semibold">{initial?.id? 'Edit event' : 'New event'}</div>
        <input className="px-3 py-2 rounded-xl bg-[#16161f]" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <div className="grid grid-cols-3 gap-2">
          <label className="grid gap-1 text-sm">Date<input type="date" className="px-3 py-2 rounded-xl bg-[#16161f]" value={date} onChange={e=>setDate(e.target.value)} /></label>
          <label className="grid gap-1 text-sm">Start<input type="time" disabled={allDay} className="px-3 py-2 rounded-xl bg-[#16161f]" value={startTime} onChange={e=>setStartTime(e.target.value)} /></label>
          <label className="grid gap-1 text-sm">End<input type="time" disabled={allDay} className="px-3 py-2 rounded-xl bg-[#16161f]" value={endTime} onChange={e=>setEndTime(e.target.value)} /></label>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={allDay} onChange={e=>setAllDay(e.target.checked)} /> All day</label>
        <textarea className="px-3 py-2 rounded-xl bg-[#16161f] min-h-[80px]" placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)} />
        <input className="px-3 py-2 rounded-xl bg-[#16161f]" placeholder="Comma separated tags (work, gym)" value={tags.join(', ')} onChange={e=>setTags(e.target.value.split(',').map(t=>t.trim()).filter(Boolean))} />
        <div className="grid grid-cols-2 gap-2">
          <label className="grid gap-1 text-sm">Color<input type="color" value={color} onChange={e=>setColor(e.target.value)} /></label>
          <label className="grid gap-1 text-sm">RRULE<input className="px-3 py-2 rounded-xl bg-[#16161f]" placeholder="e.g. FREQ=WEEKLY;BYDAY=MO,WE,FR" value={rrule} onChange={e=>setRrule(e.target.value)} /></label>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button className="px-3 py-2 rounded-xl hover:bg-white/10" onClick={onClose}>Cancel</button>
          <button className="px-3 py-2 rounded-xl bg-accent/40 hover:bg-accent/60" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
