import "./App.css";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

const sum = () => {
  const num1 = document.getElementById("num1") as HTMLInputElement;
  const num2 = document.getElementById("num2") as HTMLInputElement;

  const resultado = invoke("sumar", {
    a: parseInt(num1.value),
    b: parseInt(num2.value),
  });

  const resultadoElement = document.getElementById(
    "resultado",
  ) as HTMLParagraphElement;

  resultado.then((result) => {
    resultadoElement.textContent = `El resultado es: ${result}`;
  });
};

const crearHuman = () => {
  const edad = document.getElementById("edadHumano") as HTMLInputElement;
  const email = document.getElementById("emailHumano") as HTMLInputElement;
  const nombre = document.getElementById("nombreHumano") as HTMLInputElement;

  const humanoCreado = invoke("crear_humano", {
    humano: {
      edad: parseInt(edad.value),
      email: email.value,
      nombre: nombre.value,
    },
  });

  const humanoElement = document.getElementById(
    "humanoCreado",
  ) as HTMLParagraphElement;

  humanoCreado.then((result) => {
    humanoElement.innerHTML = JSON.stringify(result);
  });
};

const usuario = {
  nombre: "Angel",
  email: "angel@mail.com",
  password: "secreto123",
};

invoke("registrar", { usuario }).then((result) => console.log(result));

listen("mensaje-recibido", (event) => {
  const el = document.getElementById("mensaje") as HTMLParagraphElement;
  el.textContent = `Recibido: ${event.payload.contenido}`;
});

const enviarMensaje = () => {
  const input = document.getElementById("msgInput") as HTMLInputElement;
  invoke("mandarMensaje", { mensaje: { contenido: input.value } });
};

function App() {
  return (
    <main className="container">
      <div>
        <input type="number" id="num1"></input>
        <input type="number" id="num2"></input>
        <button onClick={sum}>Sumar</button>
        <p id="resultado"></p>
        <br />
        <input type="number" placeholder="edad" id="edadHumano" />
        <br />
        <input type="text " placeholder="email" id="emailHumano" />
        <br />
        <input type="text " placeholder="nombre" id="nombreHumano" />
        <button onClick={crearHuman}>crea humano</button>
        <p id="humanoCreado"></p>

        <input type="text" id="msgInput" />
        <button onClick={enviarMensaje}>enviar</button>
        <p id="mensaje"></p>
      </div>
    </main>
  );
}

export default App;
