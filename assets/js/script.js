// Declares the ID counter to begin at zero.
var taskIdCounter = 0;
// buttonEl selects all HTML elements with the "task-form" id
var formEl = document.querySelector("#task-form");
// tasksToDoEl selects all HTML elements with the "tasks-to-do" id
var tasksToDoEl = document.querySelector("#tasks-to-do");

// The taskFormHandler function pulls and interacts with data.
var taskFormHandler = function(event) {
    // Prevents the browser from refreshing when the form is submitted.
    event.preventDefault();
    // taskNameInput gets the VALUE located at the <input> tag with a class of `task-name`.
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // taskTypeInput gets the VALUE located at the <select> tag with a class of `task-type`.
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    // 
    formEl.reset();

    // Sets up an object with the user's inputs as the `name` and `type`.
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
    };

    createTaskEl(taskDataObj);
};

// The createTaskEl function creates list items and places them in the "Tasks to Do" column. 
var createTaskEl = function(taskDataObj) {
    // listItemEl creates a <li> element and it's class is set to `task-item`.
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    // Sets up the list item with a `task-id` attribute with a value of whatever the taskIdCounter's value is.
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // taskInfoEl creates a <div> element and it's class is set to `task-info`
    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    // taskInfoEl's HTML includes an <h3> header with the user's taskNameInput, as well as the user's taskTypeInput.
    taskInfoEl.innerHTML = '<h3 class="task-name">' + taskDataObj.name + '</h3><span class="task-type">' + taskDataObj.type + '</span>';

    // taskActionsEl creates task actions for the list item associated with the current taskIdCounter.
    var taskActionsEl = createTaskActions(taskIdCounter);

    // Inserts the taskInfoEl into the listItemEl.
    listItemEl.appendChild(taskInfoEl);
    // Inserts the taskActionsEl into the listItemEl.
    listItemEl.appendChild(taskActionsEl); 
    // Inserts the listItemEl into the tasksToDoEl.
    tasksToDoEl.appendChild(listItemEl);

    // Adds 1 to the ID counter for the next list item.
    taskIdCounter++;
}

// The createTaskActions function creates a form of options for each list item.
var createTaskActions = function(taskId) {
    // actionContainerEl creates a `div` with the `task-actions` class.
    var actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    // editButtonEl creates a button with a text of "Edit", classes of `btn` and `edit-btn`, as well as a `task-id` attribute.
    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute("data-task-id", taskId);

    // editButtonEl is placed into the actionContainerEl div.
    actionContainerEl.appendChild(editButtonEl);

    // delete ButtonEl creates a button with a text of "Delete", classes of `btn` and `delete-btn`, as well as a `task-id` attribute.
    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn delete-btn';
    deleteButtonEl.setAttribute("data-task-id", taskId);
    
    // deleteButtonEl is placed into the actionContainerEl div.
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);

    var statusChoices = ['To Do', 'In Progress', 'Completed'];
    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);
    return actionContainerEl;
};

// When formEl elements are submitted, perform the taskFormHandler function.
formEl.addEventListener("submit", taskFormHandler);