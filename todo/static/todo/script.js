async function add_request() {
    /* This function request the server to add a new task to the todo model*/

    // We retrieve the value in the entry bar
    let taskname = document.getElementById("taskentry").value;

    // if there is nothing inside the text bar
    if (taskname == "") {
        return 0;// we do nothing
    }

    console.log(taskname);

    // We clear the entry bar
    document.getElementById("taskentry").value = "";

    try {
        console.log('we are inside!');
        // Make a POST request to the Django view to create the task
        const formData = new FormData(); // datastructure needed for the python code in views.py
        formData.append('taskname', taskname);

        // request
        const response = await fetch("add/", {
            method: "POST",
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
        credentials: 'same-origin', // ?
        });

        // response
        const data = await response.json();
        console.log(data);

    }catch(err) {
        console.log('mdr you suck')
        console.error(err);
    }

    // Refresh the todolist
    todolist();
}

// retrieve the cookie to give it to Django server (because of CSRFToken activated)
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


// Update todo list in normal mode
async function todolist() {
    try {
        console.log('oh #$+%! Here we go again')
        // Make a GET request to the server to retrieve the updated list of tasks
        const response = await fetch("todolist/", { method: "GET"});
        
        console.log(response)
        const data = await response.json();

        // Clear the current list of tasks
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

         // Iterate through the updated list of tasks and create new HTML elements for each task
         data.forEach(task => {
            // Checkbox
            const taskCheckbox = document.createElement("input");
            taskCheckbox.type = "checkbox";
            taskCheckbox.id = task.id;
            taskCheckbox.name = task.id;
            taskCheckbox.value = task.id;
            taskCheckbox.checked = task.checkstate;

            // Taskname
            const taskName = document.createElement("input");
            taskName.type = "text";
            taskName.value = task.taskname;

            // br
            const br = document.createElement("br");

            // Task element appending
            taskList.appendChild(taskCheckbox);
            taskList.appendChild(taskName);
            taskList.appendChild(br);
        });


    } catch(err) {
        console.error(err);
        alert("An error occurred while retrieving the to-do list. Please try again later.");
    }

}
  