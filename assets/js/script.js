// buttonEl selects all HTML elements with the "task-form" id
var formEl = document.querySelector("#task-form");
// tasksToDoEl selects all HTML elements with the "tasks-to-do" id
var tasksToDoEl = document.querySelector("#tasks-to-do");

// The createTaskHandler function creates a new list item.
var createTaskHandler = function() {
    // Prevents the browser from refreshing when the form is submitted.
    event.preventDefault();

    // taskNameInput gets the VALUE located at the <input> tag with a class of `task-name`.
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // taskTypeInput gets the VALUE located at the <select> tag with a class of `task-type`.
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // listItemEl creates a <li> element and it's class is set to `task-item`.
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    // taskInfoEl creates a <div> element and it's class is set to `task-info`
    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    // taskInfoEl's HTML includes an <h3> header with the user's taskNameInput, as well as the user's taskTypeInput.
    taskInfoEl.innerHTML = '<h3 class="task-name">' + taskNameInput + '</h3><span class="task-type">' + taskTypeInput + '</span>';

    // Inserts the taskInfoEl into the listItemEl.
    listItemEl.appendChild(taskInfoEl);
    // Inserts the listItemEl into the tasksToDoEl.
    tasksToDoEl.appendChild(listItemEl);
    
    // // listItemEl creates a listed item when called.
    // var listItemEl = document.createElement("li");
    // // listItemEl's class name is `task-item`.
    // listItemEl.className = "task-item";

    // // listItemEl takes on the class name of "task-item" for styling purposes.
    // listItemEl.className = "task-item";
    // // listItemEl's text will read as "This is a new task."
    // listItemEl.textContent = taskNameInput;
    // // tasksToDoEl will be appended with whatever properties listItemEl has.
    // tasksToDoEl.appendChild(listItemEl);
};

// When formEl elements are clicked, perform the createTaskHandler function.
formEl.addEventListener("submit", createTaskHandler);