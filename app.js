let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "rounded-xl text-md font-semibold flex items-center gap-2 bg-zinc-100 py-2 px-3 ";

    const checkbox = document.createElement("div");
    checkbox.className =
      `checkbox w-5 h-5  ${task.completed ? "border-0 bg-[#555]" : "border-2 bg-transparent"} rounded-full cursor-pointer`;
    checkbox.onclick = () => toggleTask(index);

    const taskDiv = document.createElement("div");
    taskDiv.className = "task w-[80%] flex-wrap leading-5";
    taskDiv.textContent = task.text;
    if (task.completed) taskDiv.classList.add("line-through", "opacity-50");

    //edit 
    const editIcon = document.createElement("i");
    editIcon.className = "ri-pencil-fill cursor-pointer";
 
    //delet
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "ri-close-line text-xl cursor-pointer";

    li.appendChild(checkbox);
    li.appendChild(taskDiv);
    li.appendChild(editIcon);
    li.appendChild(deleteIcon);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
    console.log(tasks);
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

let Addbtn = document.getElementById("addTaskButton");
Addbtn.addEventListener("click", function () {
  addTask();
});

renderTasks();
