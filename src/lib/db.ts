import Database from '@tauri-apps/plugin-sql'

export type DB = Awaited<ReturnType<typeof Database.load>>
let dbPromise: Promise<DB> | null = null

export async function getDB() {
  if (!dbPromise) {
    dbPromise = Database.load('sqlite:pulsecal.db')
      .then(async (db) => {
        await db.execute(`
          CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            start TEXT NOT NULL,
            end TEXT NOT NULL,
            all_day INTEGER DEFAULT 0,
            notes TEXT,
            tags TEXT,
            color TEXT,
            rrule TEXT
          );
          CREATE INDEX IF NOT EXISTS idx_events_start ON events(start);
          CREATE INDEX IF NOT EXISTS idx_events_end ON events(end);
        `)
        return db
      })
  }
  return dbPromise
}

export type CalEvent = {
  id: string
  title: string
  start: string // ISO
  end: string   // ISO
  all_day?: boolean
  notes?: string
  tags?: string[]
  color?: string
  rrule?: string
}

export async function upsertEvent(e: CalEvent) {
  const db = await getDB()
  const tags = JSON.stringify(e.tags ?? [])
  await db.execute(
    `INSERT INTO events (id,title,start,end,all_day,notes,tags,color,rrule)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     ON CONFLICT(id) DO UPDATE SET title=$2,start=$3,end=$4,all_day=$5,notes=$6,tags=$7,color=$8,rrule=$9`,
    [e.id, e.title, e.start, e.end, e.all_day ? 1 : 0, e.notes ?? '', tags, e.color ?? '', e.rrule ?? '']
  )
}

export async function deleteEvent(id: string) {
  const db = await getDB()
  await db.execute(`DELETE FROM events WHERE id=$1`, [id])
}

export async function fetchEventsBetween(startISO: string, endISO: string) {
  const db = await getDB()
  const rows = await db.select<any[]>(
    `SELECT * FROM events WHERE end > $1 AND start < $2`, [startISO, endISO]
  )
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    start: r.start,
    end: r.end,
    all_day: !!r.all_day,
    notes: r.notes ?? '',
    tags: (() => { try { return JSON.parse(r.tags||'[]') } catch { return [] } })(),
    color: r.color || '',
    rrule: r.rrule || ''
  })) as CalEvent[]
}

export async function search(query: string) {
  const db = await getDB()
  const q = `%${query.toLowerCase()}%`
  const rows = await db.select<any[]>(
    `SELECT * FROM events
     WHERE lower(title) LIKE $1 OR lower(notes) LIKE $1 OR lower(tags) LIKE $1
     ORDER BY start DESC
     LIMIT 200`, [q]
  )
  return rows as any
}
