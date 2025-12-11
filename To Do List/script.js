var tasks = [];
var counter = 0;

window.onload = async () => {
  let temp = document.createElement('h1');
  document.querySelector(".tasks").append(temp);
  temp.innerHTML = "Loading...";

  await new Promise(resolve => setTimeout(resolve, 3000));
  temp.remove();

  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  counter = tasks.length > 0 ? tasks[tasks.length - 1].taskId + 1 : 0;
  tasks.forEach(task => showTask(task));
  document.querySelector("#newTask").focus();
};

function addTask() {
  let taskInput = document.querySelector("#newTask");
  let taskname = taskInput.value.trim();

  if (taskname === "") {
    alert("Enter Task Name");
    return;
  }

  let task = { taskId: counter, taskName: taskname, isDone: false };
  counter++;
  tasks.push(task);
  updateLocalStorage();

  showTask(task);
  taskInput.value = "";
  taskInput.focus();
}

function editTask(id) {
  let task = tasks.find(t => t.taskId === id);
  if (!task) return;

  let newName = prompt("Edit task name:", task.taskName);
  if (newName != "" && newName.trim() !== "") {
    task.taskName = newNamdocument.querySelector("#finish").innerHTML = "Finished"; e.trim();
    updateLocalStorage();

    document.querySelector(`#task-${id} p`).innerHTML = task.taskName;
  }
}

function deleteTask(id) {
  let index = tasks.findIndex(t => t.taskId === id);
  if (index === -1) return;

  tasks.splice(index, 1);
  updateLocalStorage();

  let temp = document.getElementById(`task-${id}`);
  temp.remove();

  if (!tasks.find(t => t.isDone)) {
    document.querySelector("#finish").innerHTML = "";
  }
}

function markAsDone(id) {
  let task = tasks.find(t => t.taskId === id);
  if (!task) return;

  task.isDone = !task.isDone;
  updateLocalStorage();

  let temp = document.getElementById(`task-${id}`);
  temp.remove();
  if (!tasks.find(t => t.isDone)) {
    document.querySelector("#finish").innerHTML = "";
  }
  showTask(task);
}

function showTask(task) {
  let tasksDiv = task.isDone ? document.querySelector("#finishTasks") : document.querySelector(".tasks");

  let taskDiv = document.createElement("div");
  taskDiv.setAttribute("class", "task");
  taskDiv.setAttribute("id", `task-${task.taskId}`);

  let taskName = document.createElement("p");
  taskName.innerHTML = task.taskName;

  let buttonDiv = document.createElement("div");

  let doneButton = document.createElement("button");
  doneButton.setAttribute("class", "done");
  doneButton.innerHTML = task.isDone ? "Undo" : "Done";
  doneButton.setAttribute("onclick", `markAsDone(${task.taskId})`);
  buttonDiv.appendChild(doneButton);

  if (!task.isDone) {
    const editButton = document.createElement("button");
    editButton.setAttribute("class", "edit");
    editButton.innerHTML = "Edit";
    editButton.setAttribute("onclick", `editTask(${task.taskId})`);
    buttonDiv.appendChild(editButton);
  }

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = "Delete";
  deleteButton.setAttribute("onclick", `deleteTask(${task.taskId})`);
  buttonDiv.appendChild(deleteButton);

  taskDiv.append(taskName, buttonDiv);
  tasksDiv.appendChild(taskDiv);

  if (task.isDone) document.querySelector("#finish").innerHTML = "Finished";
}


function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}










//   get elements from events 

// let tastContainor = document.querySelector(".tasks");


// document.addEventListener("DOMContentLoaded", () => {
//   let tasksContainer = document.querySelector(".tasks");

//   tasksContainer.addEventListener("click", function (event) {
//     console.log(event.target);
//     console.log(event.target.tagName)
//     console.log(event.target.textContent)
//     console.log(event.target.closest(".task"))
//     console.log(event.target.closest(".task").querySelector('p').innerHTML)
//   });
// });









