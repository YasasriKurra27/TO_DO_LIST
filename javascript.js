let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

let tasks = (localStorage.getItem("tasks") || "").split(",").filter(Boolean);

function showTasks() {
   taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        let li = document.createElement("li");
        li.textContent = task;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            tasks.splice(index, 1);
            saveAndShow();
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function saveAndShow() {
    localStorage.setItem("tasks", tasks.join(","));
    showTasks();
}

function addTask() {
    let text = taskInput.value.trim();
    if (text === "") {
        alert("Please type a task.");
        return;
    }

    tasks.push(text);
    taskInput.value = "";
    saveAndShow();
}

addButton.onclick = addTask;

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

showTasks();
