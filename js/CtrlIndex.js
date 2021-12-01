// @ts-nocheck
import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  urlStorage
} from "../lib/storage.js";
const firestore = getFirestore();
/** @type {HTMLUListElement} */
const lista = document.
  querySelector("#lista");
const daoAlumno = firestore.
  collection("Alumno");

getAuth().
  onAuthStateChanged(
    protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Artista"])) {
    consulta();
  }
}

function consulta() {
  daoAlumno.
    orderBy("titulo")
    .onSnapshot(
      htmlLista, errConsulta);
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    QuerySnapshot} snap */
function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    snap.forEach(doc =>
      html += htmlFila(doc));
  } else {
    html += /* html */
      `<li class="vacio">
        -- No hay obras registradas. --
      </li>`;
  }
  lista.innerHTML = html;
}
/**
 * @param {import(
    "../lib/tiposFire.js").
    DocumentSnapshot} doc */
function htmlFila(doc) {
  /**
   * @type {import("./tipos.js").
                  Alumno} */
  const data = doc.data();
  const titulo = cod(data.titulo);
  const autor = cod(data.autor);
  const parámetros =
    new URLSearchParams();
  const img = cod(
    await urlStorage(doc.id));
  parámetros.append("id", doc.id);
  return ( /* html */
    `
    <div class="col">
          <div class="card h-100">
            <img src="${img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${titulo}</h5>
              <p class="card-text"><b>Autor:</b>${autor}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Fecha: </small>
            </div>
          </div>
        </div>`);
}

/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}

