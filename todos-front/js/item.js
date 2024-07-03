const requestForAPI = "http://localhost:3000/todos/";
 async function getTask() {

     /*** Get a task ***/
     const currentUrl = window.location.href;
     const url = new URL(currentUrl);
     const params = new URLSearchParams(url.search);
     const id = params.get('id');

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
             const buttonStatus = document.createElement('button');
             buttonStatus.className = 'btn btn-primary mr-2 btn-warning';
             buttonStatus.textContent = element.is_complete ? "Re-open" : "Close this task";
             buttonsDiv.appendChild(buttonStatus);

             // Delete
             const buttonDelete = document.createElement('button');
             buttonDelete.className = 'btn btn-primary mr-2 btn-danger';
             buttonDelete.textContent = "Delete";
             buttonsDiv.appendChild(buttonDelete);

             /* Inject buttons div in card */
             card.appendChild(buttonsDiv);

             /* Inject card in app */
             app.appendChild(card);
         }
     });
 }

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

getTask();