const urlBase = "http://localhost:3000/users";

//selectores
const userForm = document.querySelector("#userForm");
const tBody = document.querySelector("#tbody");
const userName = document.querySelector("#userName");
const userAge = document.querySelector("#userAge");
const idUser = document.querySelector("#idUser");

//eventos
document.addEventListener("DOMContentLoaded", getUsers);

userForm.addEventListener("submit", (event) => {
  //quitar acciones por defecto
  event.preventDefault();

  // llamado funcion que se encarga de agregar el usuario
  if (idUser.value) {
    updateUser(idUser.value);
  } else {
    addUser();
  }
});
//funcion para agregar usuario
async function addUser() {
  //guardado de informacion usuario en un objeto
  const newUser = {
    name: userName.value,
    age: userAge.value,
  };
  //console.log(newUser.name, newUser.age);

  //petición HTTP

  /* 
    ******verbos HTTP**********
        1. GET = OBTENER 
        2. POST = CREAR
        3. PUT = ACTUALIZAR
        3. DELETE = ELIMINAR
    ***************************
    */

  await fetch(urlBase, {
    //method especifico el metodo de la petición (métodos en MAYUS)
    method: "POST",
    headers: {
      //indicio en que formato voy a enviar la petición
      "Content-Type": "application/json",
    },
    //envío la petición
    body: JSON.stringify(newUser),
  });
}

function getUsers() {
  fetch(urlBase)
    .then((respuesta) => respuesta.json())
    .then((data) => redenrUsers(data))
    .catch((error) => console.error(error));
}

function redenrUsers(users) {
  users.forEach((user) => {
    //td
    const tdName = document.createElement("td");
    const tdAge = document.createElement("td");
    const tdActions = document.createElement("td");

    //buttons
    const btnUpdate = document.createElement("button");
    const btnDelete = document.createElement("button");

    //tr
    const tr = document.createElement("tr");

    btnDelete.classList.add("btn", "btn-danger", "mx-2");
    btnUpdate.classList.add("btn", "btn-primary", "mx-2");
    btnDelete.textContent = "Delete";
    btnUpdate.textContent = "Edit";

    btnDelete.addEventListener("click", () => {
      console.log("eliminando");
      deleteUser(user.id);
    });
    btnUpdate.addEventListener("click", () => {
      console.log("actualizando");
      loadingInfo(user);
    });

    tdName.textContent = user.name;
    tdAge.textContent = user.age;
    //tdActions.textContent=user.action;

    //appendchild

    tdActions.appendChild(btnDelete);
    tdActions.appendChild(btnUpdate);

    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tr.appendChild(tdActions);

    tBody.appendChild(tr);
  });
}

async function deleteUser(id) {
  //mirar la id que llega para borrar
  //console.log(`${urlBase}/${id}`);

  await fetch(`${urlBase}/${id}`, {
    method: "DELETE",
  });
}

function loadingInfo(user) {
  userAge.value = user.age;
  userName.value = user.name;
  idUser.value = user.id;
}

async function updateUser(user) {
  try {
    const userUpdate = {
      name: userName.value,
      age: userAge.value,
    };
    await fetch(`${urlBase}/${user}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userUpdate),
    });
  } catch (error) {
    console.log(error);
  }
}
