const app = document.getElementById('app');
/*** Get the tasks ***/
const requestForAPI = "http://localhost:3000/todos/";
function getStats() {

    let numberTask = 0;
    let numberOfCompletedTasks = 0;
    let numberOfUncompletsTasks = 0;
    const listTitle = ['Total Tasks', 'Completed Tasks', 'Uncompleted Tasks'];
    let tasksValues = [];

    fetch(requestForAPI)
        .then((datas) => {
            datas.json().then((element) => {
                let totalTasks = element[0].todolist;

                totalTasks.forEach(task => {

                    if (task.is_complete) {
                        numberOfCompletedTasks++;
                    } else {
                        numberOfUncompletsTasks++;
                    }

                    numberTask++;
                })
                tasksValues = [numberTask, numberOfCompletedTasks, numberOfUncompletsTasks];
                createCards(listTitle, tasksValues);
            })
        })
}
function createCards(listTitle, tasksValues){
    for(let x = 0; x < 3; x++){

        /* Init DOM element */
        let divCard = document.createElement('div');
        let divBody = document.createElement('div');
        let h5 = document.createElement('h5');
        let span = document.createElement('span')

        /* Add className */
        divCard.classList.add('card', 'mt-3', 'col-3', 'col-md-3', 'col-sm-12');
        divBody.classList.add('card-body', 'text-center');
        h5.classList.add('card-title', 'text-center', 'mb-5');
        span.classList.add('text-center','btn', 'rounded', 'bg-dark', 'text-white', 'm-2', 'px-5', 'py-1');

        /* Change style of cards  */
        if(x === 1){

        }

        /* Load values */
        h5.innerHTML = listTitle[x];
        span.innerHTML = tasksValues[x];

        /* Load on div App */
        divBody.appendChild(h5);
        divBody.appendChild(span);
        divCard.appendChild(divBody);
        app.appendChild(divCard);


    }

    app.classList.add('d-flex', 'justify-content-between');
}

getStats();