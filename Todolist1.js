let createTaskElement = function(taskInput, dueDate) {
    let li = document.createElement("li");
    li.classList.add("task-item");

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        toggleTask(checkbox);
    });

    let taskNameSpan = document.createElement("span");
    taskNameSpan.textContent = taskInput;

    let dueDateSpan = document.createElement("span");
    dueDateSpan.classList.add("due-date");
    dueDateSpan.textContent = dueDate ? 'Due: ' + dueDate : '';

    let actionContainer = document.createElement("div");
    actionContainer.classList.add("action-container");

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
        editTask(editButton);
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        deleteTask(deleteButton);
    });

    actionContainer.appendChild(editButton);
    actionContainer.appendChild(deleteButton);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskNameSpan);
    taskDiv.appendChild(dueDateSpan);
    taskDiv.appendChild(actionContainer);

    li.appendChild(taskDiv);

    return li;
};

let addTask = function() {
    let taskInput = document.getElementById("taskInput").value.trim();
    let dueDate = document.getElementById("dueDate").value.trim();

    if (taskInput !== "") {
        let taskUl = document.getElementById("tasksUl");
        let taskElement = createTaskElement(taskInput, dueDate);
        taskUl.appendChild(taskElement);

        document.getElementById("taskInput").value = "";
        document.getElementById("dueDate").value = "";
    }
};

let toggleTask = function(checkbox) {
    let task = checkbox.parentElement.parentElement;
    let completedUl = document.getElementById("completedUl");
    let tasksUl = document.getElementById("tasksUl");

    if (checkbox.checked) {
        task.classList.add("completed-task");
        task.querySelector('.action-container').innerHTML = `
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="restoreTask(this)">Restore</button>
        `;
        completedUl.appendChild(task);
        taskCompleted(task);
    } else {
        task.classList.remove("completed-task");
        task.querySelector('.action-container').innerHTML = `
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        tasksUl.appendChild(task);
        taskIncomplete(task);
    }
};

let editTask = function(button) {
    let task = button.parentElement.parentElement;
    let span = task.querySelector("span");
    let dueDateSpan = task.querySelector(".due-date");
    let newText = prompt("Edit task:", span.textContent.trim());
    let newDueDate = prompt("Edit due date:", dueDateSpan.textContent.trim());

    if (newText !== null) {
        span.textContent = newText;
    }

    if (newDueDate !== null) {
        dueDateSpan.textContent = newDueDate ? 'Due: ' + newDueDate : '';
    }
};

let deleteTask = function(button) {
    let task = button.parentElement.parentElement;
    task.remove();
};

let restoreTask = function(button) {
    let task = button.parentElement.parentElement;
    let tasksUl = document.getElementById("tasksUl");

    task.querySelector('.action-container').innerHTML = `
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    task.classList.remove("completed-task");
    tasksUl.appendChild(task);
    taskIncomplete(task);
};

let taskCompleted = function(task) {
    console.log("Task Completed:", task.querySelector("span").textContent);
    
};

let taskIncomplete = function(task) {
    console.log("Task Incomplete:", task.querySelector("span").textContent);
   
};

let bindTaskEvents = function() {
    let taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    taskCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            toggleTask(checkbox);
        });
    });
};

let clearAll = function() {
    document.getElementById("tasksUl").innerHTML = "";
    document.getElementById("completedUl").innerHTML = "";
};
clearbutton.addEventListener('click', clear);
