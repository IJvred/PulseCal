export default function TagPills({ list }:{ list: string[] }){
  if(!list?.length) return null
  return <div className="flex flex-wrap gap-1">{list.map(t=> <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{t}</span>)}</div>
}
