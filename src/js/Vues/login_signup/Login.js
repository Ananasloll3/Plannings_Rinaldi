import { EntryPointController } from "../../Controllers/EntryPointController.js";


let btn_submit = document.getElementById("btn_submit");
let link_signup = document.getElementById("link_signup");
let input_email = document.getElementById("email");
let input_password = document.getElementById("password");

btn_submit.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email && password) {

        let res = await EntryPointController.login({ email, password });
        
        if (!res) {
            alert("Error: Failed to login. Please try again later.");
            return;
        }

        console.log(res);             

        if (res.exists) {
            localStorage.setItem("uuid_user", res.Email);
            window.location.href = "../../../index.html";
        }

    } else {
        input_email.style.borderColor = "red";
        input_password.style.borderColor = "red";
        alert("Please enter both email and password.");
        return;
        
    }

});


link_signup.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page


    window.location.href = '../Signup/Signup.html';
    console.log("Redirection vers la page d'inscription");
    return;
});
