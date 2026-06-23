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
