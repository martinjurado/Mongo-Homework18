$.getJSON("/showall", function(data){
    for(var i = 0; i < data.length; i++) {
        $("#articledump").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br>"+ data[i].subtitle + "<br>" + "<br>" + "<a href='"+ "https://www.elitedaily.com" + data[i].link + "'" + 'target="blank"' + "'>" + "Read More" + "</>" +"<hr>" +"</p>");
        
        console.log(data);
    }
});

console.log("test");