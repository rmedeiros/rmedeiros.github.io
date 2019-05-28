
function getJobs(){

    if($("form")[0].checkValidity()) {
        $.ajax({
            url: "https://jobs.github.com/positions.json?description="+$("#description").val()+"&fulltime="+$("#fulltime").prop('checked')+"&location="+$("#location").val(),
            success: function(data){
                console.log(data);
            },
            dataType: "jsonp"
        });    

    }else {
        console.log("invalid form");
    }


}