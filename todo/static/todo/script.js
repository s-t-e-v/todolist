async function add_request() {
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
}

// retrieve the cookie to give it to Django server (because of CSRFToken activated)
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
  