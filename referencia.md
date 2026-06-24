# Referencia de aprendizaje — Tauri + React

## Llamar funciones de Rust desde el front

- `invoke("nombre_comando", { args })` desde `@tauri-apps/api/core`
- Comando en Rust: `#[tauri::command] fn nombre(args) -> Tipo`
- Registrar en `generate_handler![nombre]`
- Los nombres de parámetros en Rust y en el `invoke` deben coincidir exactamente

## Datos complejos (serde)

- Structs en Rust con `#[derive(Serialize, Deserialize)]`
- Se pasan como objetos desde el front
- Tauri serializa/deserializa automáticamente a JSON
- `Option<T>` para campos opcionales, `#[serde(default)]` para valores por defecto
- El parámetro del comando Rust se pasa como clave en el objeto del `invoke`

## Eventos

- Comunicación Rust → Front (sin que el front pregunte)
- Rust: `app_handle.emit("evento", payload)` — `AppHandle` se inyecta solo
- Front: `listen("evento", callback)` devuelve una función `unlisten` para cleanup
- Front también puede emitir eventos con `emit`, pero es menos común
- Diferencia con `invoke`: eventos no esperan respuesta, son unidireccionales

## Comandos creados en lib.rs

| Comando | Args | Retorno | Descripción |
|---|---|---|---|
| `sumar` | `a: i32, b: i32` | `i32` | Suma dos números |
| `num1` / `num2` | `a: i32` / `b: i32` | `i32` | Devuelve el mismo número |
| `registrar` | `usuario: Usuario` | `String` | Recibe un struct Usuario y lo formatea |
| `crear_humano` | `humano: Humano` | `Humano` | Recibe y devuelve un struct Humano |
| `mandarMensaje` | `mensaje: Mensaje` | `String` | Emite evento `"mensae-recibido"` al front |

## Structs compartidas (Rust ↔ Front)

```rust
struct Usuario  { nombre: String, email: String, password: String }
struct Humano   { edad: i32, email: String, nombre: String }
struct Mensaje  { contenido: String }
```

## Frontend (App.tsx)

- `invoke("sumar", { a, b })` desde `sum()` → muestra resultado en `<p id="resultado">`
- `invoke("crear_humano", { humano })` desde `crearHuman()` → muestra JSON en `<p id="humanoCreado">`
- `invoke("registrar", { usuario })` al cargar → logea en consola
- `listen("mensae-recibido", callback)` → recibe el evento y lo muestra en `<p id="mensaje">`
- `invoke("mandarMensaje", { mensaje })` desde `enviarMensaje()` → envía texto al backend

## Bugs conocidos

- Event name typo: `"mensae-recibido"` en lugar de `"mensaje-recibido"` en `lib.rs:53`

## Siguientes pasos para apps propias

Conceptos básicos que conviene dominar para hacer apps solo:

1. **useState + useEffect** — manejar estado React y llamar `invoke` al montar componentes
2. **useRef + getElementById** (o mejor, estados controlados con `onChange`)
3. **Manejo de errores** — `invoke(...).then(...).catch(...)` o `try/catch` con `async/await`
4. **Múltiples comandos y más tipos** — `Result<T, E>`, `Vec<T>`, enum con serde
5. **Tauri APIs nativas** — `@tauri-apps/plugin-dialog`, `@tauri-apps/plugin-fs`, `@tauri-apps/plugin-shell`
6. **Configuración de ventana** — `tauri.conf.json`: tamaño, título, decorations, `resizable`
7. **Permisos** — agregar plugins a `Cargo.toml`, `capabilities/default.json`, y registrar handlers
8. **Menús y tray** — menús de aplicación, bandeja del sistema
9. **Build y distribución** — `npm run tauri build`, `bundle.targets`, iconos
10. **Multi-ventana** — `WebviewWindow`, comunicación entre ventanas con eventos
