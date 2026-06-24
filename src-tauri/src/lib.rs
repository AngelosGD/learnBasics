// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter};

#[tauri::command]
fn sumar(a: i32, b: i32) -> i32 {
    return a + b;
}

#[tauri::command]
fn num1(a: i32) -> i32 {
    return a;
}

#[tauri::command]
fn num2(b: i32) -> i32 {
    return b;
}

//? se manda la estructura al front la cual se le da valor desde el front
#[derive(Serialize, Deserialize)]
struct Usuario {
    nombre: String,
    email: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
struct Humano {
    edad: i32,
    email: String,
    nombre: String,
}

#[tauri::command]
fn crear_humano(humano: Humano) -> Humano {
    return humano;
}

#[tauri::command]
fn registrar(usuario: Usuario) -> String {
    format!(
        "Usuario registrado: {} - {} - {}",
        usuario.nombre, usuario.email, usuario.password
    )
}
#[derive(Serialize, Deserialize)]
struct Mensaje {
    contenido: String,
}

#[tauri::command]
fn mandarMensaje(appHandle: AppHandle, mensaje: Mensaje) -> String {
    appHandle.emit("mensaje-recibido", &mensaje).unwrap();
    format!("mensaje enviado {}", mensaje.contenido)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            sumar,
            num1,
            num2,
            registrar,
            crear_humano,
            mandarMensaje
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
