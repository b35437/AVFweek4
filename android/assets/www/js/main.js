/*
Name: Nathan Byarley
Class: AVF
Term: 1311
Project Week 2
*/

//EventListener
document.addEventListener("deviceready", onDeviceReady, false);

//device ready function
function onDeviceReady() {
    //navigator.geolocation.getCurrentPosition(onSuccess, onError);

    $("#btn-geo").on("click", geoFn);
    $("#btn-notification").on("click", notificationFn);
    $("#btn-accelerometer").on("click", accelerometerFn);
    $("#btn-conn").on("click", connFn);
    $("#btn-weather").on("click", weatherFn);
    $("#btn-instagram").on("vclick", instagramFn);
    $("#btn-compass").on("tap", compFn);
    $("#btn-browser").on("click", browserFn);
    $("#btn-contacts").on("click", contactsFn);
}//End onDevice Function


//basic layout for button functions
// ------- Android & iOS natives ------
var geoFn = function() {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail, {enableHighAccuracy: true});  
};

//Browser function
var browserFn = function(e){

    showAlert();
};

var notificationFn = function() {
};

//compass function
var compFn = function(){
    navigator.compass.getCurrentHeading(onSuccess, onError);
};

var connFn = function() {
    //network variable
    var networkCon = navigator.connection.type;

        //array of information based on connection
        var states = {};
        //temp variable setup, sending variables to html instead of alert.
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        //send information / verification to alert box for testing 
        //purposes
        $('#connType').append(states[networkCon]);

       
};

var accelerometerFn = function() {
    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
};

var onGeoSuccess = function(position){
    alert("Get current location!");
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var map = '<p>' + 'Latitude: ' + lat + '<br/>' + 'Longitude: ' + lon + '</p><br/>' + 
                '<img class="map" src="http://maps.googleapis.com/maps/api/staticmap?center=' 
                + lat + ',' + lon + '&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C' 
                + lat + ',' + lon + '&sensor=true" />';
    $("#geoMap").append(map);//applu information to the geoMap ID
};

//if geo does not function post error
var onGeoFail = function(error){
    if(error == 1){
        alert("Turn on geolocation services");
    }
};


// ---------- Compass
function startWatch() {
    
    //additional option, updates in 3000 ms (3sec)
    var options = { frequency: 3000 };
    
    //variable for compass plugin
    watchID = navigator.compass.watchHeading(onSuccess, onError, options);
};

//stop watch function
function stopWatch() {
    //if anything in watchID then clear compas and set watchID to null
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
    }
};

//success function, put heading into HTML
function onSuccess(heading) {
    var element = $('heading');
    element.innerHTML = 'Heading: ' + heading.magneticHeading;
};

// error function
function onError(compError) {
    //if an error happens alert box will notify user
    alert('Compass error: ' + compError.code);
};


// ------------- Acceleration

    //if success print variables to HTML
    function onSuccess(acceleration) {
        //HTML for acceleration
        $(''+
            '<li>' +
                '<h3>' + name +'</h3>' +
                '<p>' + 'Acceleration X: ' + acceleration.x         + '</p>' +
                '<p>' + 'Acceleration Y: ' + acceleration.y         + '</p>' +
                '<p>' + 'Acceleration Z: ' + acceleration.z         + '</p>' +
                '<p>' + 'Timestamp: '      + acceleration.timestamp + '</p>' +
                '<hr />' +
            '</li>'
        ).appendTo('#accOutput');//attach information to accOutput ID
    }

    //error is acceleration fails.
    function onError() {
        alert('onError!');
    }


// --------- Notification / broswer

    //dismiss alert
    function alertNoti() {
        //$.mobile.changePage($('#homepg'));
        var ref = window.open('http://www.google.com', '_blank', 'location=yes');
        ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
        ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
        ref.addEventListener('exit', function() { alert(event.type); });
    }

    //custom dismiss alert box for notification
    function showAlert() {
        navigator.notification.alert(
            'You will now be taken to Google.com',      // message
            alertNoti,     // callback
            'Browser',       // title
            'Ok'              // buttonName
        );
    }


    // -------- Notification
//dismiss alert
function alertDis() {
    $.mobile.changePage($('#homepg'));
}

//custom dismiss alert box for notification
function alertNotification() {
    navigator.notification.alert(
        'Yes you work, now go home',      // message
        alertDis,     // callback
        'Do i work?',       // title
        'Ok'              // buttonName
    );
}


//Basic layout for button functions
// ------- data API Group --------
    var weatherFn = function() {
        //data
    };

    var instagramFn = function() {
        //data
    };


//weather section link. 
$(function(){
    var url = "https://api.aerisapi.com/observations/orlando,fl?client_id=LiPjIX9OQKBsFauD0Qx5m&client_secret=igZhgFW7alLw2KzDOIyclVOAm5ryJWXyfLOZQJgz";
    $.getJSON(url, resultOutput);
});


// Function puts search results into a list -- use css to customize the list
    var resultOutput = function(data){
        //console.log(data);//call data to console from function

        //variable to shorten the link of accessing the JSON file
        var ob = data.response.ob;
        var wLoc = data.response.place.name;//selects the name within the joson

        //creating a variable for the data and html for easier viewablility on the screen
        var place = "<li> The weather for " + wLoc + " is:</li><br>";//gets the location
        var temp = "<li> The temp is: <h4>" + ob.tempF + " F</h4></li>";//get the temp
        var weather = "<li> The weather condition is: <h4>" + ob.weather + "</h4></li>";//type of weater

        //append the variables to a class within the HTML
        $('#weatherInfo').append(place);
        $('#weatherInfo').append(temp);
        $('#weatherInfo').append(weather);
    };


//get information from instagram based on URL and search.
    $('form #searchbtn').on('click', function(){
        $('#data-output').empty();
        var tag = $('#search').val();
        var url = 'https://api.instagram.com/v1/tags/'+ tag +
                    '/media/recent?callback=?&amp;client_id=dc37a44cb489463bbbd60081eb33069a';
        $.getJSON(url, results);
    });

// Function puts search results into a list -- use css to customize the list
    var results = function(info){
        console.log(info);//call data to console from function
        //This will create the information for every image that populates the field
        $.each(info.data, function(index, photo){
            //variable to get and display pictures in application and link the image to the larger image for a better view.
            var pic = "<li><img src='" + photo.images.low_resolution.url +
                        "'alt='" + photo.user.id + "' /></a></li>";
            $("#data-output").append(pic);
        });
    };

// -------- Research Group --------
//Weekly Progress Section
//Same as the about section JS allows the script to function upon loading of the page
//will hide fields not active and show the tab that is active.
    $('#weekProgress').on('pageinit', function(){
        //Tab function on about page
        $('#weekProgress').delegate('.ui-navbar a', 'click', function () {
            $(this).addClass('ui-btn-active');
            $('.content_div').hide();//hides the field based on the class
            $('#' + $(this).attr('data-href')).show();//shows active field
        });
    });


//About Section
//manipulating the jquery.js files for easier construction
//of the tab control.
    $('#about').on('pageinit', function(){
        //Tab function on about page
        $('#about').delegate('.ui-navbar a', 'click', function () {
            $(this).addClass('ui-btn-active');
            $('.content_div').hide();
            $('#' + $(this).attr('data-href')).show();
        });
    });

