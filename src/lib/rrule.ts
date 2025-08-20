import { RRule, rrulestr } from 'rrule'
import type { CalEvent } from './db'

export function expandRecurring(e: CalEvent, rangeStart: Date, rangeEnd: Date): CalEvent[] {
  if (!e.rrule) return [e]
  try {
    const rule = rrulestr(`DTSTART:${formatDateUTC(e.start)}\nRRULE:${e.rrule}`, { forceset: false }) as RRule
    const dates = rule.between(rangeStart, rangeEnd, true)
    return dates.map(dt => ({ ...e, start: dt.toISOString(), end: new Date(dt.getTime() + (new Date(e.end).getTime()-new Date(e.start).getTime())).toISOString() }))
  } catch { return [e] }
}

function pad(n: number) { return String(n).padStart(2,'0') }
function formatDateUTC(iso: string) {
  const d = new Date(iso)
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
}
