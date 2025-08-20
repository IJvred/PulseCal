export const toISO = (d: Date) => d.toISOString()
export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23,59,59,999)
export const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate()+n); return x }
export const sameDay = (a: Date, b: Date) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate()
export const weekStart = (d: Date, weekStartsOn=0) => { const x=new Date(d); const day=(x.getDay()-weekStartsOn+7)%7; x.setDate(x.getDate()-day); return startOfDay(x) }
export const weekEnd = (d: Date, weekStartsOn=0) => { const s=weekStart(d,weekStartsOn); return new Date(s.getFullYear(),s.getMonth(),s.getDate()+6,23,59,59,999) }
