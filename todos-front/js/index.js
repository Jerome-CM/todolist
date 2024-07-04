function validateForm(event){
    event.preventDefault();

    let x = document.forms["form"]["firstname"].value;
    console.log(x);
    if (x == "") {
        let divError = document.getElementById("errorMessage");
        divError.classList.add('alert', 'alert-danger');
        divError.innerHTML = "Please, entre your firstname";

        return false;
    } else {
        localStorage.setItem("firstname", x);
        console.log("inStorage : " + localStorage.getItem("firstname"));
        window.location.href = "../todos-front/tasks.html";
    }
}