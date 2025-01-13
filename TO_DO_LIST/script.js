document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔️";
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    saveTasks();
  });

  li.appendChild(completeBtn);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
  taskInput.value = "";

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔️";
    completeBtn.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.addEventListener("click", () => {
      taskList.removeChild(li);
      saveTasks();
    });

    li.appendChild(completeBtn);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });
}
