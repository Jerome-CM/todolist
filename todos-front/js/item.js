function displayWelcome(){

    let firstname = localStorage.getItem("firstname");
    console.log(firstname)

    if (firstname) {
        let welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.classList.add('alert', 'alert-success');
        welcomeMessage.innerHTML = "Welcome " + firstname;
    }
}

displayWelcome();