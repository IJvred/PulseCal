import type { CalEvent } from '../lib/db'
export default function EventCard({ e }:{ e: CalEvent }){
  return (
    <div className="rounded-xl p-2" style={{background:(e.color||'#7c5cff')+'22'}}>
      <div className="text-sm font-medium">{e.title}</div>
    </div>
  )
}
