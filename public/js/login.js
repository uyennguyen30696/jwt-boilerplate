$(document).ready(() => {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // Starter code
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    // function loginUser(email, password) {
    //     $.post("/api/login", {
    //         email: email,
    //         password: password
    //     })
    //         .then(() => {
    //             window.location.replace("/members");
    //             // If there's an error, log the error
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }


    // This function is modified from the starter code provided
    // The token is sent from the server side to client side
    function loginUser(email, password) {
        $.post("/api/login", {
            "email": email,
            "password": password
        },
            function (data, status, jqXHR) {
                console.log('status: ' + status + " : data: " + JSON.stringify(data));
                insertTokenIntoLocalStorage(data.token);
            },
            'json'
        )
            .then(() => {
                window.location.replace("/members");
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    }

    // The token is stored in local storage on client side
    function insertTokenIntoLocalStorage(token) {
        console.log('inside of new method token: ' + token)
        localStorage.setItem("myToken", token);
    };
});
