import { BarChart3, Calendar, Settings, Tag } from 'lucide-react'

export type ViewMode = 'month'|'week'|'day'|'stats'

export default function Sidebar({ mode, setMode, tags, activeTags, setActiveTags }:{
  mode: ViewMode, setMode: (m:ViewMode)=>void,
  tags: string[], activeTags: string[], setActiveTags: (t:string[])=>void
}){
  return (
    <aside className="row-start-2 col-start-1 rounded-2xl bg-card p-3 flex flex-col gap-3">
      <nav className="grid gap-1">
        <NavBtn icon={<Calendar/>} label="Month" active={mode==='month'} onClick={()=>setMode('month')}/>
        <NavBtn icon={<Calendar/>} label="Week" active={mode==='week'} onClick={()=>setMode('week')}/>
        <NavBtn icon={<Calendar/>} label="Day" active={mode==='day'} onClick={()=>setMode('day')}/>
        <NavBtn icon={<BarChart3/>} label="Stats" active={mode==='stats'} onClick={()=>setMode('stats')}/>
      </nav>
      <div className="mt-2 text-sm opacity-70 flex items-center gap-2"><Tag className="h-4 w-4"/> Tags</div>
      <div className="flex flex-wrap gap-2">
        {tags.map(t=>{
          const active = activeTags.includes(t)
          return (
            <button key={t} onClick={()=>active?setActiveTags(activeTags.filter(x=>x!==t)):setActiveTags([...activeTags,t])}
              className={`px-2 py-1 rounded-lg text-xs border ${active? 'bg-accent/30 border-accent/40':'border-white/10'}`}>{t}</button>
          )
        })}
      </div>
      <div className="mt-auto text-xs opacity-50 flex items-center gap-2"><Settings className="h-4 w-4"/> Settings (stub)</div>
    </aside>
  )
}

function NavBtn({icon,label,active,onClick}:{icon:React.ReactNode,label:string,active?:boolean,onClick:()=>void}){
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${active? 'bg-accent/25':'hover:bg-white/5'}`}>{icon}<span>{label}</span></button>
  )
}
