// Get elements
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

// Load tasks from localStorage or create empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Show all tasks on the page
function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        let li = document.createElement("li");

        // Add completed class if needed
        if (task.done) {
            li.classList.add("completed");
        }

        // Task text
        let span = document.createElement("span");
        span.textContent = task.text;

        // Button container div
        let buttonContainer = document.createElement("div");
        buttonContainer.className = "task-buttons";

        // Complete button
        let completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.onclick = function() {
            tasks[index].done = !tasks[index].done;
            saveAndShow();
        };

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            tasks.splice(index, 1);
            saveAndShow();
        };

        // Add buttons to container
        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);

        // Add everything to the list item
        li.appendChild(span);
        li.appendChild(buttonContainer);

        taskList.appendChild(li);
    });
}

// Save tasks to localStorage and show them
function saveAndShow() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

// Add a new task
function addTask() {
    let text = taskInput.value.trim();
    if (text === "") {
        alert("Please type a task.");
        return;
    }

    tasks.push({ text: text, done: false });
    taskInput.value = "";
    saveAndShow();
}

// When user clicks the Add button
addButton.onclick = addTask;

// Or presses Enter in the input
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Show tasks when the page loads
showTasks();
