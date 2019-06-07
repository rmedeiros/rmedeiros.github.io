var app = {

    batteryLevel: "100",
    description: $("#description"),
    fieldSet :  $("fieldset"),
    gifsList : $("#gifs-list"),
    batteryLowLevel : 30
};


(function(){
    vex.defaultOptions.className = 'vex-theme-default';


    var lowBatteryFunc =function() { 
        navigator.getBattery().then(battery => {
            if(battery.level*100<app.batteryLowLevel){
                vex.dialog.alert ('Please charge your device to enjoy all the features of the app');
                clearInterval(lowBatteryInterval);
                window.sessionStorage.setItem("batteryInterval", "true");
            }
        });
    };    
    if(!eval(window.sessionStorage.getItem("batteryInterval"))){
        var lowBatteryInterval = setInterval (
            lowBatteryFunc, 1 * 5000);  
    }
    setInterval (function () { 
        navigator.getBattery().then(battery => {
            app.batteryLevel = battery.level*100;

            if(battery.charging==false && app.batteryLevel>app.batteryLowLevel){
                lowBatteryInterval = setInterval (
                    lowBatteryFunc, 1 * 5000);  
                window.sessionStorage.setItem("batteryInterval", "false");

            }
        });        
    }, 1 * 1000);  



})();