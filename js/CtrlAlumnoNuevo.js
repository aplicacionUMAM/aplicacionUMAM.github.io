import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraAlumnos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  subeStorage
} from "../lib/storage.js";

const daoAlumno =
  getFirestore().
    collection("Alumno");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Artista"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);  
    const titulo = getString(formData, "titulo").trim();
    const autor = getString(formData, "autor").trim();
    const usuario = getString(formData, "usuario").trim();
    const obra =
      formData.get("obra");
    const fecha = getString(formData, "fecha").trim();
    const nombre = fecha + usuario;
    await subeStorage(nombre, obra);
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    await daoAlumno.
      doc(nombre).
      set({
        titulo,
        autor,
        usuario,
        fecha 
      });
    muestraAlumnos();
  } catch (e) {
    muestraError(e);
  }
}

/** Muestra los datos del usuario
 * o manda a iniciar sesión en
 * caso de que no haya empezado.
 * @param {import(
    "../lib/tiposFire").
    User} usuario modelo con las
 *    características del usuario
 *    o null si no ha iniciado
 *    sesión. */
    async function
    muestraCorreo(usuario) {
    if (usuario && usuario.email) {
      // Usuario aceptado.
      forma.usuario.value =
        usuario.email || "";
    } else {
      // No ha iniciado sesión.
      iniciaSesión();
    }
  }
