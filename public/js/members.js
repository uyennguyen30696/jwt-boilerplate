$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // $.get("/api/user_data"
    // // {
    // //     Authorization: `Bearer ${sessionStorage.getItem("myToken")}`
    // // }
    // ).then(data => {
    //     $(".member-name").text("Welcome " + data.firstName);
    //     console.log("Success")
    // });


    $.ajax({
        url: "http://localhost:8080/api/user_data",
        type: "GET",
        headers:  {
                Authorization: `Bearer ${sessionStorage.getItem("myToken")}`
            },
        error: function (err) {
            switch (err.status) {
                case "400":
                    // bad request
                    break;
                case "401":
                    // unauthorized
                    break;
                case "403":
                    // forbidden
                    break;
                default:
                    //Something bad happened
                    break;
            }
        }
    }).then(data => {
        $(".member-name").text("Welcome " + data.email);
        console.log("Success");
    });
});
