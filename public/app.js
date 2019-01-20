// Shows all articles from elite daily
$.getJSON("/showall", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articledump").append("<div id='wrapper'>" + "<button class='btn btn-danger savebtn' data-id='" + data[i]._id + "'>" + "Save Article" + "</button>"
            + "<br>" + "<br>" + data[i].title + "<br>" + "<br>" + data[i].subtitle + "<br>" + "<br>"
            + "<a href='" + "https://www.elitedaily.com" + data[i].link + "'" + 'target="blank"' + "'>"
            + "Read More" + "</a>" + "<br>" + "<hr>" + "</p>" + "</div>" + "<br>");
    }
});

// Clear Button that cleans out articles
$(document).on("click", "#clear", function () {

    $("#articledump").empty();
    $("#articledump").append("<br>" + "Looks like we don't have any new articles.");
});

// On click, scrape new articles from Elite Daily
$(document).on("click", "#show", function () {

    $("#articledump").empty();
    $("#descdump").empty();

    $.ajax({
        method: "GET",
        url: "/showall"
    })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#articledump").append("<div id='wrapper'>" + "<button class='btn btn-danger savebtn'>" + "Save Article" + "</button>"
                    + "<br>" + "<br>" + data[i].title + "<br>" + "<br>" + data[i].subtitle + "<br>" + "<br>"
                    + "<a href='" + "https://www.elitedaily.com" + data[i].link + "'" + 'target="blank"' + "'>" + "Read More" + "</a>"
                    + "<br>" + "</div>");
            }
        })
});

// Saves an article to the savedArticle DB
$(document).on("click", ".savebtn", function () {    
    
    var thisId = $(this).attr("data-id");

    alert("You just saved an article");

    $.ajax({
        method: "GET",
        url: "/showall/" + thisId
    }).then(function (data) {
        console.log(data);
    })
});

// Function to delete all articles saved in database
$(document).on("click", "#clearBtn", function () {
    
    $("#savedcontentbox").empty();
    $("#savedcontentbox").append("You haven't saved anything yet!");

    $.ajax({
        type: "DELETE",
        url: "/deleteall"
    }).then(function(){
        location.reload()
    })
});

function showsavedArticles() {

    $.getJSON("/showsaved", function (data) {

        console.log(data);

        for (var i = 0; i < data.length; i++) {

            // Loops thru all saved articles and append it to the content box
            $("#savedcontentbox").append("<div id='wrapper'>" + "<br>" + "<br>" + data[i].title + "<br>" + "<br>" + data[i].subtitle
                + "<br>" + "<a href='" + "https://www.elitedaily.com" + data[i].link + "'" + 'target="blank"' + "'>"
                + "Read More" + "</a>" + "<br>" + "<br>"
                + "<button class='btn btn-danger deletebtn' data-id='" + data[i]._id + "'>" + "Delete" + "</button>"
                + " " + "<button class='btn btn-danger shownotes' data-id='" + data[i]._id + "'>"  + "Article Notes" + "</button>" + "<hr>" + "</div>");

            // Delete saved article from database 
            $(document).on("click", ".deletebtn", function () {

                var deleteID = $(this).attr("data-id");
                $.ajax({
                    url: "/deleteart/" + deleteID,
                    type: "DELETE"
                }).then(function () {
                    location.reload();
                });
            });
        };
    });
};

$(document).on("click", ".shownotes" , function(){    
    event.preventDefault;
    
    console.log("test");

    $("#notemodal").modal("toggle");
});


$(document).ready(function () {
    showsavedArticles();
});