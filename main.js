if (window.location.hostname === '127.0.0.1') {
    window.location = 'http://localhost:1898';
}

var auth2;

function appstart() {
    console.log('DIe');
}


function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
function route(url) {
   return 'http://192.168.1.9:3000' + url;
}

var profile; // google user profile
var authResponse; // google user auth response

function onSignIn(googleUser) {
   profile = googleUser.getBasicProfile();
   authResponse = googleUser.getAuthResponse();

   var login = {
       'id': profile.getId(),
       'name': profile.getName(),
       'givenName': profile.getGivenName(),
       'familyName': profile.getFamilyName(),
       'imageUrl': profile.getImageUrl(),
       'email': profile.getEmail(),
       'hostedDomain': googleUser.getHostedDomain()
   }

   post('/login', login);

   $('.g-signin2').hide();
   $('#email').html('<p>' + profile.getEmail() + '</p>');
   $('#photo').html('<img src="' + profile.getImageUrl() + '">');
}

function signOut() {
   gapi.auth2.getAuthInstance().signOut();
   $('.g-signin2').show();
   $('#email').html('');
   $('#photo').html('');
}

function disconnect() {
   gapi.auth2.getAuthInstance().disconnect();
   $('.g-signin2').show();
   $('#email').html('');
   $('#photo').html('');
}

/**
* Generic post with Authorization in every header
*/
function post(url, json, success, error) {
   $.ajax({
       url: route(url),
       method: 'POST',
       data: json,
       headers: {
           'Authorization': authResponse.id_token
       },
       success: function() {
           if (success) success();
       },
       error: function() {
           if (error) error();
       }
   });
}
