import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { CalEvent } from '../lib/db'

export default function StatsView({ start, end, events }:{ start: Date, end: Date, events: CalEvent[] }){
  const perTag = useMemo(()=>{
    const map = new Map<string, number>()
    for(const e of events){
      const dur = (new Date(e.end).getTime() - new Date(e.start).getTime()) / 3600000
      for(const t of (e.tags||['(untagged)'])){
        map.set(t, (map.get(t)||0) + (dur>0? dur: 0))
      }
    }
    const arr = [...map.entries()].map(([tag,hours])=>({ tag, hours: Math.round(hours*10)/10 }))
    arr.sort((a,b)=> b.hours-a.hours)
    return arr
  },[events])

  return (
    <div className="rounded-2xl bg-card p-4 h-full grid grid-rows-[auto_1fr] gap-4">
      <div className="text-sm opacity-70">{start.toLocaleDateString()} — {end.toLocaleDateString()}</div>
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={perTag}>
            <XAxis dataKey="tag" interval={0} angle={-20} textAnchor="end" height={70} />
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="hours" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
