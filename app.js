let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filtered = tasks.filter((t) =>
    currentFilter === "all"
      ? true
      : currentFilter === "active"
      ? !t.completed
      : t.completed
  );
  
  if (filtered.length === 0) {
    list.innerHTML = `<li class="text-center text-gray-500 font-medium w-full py-4">No ${currentFilter} tasks found.</li>`;
    updateCount();
    return;
  }

  filtered.forEach((task) => {
    const index = tasks.indexOf(task);
    list.innerHTML += `<li class="rounded-xl text-md font-semibold flex flex-wrap items-center bg-zinc-100 py-2 px-3 w-full justify-between">
    ${
      task.isEdit
        ? ``
        : `<div class="w-5 h-5 checkbox ${
            task.completed ? "border-0 bg-[#555]" : "border-2 bg-transparent"
          } rounded-full cursor-pointer" onclick="toggleTask(${index})"></div>`
    }
    <div class="task ${
      task.isEdit ? "w-[80%]" : "w-[75%] "
    } flex-wrap leading-5 ${task.completed ? "line-through opacity-50" : ""}">
      ${
        task.isEdit
          ? `<textarea type="text" value="${task.text}" class="border-2 border-gray-600 rounded-md p-2 w-full"  maxlength="50" id="editInput">${task.text}</textarea>`
          : task.text
      }
    </div>
      <div class="flex items-center gap-2 justify-end">
      ${
        task.isEdit
          ? `
        <i class="ri-check-line text-xl cursor-pointer ${
          task.completed && "hidden"
        }" onclick="saveTask(${index})"></i>`
          : `<i class="ri-pencil-fill cursor-pointer ${
              task.completed && "hidden"
            }" onclick="editTask(${index})"></i>`
      }
        <i class="ri-close-line text-xl cursor-pointer" onclick="deleteTask(${index})"></i>
        </div>
    </li>`;
  });
  updateCount();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false, isEdit: false });
    input.value = "";
    saveTasks();
    document.querySelector(".overlay").style.display = "none";
    renderTasks();
  }
}

function saveTask(index) {
  const editInput = document.getElementById("editInput");
  if (editInput.value.trim()) {
    tasks[index].text = editInput.value.trim();
    tasks[index].isEdit = false;
    saveTasks();
    renderTasks();
  } else {
    tasks[index].text = tasks[index].text.trim();
    tasks[index].isEdit = false;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  console.log(tasks[index]);
  tasks[index].isEdit = !tasks[index].isEdit;
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function updateCount() {
  const total = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;
  document.getElementById(
    "taskCount"
  ).textContent = `${total} tasks • ${active} Active • ${completed} Completed`;
}

let Addbtn = document.getElementById("addTaskButton");
Addbtn.addEventListener("click", function () {
  addTask();
});

let allFilter = document.querySelectorAll(".filter-btn");
allFilter.forEach((btn) => {
  btn.style.backgroundColor = "#D4D4D8";
  btn.style.color = "black";
  allFilter[0].classList.add("active");
  allFilter[0].style.backgroundColor = "#000";
  allFilter[0].style.color = "#fff";

  btn.addEventListener("click", function () {
    allFilter.forEach((b) => {
      b.classList.remove("active");
      b.style.backgroundColor = "#D4D4D8";
      b.style.color = "black";
    });

    this.classList.add("active");
    this.style.backgroundColor = "#000";
    this.style.color = "#fff";
    currentFilter = btn.textContent.toLowerCase();
    renderTasks();
  });
});

let deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener("click", function () {
  if (tasks.length > 0) {
    tasks = [];
    saveTasks();
    renderTasks();
  } else {
    alert("No tasks to delete.");
  }
});

renderTasks();
