# AGENTS.md

## Project

Tauri v2 desktop app: React 19 + TypeScript frontend, Rust backend.

- Frontend entry: `src/main.tsx` → `src/App.tsx`
- Backend entry: `src-tauri/src/main.rs` → `src-tauri/src/lib.rs`
- Frontend calls Rust via `invoke("command_name", { args })` from `@tauri-apps/api/core`
- Rust commands defined with `#[tauri::command]` and registered in `lib.rs` via `invoke_handler`

## Commands

```bash
# Development (starts Vite + Rust sidecar, Vite on port 1420)
npm run tauri dev

# Build for production
npm run tauri build

# Frontend only (no Rust)
npm run dev          # Vite dev server
npm run build        # tsc + vite build
npm run preview      # preview built frontend
```

There is no test, lint, or formatter configured.

## Structure

```
src/                  # React frontend (TypeScript, strict mode)
src-tauri/
  src/lib.rs          # Rust app logic + Tauri commands
  src/main.rs         # Windows subsystem entry, calls lib::run()
  tauri.conf.json     # Tauri config (dev/build commands, window, bundling)
  capabilities/       # Tauri v2 permission declarations
  Cargo.toml          # Rust dependencies
```

## Tauri v2 specifics

- Permissions system: `src-tauri/capabilities/default.json` controls what the frontend can access (`core:default`, `opener:default`)
- Adding a new Rust command: define function in `lib.rs`, register in `generate_handler![]`, add Tauri plugin permissions if needed
- Dev server hardcoded to `localhost:1420`; Vite HMR on port `1421` when `TAURI_DEV_HOST` is set
- Rust lib crate is named `learnbasics_lib` (avoids Windows bin/lib name conflict)

## TypeScript

- Strict mode: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` all enabled
- Target ES2020, JSX react-jsx, bundler module resolution
