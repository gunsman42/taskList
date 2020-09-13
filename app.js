const form = document.querySelector("#task-form");
const taskList = document.querySelector("ul.collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const inputTask = document.querySelector("#task");

// Load All Event Listners
loadEventListners();

//Function Load All Event Listners
function loadEventListners() {
  //Add Task Event
  form.addEventListener("submit", addTask);

  // Remove task Event
  taskList.addEventListener("click", removeTask);

  // Clear tasks Event
  clearBtn.addEventListener("click", clearTask);

  //Filter Tasks
  filter.addEventListener("keyup", filterTask);
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
  //Clear the Input value
  inputTask.value = "";
  e.preventDefault();
}

//Remove Task Function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
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
