function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    var dueDate = document.getElementById("dueDate").value;
    
    if (taskInput.trim() !== "") {
        var taskUl = document.getElementById("tasksUl");
        var li = document.createElement("li");
        li.classList.add("task-item");  
        li.innerHTML = `
            <div class="task">
                <input type="checkbox" onchange="toggleTask(this)">
                <span>${taskInput}</span>
                <span class="due-date">${dueDate ? 'Due: ' + dueDate : ''}</span>
                <div class="action-container">
                    <button onclick="editTask(this)">Edit</button>
                    <button onclick="deleteTask(this)">Delete</button>
                </div>
            </div>
        `;
        taskUl.appendChild(li);

        document.getElementById("taskInput").value = "";
        document.getElementById("dueDate").value = "";
    }
}

function toggleTask(checkbox) {
    var task = checkbox.parentElement.parentElement;
    var completedUl = document.getElementById("completedUl");

    if (checkbox.checked) {
        task.classList.add("completed-task");
        task.querySelector('.action-container').innerHTML = `
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="restoreTask(this)">Restore</button>
        `;
        completedUl.appendChild(task);
    } else {
        task.classList.remove("completed-task");
        task.querySelector('.action-container').innerHTML = `
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        document.getElementById("tasksUl").appendChild(task);
    }
}

function clearAll() {
    var tasksUl = document.getElementById("tasksUl");
    var completedUl = document.getElementById("completedUl");

    tasksUl.innerHTML = "";
    completedUl.innerHTML = "";
}

function editTask(button) {
    var task = button.parentElement.parentElement;
    var span = task.querySelector("span");
    var dueDateSpan = task.querySelector(".due-date");
    var newText = prompt("Edit task:", span.textContent.trim());
    var newDueDate = prompt("Edit due date:", dueDateSpan.textContent.trim());

    if (newText !== null) {
        span.textContent = newText;
    }

    if (newDueDate !== null) {
        dueDateSpan.textContent = newDueDate ? 'Due: ' + newDueDate : '';
    }
}

function deleteTask(button) {
    var task = button.parentElement.parentElement;
    task.remove();
}

function restoreTask(button) {
    var task = button.parentElement.parentElement;
    var tasksUl = document.getElementById("tasksUl");
    
    task.querySelector('.action-container').innerHTML = `
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    task.classList.remove("completed-task");
    tasksUl.appendChild(task);
}
