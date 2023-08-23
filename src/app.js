const alerta = confirm;

class Task {
  constructor(title, description) {
    (this.title = title), (this.description = description);
  }
}

class UI {
  addTask(newTask) {
    const listTasks = document.getElementById("tasksList");
    const elementList = document.createElement("div");
    elementList.classList.add("card", "mb-3");
    elementList.innerHTML = `
    <section class="card-body">
      <h2 class="btn btn-outline-dark h3 d-block fs-1" type="button" data-bs-toggle="collapse" data-bs-target="#${newTask.title}" aria-expanded="false" aria-controls="${newTask.title}">${newTask.title}</h2>
      <p class="collapse fs-3" id="${newTask.title}">${newTask.description}</p>
    </section>
    <section class="container mb-3" id="buttons">
      <button type="button" class="btn btn-success mx-3" name="complete">Completar</button>
      <button type="button" class="btn btn-danger mx-3" name="delete">Eliminar</button>
      <button type="button" class="btn btn-secondary mx-3" name="edit">Editar</button>
    </section>
  `;

    listTasks.appendChild(elementList);
    this.resetForm();
  }

  resetForm() {
    document.getElementById("tasks").reset();
  }

  deleteTask(element) {
    if (element.name === "delete") {
      //Modal confirm delete
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mx-2 px-4 fs-4",
          cancelButton: "btn btn-danger mx-2 px-3 fs-4",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `deleted task`,
              showConfirmButton: false,
              timer: 1500,
            });
            element.parentElement.parentElement.remove();
          }
        });
    }
  }

  completeTask(element) {
    const brother = element.parentElement.previousSibling.previousSibling;
    if (element.name === "complete") {
      brother.classList.toggle("complete");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `completed task`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  editTask(element) {
    let updateTitlie = document.querySelector("h2");
    let updateDescription = document.querySelector("p");

    //añadir metodo para que cambie los 2 resultados, solo esta cambiando el titulo de la tarea
    if (element.name == "edit") {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mx-2 px-4 fs-4",
          cancelButton: "btn btn-danger mx-2 px-3 fs-4",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be edit task!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, edit it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const taskComplete = document.getElementById("title");
            const descriptionComplete = document.getElementById("description");

            if (element.name == "edit") {
              taskComplete.value = updateTitlie.textContent;
              descriptionComplete.value = updateDescription.textContent;
              updateTitlie.textContent = taskComplete.value;
              updateDescription.textContent = descriptionComplete.value;

              tasks.addEventListener("click", () => {
                updateDescription.textContent = taskComplete.value;
                updateDescription.textContent = descriptionComplete.value;
              });
              updateDescription.parentElement.parentElement.remove()
            }
          }
        });
    }
  }
}

//DOM Events

const tasks = document.getElementById("tasks");
const taskComplete = document.getElementById("title");
const descriptionComplete = document.getElementById("description");
const btnsubmit = document.getElementById("btnsubmit");

btnsubmit.setAttribute("disabled", false);

function btnBlock() {
  
  btnsubmit.removeAttribute("disabled");
}
  tasks.addEventListener("input", btnBlock);
  descriptionComplete.addEventListener("input", btnBlock);

tasks.addEventListener("submit", (e) => {
  const task = taskComplete.value;
  const description = descriptionComplete.value;

  const newTask = new Task(task, description);

  const ui = new UI();
  ui.addTask(newTask);
  e.preventDefault();

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  btnsubmit.setAttribute("disabled", false);
});

document.getElementById("tasksList").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteTask(e.target);
});

document.getElementById("tasksList").addEventListener("click", (e) => {
  const ui = new UI();
  ui.completeTask(e.target);
});

document.getElementById("tasksList").addEventListener("click", (e) => {
  const ui = new UI();
  ui.editTask(e.target);
});
