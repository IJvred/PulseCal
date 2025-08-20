# PulseCal — Desktop Calendar (Tauri + React)

A fast, modern desktop calendar you fully own. MIT licensed.

### Setup
1. Install Node 18+, Rust, and Tauri prerequisites: https://tauri.app
2. `npm install`
3. Dev: `npm run tauri dev`
4. Build installer: `npm run tauri build` (outputs to `src-tauri/target/release/bundle`)

### Roadmap (next shippable upgrades)
- ICS import/export (use `ics` npm or handle in Rust)
- Drag & drop to resize/move events in week/day views
- Reminders/notifications via Tauri notifications + tray
- Theming + light mode
- Data vault (password + optional cloud sync)
- Command palette + quick add (`q`)
- Multi-calendar support (separate colors, toggles)
- Google Calendar read-only sync (Google API OAuth)

### License
MIT — do what you want. Please retain copyright notice.
