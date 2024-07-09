/*** SayWelcome ***/
let firstname = localStorage.getItem("firstname");
let newTasksSaved = localStorage.getItem('newTask');
let taskDeleted = localStorage.getItem('taskDeleted');

if (firstname || newTasksSaved || taskDeleted) {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let nav = document.querySelector('.navbar');

    nav.style.marginTop = '56px';

    welcomeMessage.classList.add('alert', 'alert-success');
    if(firstname){
        welcomeMessage.innerHTML = "Welcome " + firstname;
    } else if(newTasksSaved) {
        welcomeMessage.innerHTML = newTasksSaved;
    } else if(taskDeleted){
        welcomeMessage.innerHTML = taskDeleted;
    }

    localStorage.removeItem('firstname');
    localStorage.removeItem('newTask');
    localStorage.removeItem('taskDeleted');
}

/*** Get the tasks ***/
const requestForAPI = "http://localhost:3000/todos/";

function getAllTasks(){

    let app = document.getElementById('app');
    let lastIdTask = 0;

    fetch(requestForAPI)
        .then((datas)=>{
            datas.json().then((element) => {
                let totalTasks = element[0].todolist;

                totalTasks.forEach(task => {

                    if(task.id > lastIdTask){
                        lastIdTask = task.id;
                    }

                    /* Init DOM element */
                    app.classList.add('d-flex', 'flex-wrap', 'justify-content-around');
                    let divCard = document.createElement('div');
                    let divBody = document.createElement('div');
                    let h5 = document.createElement('h5');
                    let a = document.createElement('a');

                    /* Add className */
                    divCard.classList.add('card', 'mt-3', 'col-5','border');
                    divBody.classList.add('card-body');


                    if(task.is_complete){
                        divCard.classList.add('border-light');
                        h5.classList.add('card-title', 'text-muted');
                        a.classList.add('btn', 'bg-light');
                    } else {
                        divCard.classList.add('border-dark','bg-light');
                        h5.classList.add('card-title');
                        a.classList.add('btn', 'btn-primary');
                    }

                    /* Add text and link */
                    h5.innerHTML = task.text;

                    a.href = 'item.html?id=' + task.id;
                    a.innerHTML = 'See more';

                    /* Create DOM elements */

                    divBody.appendChild(h5);
                    divBody.appendChild(a);

                    /* If tache completed, add badge */
                    if(task.is_complete){
                        let span = document.createElement('span');
                        span.className = 'btn rounded bg-light btn-outline-secondary text-black m-2 p2';
                        span.innerHTML = "Task complete"
                        divBody.appendChild(span);
                    }

                    divCard.appendChild(divBody);

                    app.appendChild(divCard);

                })
                localStorage.setItem("lastIdTask", lastIdTask);
            })
        })
}

function postNewTask(event){
    event.preventDefault();

    let taskSubmit = document.forms["form"]["task"].value;

    if (taskSubmit !== "") {
        let lastIdToBackEnd = parseInt(localStorage.getItem("lastIdTask")) + 1;
        let task = {
            id: lastIdToBackEnd,
            text: taskSubmit,
            created_at: new Date(),
            Tags: [],
            is_complete: false
        }
        console.log(task);

        /* POST new task */
        fetch(requestForAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('newTask', 'New task saved on back-end');
                window.location.href = "../todos-front/tasks.html";
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
}

getAllTasks();
