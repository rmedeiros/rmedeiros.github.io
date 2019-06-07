
function getGifs(){

    if($("form")[0].checkValidity()) {
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?api_key=9mbJqLmMEqFCLCaFmXNfMF51lk4aWoNe&q="+$("#description").val()+"&limit=5&offset=0&rating=G&lang=en",
            success: function(data){
                $("#gifs-list").html("");
                var searchs = JSON.parse(window.localStorage.getItem("searchs"));
                if(searchs.length>=5){
                    searchs.pop();
                }
                searchs.unshift($("#description").val());
                if($("#search-list li").length>=5){
                    $("#search-list li").last().remove()
                }
                $("#search-list").prepend("<li><p>"+$("#description").val()+"</p></li>")

                window.localStorage.setItem("searchs",JSON.stringify(searchs));
                data.data.forEach(function(elem){
                    $("#gifs-list").append("<li><iframe src="+elem.embed_url+"/></li>")
                })
            },
            dataType: "json"
        });    

    }else {
        console.log("invalid form");
    }


}





$( document ).ready(function() {
    var searchs = window.localStorage.getItem("searchs");
    if(searchs==undefined || searchs==null || searchs==''){
        window.localStorage.setItem("searchs",JSON.stringify([]));
    }else{
        searchs = JSON.parse(window.localStorage.getItem("searchs"));
        searchs.forEach(function(elem){
            $("#search-list").append("<li><p>"+elem+"</p></li>")
        })
    }
    
    
 var camera = document.getElementById('upload');
 var reader = new FileReader ();
 reader.addEventListener ('load', function () {
            $("#gifs-list").append("<li><img class='uploaded-photo' alt='uploadedPhoto' src="+reader.result+"></img></li>")
    }, false);
  camera.addEventListener('change', function(e) {
    var file = e.target.files[0];
    // Do something with the image file.
    var url = reader.readAsDataURL(file);

  });
});


