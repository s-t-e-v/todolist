// Declare global variables

//...

// Attach event listeners to elements when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {

    //DOM element GET
    let switchEl = document.getElementById("switch");
    let textEntry = document.getElementById("taskentry");
    let bigButton = document.getElementById("big_button");
    let inputElements = document.querySelectorAll("#task-list input[type=text]");

    // Event listeners
    if (switchEl) {
        switchEl.checked = false;
        switchEl.addEventListener('click', modeswitch);
    }
    if (textEntry) {
        textEntry.addEventListener('keydown', (event) => {
            if (event.key == 'Enter') {
                add_request();
            }
        });
    }
    if (bigButton) {
        bigButton.addEventListener('click', add_request);
    }
    if (inputElements) {
        var enterPressed = false;
        document.querySelectorAll("#task-list input[type=text]").forEach(function(el) {
            var initialValue = el.value;
            el.addEventListener("focusout", function(event) {
                if (!enterPressed) {
                    if(this.value != initialValue) {
                        console.log("We retrieve the task name from the server & refresh the element");
                        initialValue = this.value;
                    }
                    else {
                        console.log("Text didn't change, skip request");
                    }
                }
                enterPressed = false;
            });
            el.addEventListener("keydown", function(event) {
                if (event.code == 'Enter') {
                    if(this.value != initialValue) {
                        enterPressed = true;
                        update_entry(this.id);
                        this.blur();
                        initialValue = this.value;
                    }
                    else{
                        console.log("Text didn't change after Enter pressed, skip request");
                    }
              }
            });
        });
        
    }
});
  
  
// Utility functions

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

function getCookie(name) {
    /* retrieve the cookie to give it to Django server (because of CSRFToken activated) */

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function todolist() {
    /* Update todo list in normal mode */

    try {
        console.log('oh #$+%! Here we go again')
        // Make a GET request to the server to retrieve the updated list of tasks
        const response = await fetch("todolist/", { method: "GET"});
        
        console.log(response)
        const data = await response.json();

        // Clear the current list of tasks
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

        // Get the current display mode
        let mode_deletion = document.getElementById("switch").checked;


         // Iterate through the updated list of tasks and create new HTML elements for each task
         data.forEach(task => {
            // Checkbox
            const taskCheckbox = document.createElement("input");
            taskCheckbox.type = "checkbox";
            taskCheckbox.id = "checkbox_" + task.id;
            taskCheckbox.className = "todocheck";
            taskCheckbox.checked = task.checkstate;

            // Taskname
            const taskName = document.createElement("input");
            taskName.type = "text";
            taskName.id = "task_" + task.id;
            taskName.value = task.taskname;

            // Del buttons
            const del_buttons = document.createElement("a");
            del_buttons.className = "del";

            if (mode_deletion) {
                del_buttons.hidden = false;
            }
            else {
                del_buttons.hidden = true;
            }

            del_buttons.href = "#";
            del_buttons.innerHTML = "-";


            // br
            const br = document.createElement("br");

            // Task element appending
            taskList.appendChild(taskCheckbox);
            taskList.appendChild(taskName);
            taskList.appendChild (document.createTextNode ("  "));
            taskList.appendChild(del_buttons);
            taskList.appendChild(br);
        });


    } catch(err) {
        console.error(err);
        alert("An error occurred while retrieving the to-do list. Please try again later.");
    }

}

function modeswitch() {

    let mode_deletion = document.getElementById('switch').checked;


    if (mode_deletion) {
        console.log("Deletion mode")
        // taskentry
        document.getElementById("taskentry").disabled = true;
        // Big button
        document.getElementById("big_button").value = "-";

        // del buttons
        del_buttons = document.getElementsByClassName("del");

        Array.from(del_buttons).forEach(function(d) {

            d.hidden = false
        });

         // todo checkboxes
         todocheck = document.getElementsByClassName("todocheck");

         Array.from(todocheck).forEach( function(t){
 
             t.hidden = true;
         });

         // Undo button
         document.getElementById("undo").hidden = false;


    }
    else {
        console.log("Normal mode")
        // taskentry
        document.getElementById("taskentry").disabled = false;
        // Big button
        document.getElementById("big_button").value = "+";

        // del buttons
        del_buttons = document.getElementsByClassName("del");

        Array.from(del_buttons).forEach(function(d) {
            
            d.hidden = true
        });

        // todo checkboxes
        todocheck = document.getElementsByClassName("todocheck");

        Array.from(todocheck).forEach( function(t){

            t.hidden = false;
        });

        // Undo button
        document.getElementById("undo").hidden = true;
    }

}

async function update_entry(id) {
    /* This function request the server an update of the databse regarding the frontend change */
    console.log(id);

    // we retrieve the task input element
    let task = document.getElementById(id);

    console.log(task);

    // We make a post request


}