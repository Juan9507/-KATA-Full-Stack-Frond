const url = "http://localhost:8080/api/";

/**
 * Funcion para treaer todas las listas
 */
export const getAllLista = async () => {
  try {
    let res = await fetch(url + "list");
    let json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return json;
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  }
};

/**
 * Funcion para traer las tareas de una lista
 * dependiendo el id
 * @param {*} id - enviamos el is
 * @returns - retorna la promesa
 */
export const getAllIdTask = async (id) => {
  try {
    let res = await fetch(url + "ToDo/" + id);
    let json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return await json;
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  }
};

/**
 * Funcion
 * @param {*} listName
 * @returns
 */
export const crearLista = async (listName) => {
  try {
    let options = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          listName: listName,
        }),
      },
      res = await fetch(url + "list/save", options),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return json;
    //location.reload();
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  }
};

export const crearTarea = async (task, complete, id) => {
  try {
    let options = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          task: task,
          complete: complete,
          lista: {
            id: id,
          },
        }),
      },
      res = await fetch(url + "ToDo/save", options),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return json;
    //location.reload();
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  }
};

export const editarTarea = async (idTask, idList, task, complete) => {
  try {
    let options = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          id: idTask,
          task: task,
          complete: complete,
          lista: {
            id: idList,
          },
        }),
      },
      res = await fetch(url + "ToDo/save", options),
      json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return json;
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  }
};

export const eliminarTask = async (id) => {
  try {
    let options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
      },
      res = await fetch(url + "ToDo/" + id, options),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return json;
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  }
};

export const eliminarLista = async (id) => {
  try {
    let options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
      },
      res = await fetch(url + "list/" + id, options),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return json;
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  }
};
