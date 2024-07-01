/*** SayWelcome ***/
let firstname = localStorage.getItem("firstname");

if (firstname) {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let nav = document.querySelector('.navbar');

    nav.style.marginTop = '56px';

    welcomeMessage.classList.add('alert', 'alert-success');
    welcomeMessage.innerHTML = "Welcome " + firstname;
}
