// buttonEl selects all HTML elements with the "task-form" id
var formEl = document.querySelector("#task-form");
// tasksToDoEl selects all HTML elements with the "tasks-to-do" id
var tasksToDoEl = document.querySelector("#tasks-to-do");

// The taskFormHandler function creates a new list item.
var taskFormHandler = function(event) {
    // Prevents the browser from refreshing when the form is submitted.
    event.preventDefault();
    // taskNameInput gets the VALUE located at the <input> tag with a class of `task-name`.
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // taskTypeInput gets the VALUE located at the <select> tag with a class of `task-type`.
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Sets up an object with the user's inputs as the `name` and `type`.
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
    };

    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // listItemEl creates a <li> element and it's class is set to `task-item`.
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    // taskInfoEl creates a <div> element and it's class is set to `task-info`
    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    // taskInfoEl's HTML includes an <h3> header with the user's taskNameInput, as well as the user's taskTypeInput.
    taskInfoEl.innerHTML = '<h3 class="task-name">' + taskDataObj.name + '</h3><span class="task-type">' + taskDataObj.type + '</span>';

    // Inserts the taskInfoEl into the listItemEl.
    listItemEl.appendChild(taskInfoEl);
    // Inserts the listItemEl into the tasksToDoEl.
    tasksToDoEl.appendChild(listItemEl);
}

// When formEl elements are clicked, perform the taskFormHandler function.
formEl.addEventListener("submit", taskFormHandler);