const form = document.querySelector("#task-form");
const taskList = document.querySelector("ul.collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const inputTask = document.querySelector("#task");

// Load All Event Listners
loadEventListners();

//Function Load All Event Listners
function loadEventListners() {
  //DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add Task Event
  form.addEventListener("submit", addTask);

  // Remove task Event
  taskList.addEventListener("click", removeTask);

  // Clear tasks Event
  clearBtn.addEventListener("click", clearTask);

  //Filter Tasks
  filter.addEventListener("keyup", filterTask);
}

//Get Task from local Storage Function
function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    //Create Li Element
    const li = document.createElement("li");
    //Add Class to Li
    li.className = "collection-item";
    //Create TextNode and Append to li
    li.appendChild(document.createTextNode(task));

    //Create new Link element
    const link = document.createElement("a");
    //Add Class to Link Element
    link.className = "delete-item secondary-content";
    //Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    //Append Li to Ul
    taskList.appendChild(li);
    console.log(li);
  });

  console.log(tasks);
}

//Add Task Event Function

function addTask(e) {
  if (inputTask.value === "") {
    alert("Please Add a Task");
  }

  //Create Li Element
  const li = document.createElement("li");
  //Add Class to Li
  li.className = "collection-item";
  //Create TextNode and Append to li
  li.appendChild(document.createTextNode(inputTask.value));

  //Create new Link element
  const link = document.createElement("a");
  //Add Class to Link Element
  link.className = "delete-item secondary-content";
  //Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to li
  li.appendChild(link);

  //Append Li to Ul
  taskList.appendChild(li);
  console.log(li);

  //Store to Local Storage
  storeTaskInLocalStorage(inputTask.value);

  //Clear the Input value
  inputTask.value = "";
  e.preventDefault();
}

//Remove Task Function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove();

      //Remove From Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove From Local Storage Function
function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

//Clear Task Function
function clearTask(e) {
  if (confirm("Are you sure ?")) {
    taskList.innerHTML = "";
  }

  //Faster
  // while (taskList.firstChild) {
  //   taskList.removeChild(taskList.firstChild);
  // }

  //Clear Task Function Local Storage
  clearTasksFromLocalStorage();
}

//Clear Task Function Local Storage Function
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Clear task Function
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

//Store to Local Storage function
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
