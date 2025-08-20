import { getDB, CalEvent, upsertEvent, deleteEvent, fetchEventsBetween } from './db'
import { expandRecurring } from './rrule'

export async function listEventsExpanded(rangeStart: Date, rangeEnd: Date) {
  const base = await fetchEventsBetween(rangeStart.toISOString(), rangeEnd.toISOString())
  return base.flatMap(e => expandRecurring(e, rangeStart, rangeEnd))
}

export async function saveEvent(e: CalEvent) { await upsertEvent(e) }
export async function removeEvent(id: string) { await deleteEvent(id) }

export async function exportJSON() {
  const db = await getDB();
  const rows = await db.select<any[]>(`SELECT * FROM events`)
  return JSON.stringify(rows, null, 2)
}
