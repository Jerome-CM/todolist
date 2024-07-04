let taskUpdated = localStorage.getItem('taskUpdated');

if (taskUpdated) {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let nav = document.querySelector('.navbar');

    nav.style.marginTop = '56px';

    welcomeMessage.classList.add('alert', 'alert-success');

    welcomeMessage.innerHTML = taskUpdated;
    localStorage.removeItem('taskUpdated');
}

const requestForAPI = "http://localhost:3000/todos/";
const id = getIdInUrl(window.location.href);

 async function getTask() {

     /*** Get a task ***/

     let app = document.getElementById('app');
     const reponse = await fetch(requestForAPI + id);
     const rep = await reponse.json().then((element) => {

         if (reponse) {
             /* Inner title of task */
             let h1 = document.getElementsByTagName('h1').item(0);
             h1.innerHTML = element.text;

             /* Create card */
             const card = document.createElement('div');
             card.className = 'card';

             // Get date
             const date = document.createElement('div');
             date.className = 'card-header';
             date.textContent = "Created at : " + formatDate(element.created_at); //new Date().toLocaleDateString();
             card.appendChild(date);

             // Create tags div
             const tagsDiv = document.createElement('div');
             tagsDiv.className = 'd-flex flex-wrap p-3 d-flex justify-content-around';

             // Get tags
             const tags = element.Tags;
             tags.forEach(tag => {
                 const tagElement = document.createElement('span');
                 tagElement.className = 'btn rounded bg-dark text-white m-2 p2';
                 tagElement.textContent = tag;
                 tagsDiv.appendChild(tagElement);
             });
             card.appendChild(tagsDiv);

             // Create buttons div
             const buttonsDiv = document.createElement('div');
             buttonsDiv.classList.add('card-body', 'd-flex', 'justify-content-around');

             // Add buttons
             // Status
             const buttonStatus = document.createElement('a');
             buttonStatus.className = element.is_complete ? 'btn btn-primary mr-2' : 'btn btn-primary mr-2 btn-warning';
             buttonStatus.textContent = element.is_complete ? "Re-open" : "Close this task";
             buttonStatus.href = "?id=" + element.id;
             buttonsDiv.appendChild(buttonStatus);

             buttonStatus.addEventListener('click', function(event) {
                 event.preventDefault(); // Empêche l'action par défaut du lien
                 updateTask(); // Appelle la fonction pour effectuer la requête PUT
             });

             // Delete
             const buttonDelete = document.createElement('a');
             buttonDelete.className = 'btn btn-primary mr-2 btn-danger';
             buttonDelete.textContent = "Delete";
             buttonDelete.href = "?id=" + element.id;
             buttonsDiv.appendChild(buttonDelete);

             buttonDelete.addEventListener('click', function(event) {
                 event.preventDefault(); // Empêche l'action par défaut du lien
                 deleteTask(); // Appelle la fonction pour effectuer la requête PUT
             });

             /* Inject buttons div in card */
             card.appendChild(buttonsDiv);

             /* Inject card in app */
             app.appendChild(card);
         }
     });
 }

 async function updateTask(){

     /*** Get a task ***/
     const reponse = await fetch(requestForAPI + id);
     const rep = await reponse.json().then((element) => {

     if (reponse) {

     console.log(reponse);
         let updatedData;

        if(element.is_complete){
            updatedData = { is_complete: false };
        } else {
            updatedData = { is_complete: true };
        }


         fetch(requestForAPI + id, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(updatedData)
         })
             .then(response => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok ' + response.statusText);
                 }
                 return response.json();
             })
             .then(data => {
                 localStorage.setItem('taskUpdated', 'Task updated on back-end');
                 window.location.href = "../todos-front/item.html?id=" + id;
             })
             .catch(error => {
                 console.error('There was a problem with the fetch operation:', error);
             });
     }
 })}

async function deleteTask(){

    /*** Get a task ***/
    const reponse = await fetch(requestForAPI + id);
    const rep = await reponse.json().then((element) => {

        if (reponse) {

            fetch(requestForAPI + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    } else {
                        localStorage.setItem('taskDeleted', 'Task delete on back-end');
                        window.location.href = "../todos-front/tasks.html";
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    })}

function formatDate(dateString) {
    // Parse date
    const date = new Date(dateString);

    // Get different parts of date
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month (0-11) but add 1
    const day = date.getDate().toString().padStart(2, '0'); // Day of month
    const year = date.getFullYear(); // Year
    const hours = date.getHours().toString().padStart(2, '0'); // Hours
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutes
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Seconds

    // Return date formated
    return month + "/" + day + "/" + year + " at " + hours + ":" + minutes + ":" + seconds;
}
function getIdInUrl(url){
    const urlFind = new URL(url);
    const params = new URLSearchParams(urlFind.search);
    return params.get('id');
}

getTask();