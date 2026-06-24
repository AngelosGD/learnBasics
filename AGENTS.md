# AGENTS.md

## Project

Tauri v2 desktop app: React 19 + TypeScript frontend, Rust backend.

- Frontend entry: `src/main.tsx` → `src/App.tsx`
- Backend entry: `src-tauri/src/main.rs` → `src-tauri/src/lib.rs`
- Frontend calls Rust via `invoke("command_name", { args })` from `@tauri-apps/api/core`
- Rust commands defined with `#[tauri::command]` and registered in `lib.rs` via `generate_handler![]`

## Commands

```bash
npm run tauri dev     # Development (Vite + Rust sidecar, Vite on port 1420)
npm run tauri build   # Production build
npm run dev           # Frontend only: Vite dev server
npm run build         # Frontend only: tsc + vite build
npm run preview       # Preview built frontend
```

- `npm run tauri` is a convenience alias for `npx tauri`.
- Vite ignores `src-tauri/**` from its file watcher; Rust changes won't trigger HMR.
- No test, lint, or formatter configured.

## Structure

```
src/                  # React frontend (TypeScript, strict mode)
src-tauri/
  src/lib.rs          # Rust app logic + Tauri commands
  src/main.rs         # Windows subsystem entry, calls lib::run()
  tauri.conf.json     # Tauri config (dev/build commands, window, bundling)
  capabilities/       # Tauri v2 permission declarations (default.json)
  Cargo.toml          # Rust dependencies
```

## Tauri v2 specifics

- Permissions: `src-tauri/capabilities/default.json` controls frontend access (`core:default`, `opener:default`)
- Adding a new Rust command: define function in `lib.rs`, register in `generate_handler![]`, add plugin permissions if needed
- Dev server hardcoded to `localhost:1420`; Vite HMR on port `1421` when `TAURI_DEV_HOST` is set
- Rust lib crate named `learnbasics_lib` (avoids Windows bin/lib name conflict, see `Cargo.toml`)

## TypeScript

- Strict mode: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` all enabled
- Target ES2020, JSX react-jsx, bundler module resolution

## Learning project conventions

- `referencia.md` at repo root has: concept reference, record of all commands created, structs, frontend code summary, known bugs, and a roadmap of next Tauri concepts to learn.
- The user prefers to write code themselves after seeing examples; do not write code unless asked.
- Known in-progress bugs (don't treat as regressions): event name typo `"mensae-recibido"` in `mandarMensaje` (`lib.rs:53`).
