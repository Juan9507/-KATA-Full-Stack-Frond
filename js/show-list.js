import { getAllLista } from "./end-points.js";
import { getAllIdTask } from "./end-points.js";
import { crearLista } from "./end-points.js";

const $container = document.querySelector(".container");
const $btnCrearList = document.querySelector("#btn_crear_lista");
const $inputCrearList = document.querySelector("#input_lista");
/**
 * Funcion para mostrar las listas
 * tambien se instancia el metodo getTask() para mostrar
 * las tareas de esa lista
 */
export const showNombreList = async () => {
  let listName = await getAllLista();
  listName.forEach(async (item, index) => {
    let task = await getAllIdTask(item.id);
    console.log(item.listName);

    const $card = document.createElement("div");
    $card.classList.add("card", "shadow", "mt-4");
    const $cardBody = document.createElement("div");
    $cardBody.classList.add("card-body");
    $card.appendChild($cardBody);
    const $cardTitle = document.createElement("div");
    $cardTitle.classList.add("card-title");
    $cardBody.appendChild($cardTitle);
    const $rowDeleteList = document.createElement("row");
    $rowDeleteList.classList.add("row");
    $cardTitle.appendChild($rowDeleteList);
    const $colPtitle = document.createElement("div");
    $colPtitle.classList.add("col-md-4");
    $rowDeleteList.appendChild($colPtitle);
    const $pTitle = document.createElement("p");
    $pTitle.classList.add("list_title");
    $pTitle.textContent = item.listName;
    const $colBtnInputDelete = document.createElement("div");
    $colBtnInputDelete.classList.add("col-md-1");
    $rowDeleteList.appendChild($colBtnInputDelete);
    const $btnDeleteList = document.createElement("button");
    $btnDeleteList.classList.add("btn", "btn-danger");
    $btnDeleteList.textContent = "eliminar";
    $btnDeleteList.dataset.id = item.id;
    $colPtitle.appendChild($pTitle);
    $colBtnInputDelete.appendChild($btnDeleteList);
    const $row = document.createElement("div");
    $row.classList.add("row");
    const $colInput = document.createElement("div");
    $colInput.classList.add("col-md-4");
    $cardBody.appendChild($row);
    $row.appendChild($colInput);
    const $inputCreateTask = document.createElement("input");
    $inputCreateTask.classList.add(
      "form-control",
      `input_create_task${item.id}`
    );
    $inputCreateTask.type = "text";
    $inputCreateTask.name = `input_lista${item.id}`;
    $inputCreateTask.required;
    $inputCreateTask.placeholder = "Lista de TO-DO";
    $inputCreateTask.value = "";
    $colInput.appendChild($inputCreateTask);
    const $colBtnCreateTask = document.createElement("div");
    $colBtnCreateTask.classList.add("col-md-1");
    $row.appendChild($colBtnCreateTask);
    const $btnCtreateTask = document.createElement("button");
    $btnCtreateTask.classList.add(
      "btn",
      "btn-secondary",
      "shadow",
      "btn_crear_lista"
    );
    $btnCtreateTask.type = "button";
    $btnCtreateTask.dataset.id = item.id;
    $btnCtreateTask.textContent = "Crear";
    $colBtnCreateTask.appendChild($btnCtreateTask);
    const $rowTaskShow = document.createElement("div");
    $rowTaskShow.classList.add("row");
    $cardBody.appendChild($rowTaskShow);

    task.forEach((itemTask) => {
      const $colTaskShow = document.createElement("div");
      const $colidTask = document.createElement("div");
      $colidTask.classList.add("col-md-2", "mt-5", "text-center");
      $rowTaskShow.appendChild($colidTask);
      const $idTaskText = document.createElement("p");
      $idTaskText.textContent = itemTask.id;
      $colidTask.appendChild($idTaskText);
      $colTaskShow.classList.add("col-md-6", "mt-5");
      $rowTaskShow.appendChild($colTaskShow);
      const $checkShowTask = document.createElement("div");
      $checkShowTask.classList.add("input-group-text");
      const $inputCheckTask = document.createElement("input");
      $inputCheckTask.type = "checkbox";
      $inputCheckTask.value = itemTask.id;
      $inputCheckTask.readOnly;
      const $spanTetxCheck = document.createElement("span");
      $spanTetxCheck.classList.add("ml-3");
      $spanTetxCheck.textContent = itemTask.task;
      $checkShowTask.appendChild($inputCheckTask);
      $checkShowTask.appendChild($spanTetxCheck);
      const $colBtnEditTask = document.createElement("div");
      $colBtnCreateTask.classList.add("col-md-3");
      const $btnEditTask = document.createElement("button");
      $btnEditTask.classList.add(
        "editar_task",
        "btn-lg",
        "btn-warning",
        "d-flex",
        "align-items-center",
        "justify-content-center",
        "mt-5"
      );
      $btnEditTask.id = "editar_task";
      $btnEditTask.type = "button";
      $btnEditTask.textContent = "Editar";
      $btnEditTask.dataset.id = itemTask.id;
      const $colBtnDeleteTask = document.createElement("div");
      $colBtnDeleteTask.classList.add("col-md-3");
      const $btnDeleteTask = document.createElement("button");
      $btnDeleteTask.classList.add(
        "editar_task",
        "btn-lg",
        "btn-danger",
        "d-flex",
        "align-items-center",
        "justify-content-center",
        "mt-5"
      );
      $btnDeleteTask.id = "editar_task";
      $btnDeleteTask.type = "button";
      $btnDeleteTask.textContent = "Eliminar";
      $btnDeleteTask.dataset.id = itemTask.id;

      $colTaskShow.appendChild($checkShowTask);

      $rowTaskShow.appendChild($colBtnEditTask);
      $rowTaskShow.appendChild($colBtnDeleteTask);
      $colBtnEditTask.appendChild($btnEditTask);
      $colBtnDeleteTask.appendChild($btnDeleteTask);
      console.log(itemTask.id);
      console.log(itemTask.task);
    });
    $container.appendChild($card);
  });

  /**
   * Evento para guardar una lista
   */
  $btnCrearList.addEventListener("click", async (e) => {
    let listName = $inputCrearList.value;
    if (listName != "") {
      let json = await crearLista(listName);
      if (json != "") {
        location.reload();
      } else {
        console.log("error");
      }
    } else {
      alert("no se permite el campo vacio");
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".btn_crear_lista")) {
      const inputCreateTask = document.querySelector(
        `.input_create_task${e.target.dataset.id}`
      );
      if (inputCreateTask.value != "") {
        console.log(inputCreateTask.value);
      } else {
        alert("Este campo no puede estar vacio");
      }
    }
  });
};
