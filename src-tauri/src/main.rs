#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri_plugin_sql::TauriSql;

fn main() {
  tauri::Builder::default()
    .plugin(TauriSql::default())
    .setup(|app| {
      let _main = app.get_webview_window("main");
      Ok(())

    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
