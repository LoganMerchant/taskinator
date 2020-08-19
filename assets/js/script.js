// pageContentEl is selecting the `page-selector` id in the HTML doc.
var pageContentEl = document.querySelector('#page-content');

// Declares the ID counter to begin at zero.
var taskIdCounter = 0;

// buttonEl selects all HTML elements with the "task-form" id
var formEl = document.querySelector("#task-form");

// tasksToDoEl selects all HTML elements with the "tasks-to-do" id
var tasksToDoEl = document.querySelector("#tasks-to-do");

// tasksInProgressEl selects all HTML elements with the "tasks-in-progress" id
var tasksInProgressEl = document.querySelector('#tasks-in-progress');

// tasksCompletedEl selects all the HTML elements with the "tasks-completed" id
var tasksCompletedEl = document.querySelector('#tasks-completed');


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

    formEl.reset();

    // isEdit will check to see if the formEl has a data task id.
    var isEdit = formEl.hasAttribute('data-task-id');

    // If isEdit returns `true` then the the edit function will occur.
    if (isEdit) {
        var taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);

    // Else if isEdit returns `false`, a new task will be created with the input values.
    } else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
        };  
        createTaskEl(taskDataObj);
    };
};


// The createTaskEl function creates list items and places them in the "Tasks to Do" column. 
var createTaskEl = function(taskDataObj) {
    // listItemEl creates a <li> element and it's class is set to `task-item`.
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    // Sets up the list item with a `task-id` attribute with a value of whatever the taskIdCounter's value is.
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // Sets up the list item with an attribute of `draggable="true"`.
    listItemEl.setAttribute('draggable', 'true');

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
};


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


var taskButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches('.edit-btn')) {
        var taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    }
    else if (targetEl.matches('.delete-btn')) {
        var taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
    };
};


var taskStatusChangeHandler = function(event) {
    // taskId is has the data task id of whatever the target of the event is.
    var taskId = event.target.getAttribute('data-task-id');

    // statusValue of the event target is all lowercase in the event status text is displayed differently later.
    var statusValue = event.target.value.toLowerCase();

    // taskSelected is the list item that matches the current taskId.
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]');

    // Whatever the value of the dropdown for the taskSelected is when it is changed, it will be moved to that column. 
    if (statusValue === 'to do') {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === 'in progress') {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === 'completed') {
        tasksCompletedEl.appendChild(taskSelected);
    };
}


var editTask = function(taskId) {
    // Gets task list item element.
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Gets content from task name
    var taskName = taskSelected.querySelector('h3.task-name').textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    // Gets content task type
    var taskType = taskSelected.querySelector('span.task-type').textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute('data-task-id', taskId);
};


// The completeEditTask function 
var completeEditTask = function(taskName, taskType, taskId) {
    // taskSelected finds the matching list item that was passed through the function via taskId.
    taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]');

    // Sets the new task name and task type for the list item.
    taskSelected.querySelector('h3.task-name').textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;

    alert('Task Updated!');

    // Removes the data task id attribute from the form and changes it back to normal.
    formEl.removeAttribute('data-task-id');
    document.querySelector('#save-task').textContent = "Add Task";
};


var deleteTask = function(taskId) {
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]');
    taskSelected.remove();
};


var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute('data-task-id');
    event.dataTransfer.setData('text/plain', taskId);
    var getId = event.dataTransfer.getData('text/plain');
    console.log('getId:', getId, typeof getId);
}
// When formEl elements are submitted, perform the taskFormHandler function.
formEl.addEventListener("submit", taskFormHandler);

// When pageContentEl elements are clicked, perform the taskButtonHandler function.
pageContentEl.addEventListener('click', taskButtonHandler);

// When pageContentEl elements are changed, perform the taskStatusChangeHandler function.
pageContentEl.addEventListener('change', taskStatusChangeHandler);

// When pageContentEl elements start to be dragged, perform the dragTaskHandler function.
pageContentEl.addEventListener('dragstart', dragTaskHandler);