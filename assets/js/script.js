// buttonEl selects all HTML elements with the "save-task" id
var buttonEl = document.querySelector("#save-task");
// tasksToDoEl selects all HTML elements with the "tasks-to-do" id
var tasksToDoEl = document.querySelector("#tasks-to-do");

// The createTaskHandler function creates a new list item.
var createTaskHandler = function() {
    // listItemEl creates a listed item when called.
    var listItemEl = document.createElement("li");
    // listItemEl takes on the class name of "task-item" for styling purposes.
    listItemEl.className = "task-item";
    // listItemEl's text will read as "This is a new task."
    listItemEl.textContent = "This is a new task.";
    // tasksToDoEl will be appended with whatever properties listItemEl has.
    tasksToDoEl.appendChild(listItemEl);
};

// When buttonEl elements are clicked, perform the createTaskHandler function.
buttonEl.addEventListener("click", createTaskHandler);