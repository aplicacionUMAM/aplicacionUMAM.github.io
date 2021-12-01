// @ts-nocheck
import {
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  urlStorage
} from "../lib/storage.js";
const firestore = getFirestore();
/** @type {HTMLUListElement} */
const lista = document.
  querySelector("#lista");
const daoAlumno = firestore.
  collection("Alumno");


async function consulta() {
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
  parámetros.append("id", doc.id);
  return ( /* html */
    `<li>
        <strong class="primario">
          Título: ${titulo} Autor: ${autor}
        </strong>
    </li>`);
}

/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}
