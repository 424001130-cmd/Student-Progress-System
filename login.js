document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".btn");

    if (loginButton) {
        loginButton.addEventListener("click", function (e) {
            e.preventDefault();

            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "index01.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const mainPageCheck = document.getElementById("lessons-container");

    if (mainPageCheck) {
        if (!localStorage.getItem("isLoggedIn")) {
            alert("Please login first!");
            window.location.href = "login.html";
        }
    }
});
