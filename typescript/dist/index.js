"use strict";
let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
let emptyMessage = document.getElementById("emptyMessage");
let tasksSection = document.getElementById("tasks");
let tasksList = document.getElementById("tasksList");
let tasks = [];
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTodo();
    if (e.keyCode == 15)
        addTodo();
    console.log("Task added!", tasks);
});
function addTodo() {
    if (input.value == "") {
        return;
    }
    else {
        emptyMessage.style.display = "none";
        let data = {
            id: tasks.length,
            name: input.value.toUpperCase().trim(),
        };
        tasks.push(data);
        input.value = "";
        loadTasks(tasks);
    }
}
function loadTasks(tasks) {
    tasksList.innerHTML = " ";
    tasks.forEach((task) => {
        const todoLI = document.createElement("li");
        todoLI.className = "task";
        todoLI.id = task.id;
        todoLI.style.animation = "fadeIn 2s";
        const todoP = document.createElement("p");
        todoP.className = "task-name";
        todoP.innerText = task.name;
        const buttons = document.createElement("div");
        buttons.className = "task__buttons";
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", () => {
            todoP.innerHTML = "";
            let editInput = document.createElement("input");
            editInput.type = "text";
            editInput.className = "edit-input";
            let saveBtn = document.createElement("button");
            saveBtn.innerText = "Save";
            saveBtn.className = "save-btn";
            todoP.appendChild(editInput);
            todoP.appendChild(saveBtn);
            editInput.value = task.name;
            saveBtn.addEventListener("click", (e) => {
                e.preventDefault();
                task.name = editInput.value;
                editInput.remove();
                todoP.innerText = task.name;
            });
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            todoLI.style.animation = "fadeOut 2s";
            tasks = tasks.filter((item) => {
                if (task.id !== item.id) {
                    return item;
                }
            });
            console.log("Task deleted!", tasks);
            setTimeout(() => {
                if (tasks.length == 0) {
                    todoLI.remove();
                    emptyMessage.style.display = "flex";
                }
                else {
                    todoLI.remove();
                    return;
                }
            }, 500);
        });
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);
        todoLI.appendChild(todoP);
        todoLI.appendChild(buttons);
        tasksList.appendChild(todoLI);
    });
}
