const addTaskButton = document.getElementById("add-task-button");
const inputTaskField = document.getElementById("input-task");
const taskTemplate = document.getElementById("task-template");
const taskList = document.getElementById("task-list");

let tasksArray = [];
let idCounter = 1;

const renderTasks = () => {
  taskList.innerHTML = '';
  const task = taskTemplate.content.querySelector(".task");
  const checkbox = taskTemplate.content.querySelector("input");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks.length > 0) {
    tasks.forEach((item) => {
      task.parentNode.id = item.id;
      task.textContent = item.value;
      if (item.checked === true) {
        task.classList.add('task__resolved');
      } else {
        task.classList.remove('task__resolved');
      }
      checkbox.checked = item.checked;
      taskList.appendChild(taskTemplate.content.firstElementChild.cloneNode(true));
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
})

addTaskButton.addEventListener("click", (event) => {
  if (tasksArray.length === 0) {
    idCounter = JSON.parse(localStorage.getItem("id")) || 1;
    tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  }
  if (inputTaskField.value.length !== 0) {
    tasksArray.push({id: idCounter, checked: false, value: inputTaskField.value});

    idCounter++;
    localStorage.setItem("id", JSON.stringify(idCounter));
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    renderTasks();
    inputTaskField.value = null;
  } else {
    alert("Please! Add text in the field");
  }
})

const resolvedTask = (checked) => {
  if (tasksArray.length === 0) {
    idCounter = JSON.parse(localStorage.getItem("id")) || 1;
    tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  }
  const taskId = event.target.parentNode.id;
  if (checked === true) {
    const taskIndex = tasksArray.findIndex((item) => {
      return Number(item.id) === Number(taskId)
    });
    tasksArray[taskIndex].checked = true;
    localStorage.clear();
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    renderTasks();
  } else {
    const taskIndex = tasksArray.findIndex((item) => {
      return Number(item.id) === Number(taskId)
    });
    tasksArray[taskIndex].checked = false;
    localStorage.clear();
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    renderTasks();
  }
}

const deleteTask = () => {
  if (tasksArray.length === 0) {
    idCounter = JSON.parse(localStorage.getItem("id")) || 1;
    tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  }
  const taskId = event.target.parentNode.id;
  tasksArray = tasksArray.filter((item) => Number(item.id) !== Number(taskId));
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  renderTasks()
}