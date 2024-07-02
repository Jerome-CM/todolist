/*** SayWelcome ***/
let firstname = localStorage.getItem("firstname");

if (firstname) {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let nav = document.querySelector('.navbar');

    nav.style.marginTop = '56px';

    welcomeMessage.classList.add('alert', 'alert-success');
    welcomeMessage.innerHTML = "Welcome " + firstname;
}

/*** Get a task ***/

const url = "http://localhost:3000/todos"

let app = document.getElementById('app');

fetch(url)
    .then((datas)=>{
        datas.json().then((element) => {
            let totalTasks = element[0].todolist;

            totalTasks.forEach(task => {
                /* Init DOM element */
                let divCard = document.createElement('div');
                let divBody = document.createElement('div');
                let h5 = document.createElement('h5');
                let a = document.createElement('a');

                /* Add className */
                divCard.classList.add('card', 'mt-3');
                divBody.classList.add('card-body');
                h5.classList.add('card-title');
                a.classList.add('btn', 'btn-primary');

                /* Add text and link */
                h5.innerHTML = task.text;

                a.href = 'item.html?id=' + task.id;
                a.innerHTML = 'Voir le détail';

                /* Create DOM elements */

                divBody.appendChild(h5);
                divBody.appendChild(a);

                divCard.appendChild(divBody);

                app.appendChild(divCard);

            })
        }
)})