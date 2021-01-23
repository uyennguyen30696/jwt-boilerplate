// var axios = require("axios");

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
            "password": password,
        },
            function (data, status) {
                console.log('status: ' + status + " : data: " + JSON.stringify(data));
                insertTokenIntoSessionStorage(data.token);
                // sendReq();
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
    };

    // The token is stored in local storage on client side
    function insertTokenIntoSessionStorage(token) {
        console.log("inside of new method token: " + token)
        sessionStorage.setItem("myToken", token);
    };

    // Include token in the header along with user request
    // var sendReq = () => {
    //     var url = "http://localhost:8080/api/user_data";
    //     var myToken = sessionStorage.getItem("myToken");

    //     var header = new Headers();
    //     header.append("Autherization", `Bearer ${myToken}`);

    //     var req = new Request(url, {
    //         method: "GET",
    //         mode: "cors",
    //         headers: header
    //     });
    //     fetch(req)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // };

    // var authAxios = axios.create({
    //     baseURL: "http://localhost:8080/api/user_data",
        // headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("myToken")}`
        // }
    // })

    // $.ajax({
    //     url: "http://localhost:8080/api/user_data",
    //     type: "GET",
    //     headers: { Authorization: $`Bearer ${sessionStorage.getItem("myToken")}` },
    //     data: formData,
    //     error: function (err) {
    //         switch (err.status) {
    //             case "400":
    //                 // bad request
    //                 break;
    //             case "401":
    //                 // unauthorized
    //                 break;
    //             case "403":
    //                 // forbidden
    //                 break;
    //             default:
    //                 //Something bad happened
    //                 break;
    //         }
    //     },
    //     success: function (data) {
    //         console.log("Success!");
    //     }
    // });
});
