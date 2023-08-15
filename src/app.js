const alerta = confirm ;

class Task {

  constructor (title, description){
    this.title = title,
    this.description = description
  }
  
  
}


class UI {
  
  addTask(newTask) {

    const listTasks = document.getElementById('tasksList');
    const elementList = document.createElement('div');
    elementList.classList.add('card', 'mb-3');
    elementList.innerHTML = 
    `
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
  };

  resetForm(){
    document.getElementById('tasks').reset();
  };


  deleteTask(element){
      if (element.name === 'delete'){
          
          //Modal confirm delete
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success mx-2 px-4 fs-4',
              cancelButton: 'btn btn-danger mx-2 px-3 fs-4'
            },
            buttonsStyling: false
          });
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `deleted task`,
                showConfirmButton: false,
                timer: 1500});
              element.parentElement.parentElement.remove();

            } 
          })
      }; 
    };
     
  completeTask(element){
    const brother = element.parentElement.previousSibling.previousSibling;
    if (element.name === 'complete'){
         brother.classList.toggle('complete');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `completed task`,
          showConfirmButton: false,
          timer: 1500})
        } 

      ;
      
  };

 editTask(element){
    let updateTitlie = document.querySelector('h2');
    let updateDescription = document.querySelector('p');
    
//añadir metodo para que cambie los 2 resultados, solo esta cambiando el titulo de la tarea 
   if (element.name == 'edit'){ 
     Swal.fire({
        title: '<h3 class="h1 ">Edit task</h3>',
        html: `<div class="card">
                  <div class="card-header">          
                    <form action="/" id="tasks" class="card-body">
                      <input class="form-control mb-3" type="text" id="titleEdit" value='${updateTitlie.textContent}'>
                      <textarea class="form-control mb-3" id="descriptionEdit" cols="38" rows="8" >${updateDescription.textContent}</textarea>
                    </form>
                  </div>
                </div>`,
        confirmButtonText: 'Save',
      }).then((result) =>{
        if (result.isConfirmed) {
          let title = document.getElementById('titleEdit').value;        
            updateTitlie.innerText = title; 
          let description =  document.getElementById('descriptionEdit').textContent;
          updateDescription.innerText = description;
  }
})
}
}
};


//DOM Events

const tasks = document.getElementById('tasks');

tasks.addEventListener('submit', (e)=> {

    const taskComplete = document.getElementById('title');
    const descriptionComplete = document.getElementById('description');
    
    const task = taskComplete.value;
    const description = descriptionComplete.value;

    if (task == ''){
      alert('Required title');
      taskComplete.style.backgroundColor = "red"
      setTimeout(()=>{
      
      taskComplete.style.backgroundColor = "white"
    }, 2000)
  } 
    else if(description == ''){
      alert("Required description");
      descriptionComplete.style.backgroundColor = "red";
      setTimeout(()=>{
      
     descriptionComplete.style.backgroundColor = "white"
    }, 2000)
    } 
    else{
    const newTask = new Task(task, description);

   const ui = new UI();
    ui.addTask(newTask);
    }
  e.preventDefault();

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })

});

document.getElementById('tasksList').addEventListener('click', (e)=>{
  const ui = new UI();
  ui.deleteTask(e.target);

});


document.getElementById('tasksList').addEventListener('click', (e)=>{
  const ui = new UI();
  ui.completeTask(e.target);

});

document.getElementById('tasksList').addEventListener('click', (e)=>{
  const ui = new UI();
  ui.editTask(e.target);

});

















    /* 

    const taskComplete = document.getElementById('title');
    const descriptionComplete = document.getElementById('description');
    
    if (element.name == 'edit'){ 
      taskComplete.value = updateTitlie.textContent;
      descriptionComplete.value = updateDescription.textContent;
      updateTitlie.textContent = taskComplete.value;
      updateDescription.textContent = descriptionComplete.value;
      
      tasks.addEventListener('click', ()=> {
        updateDescription.textContent = taskComplete.value;
        updateDescription.textContent = descriptionComplete.value;
        
      })
      updateDescription.parentElement.parentElement.remove();
    };
    
    */ 