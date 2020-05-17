import { watchFile } from "fs";

var firebaseConfig = {
    apiKey: "AIzaSyBSuD2Orc6lR-6eraS9zUDRoWKrdeP6W-g",
    authDomain: "farmily-43dbd.firebaseapp.com",
    databaseURL: "https://farmily-43dbd.firebaseio.com",
    projectId: "farmily-43dbd",
    storageBucket: "farmily-43dbd.appspot.com",
    messagingSenderId: "135754925154",
    appId: "1:135754925154:web:b47b1216d393172150fd3b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//makes cookie of userdata
function userdata() {
  farmerRef = firebase.database().ref();
  newFarmerRef = farmerRef.push();
  farmerID = newFarmerRef.key;
  document.cookie = farmerRef+"="+farmerID;
}

function writeData1(){
  var splitcookie = document.cookie.split("=");
  var farmerRef = splitcookie[0];
  var farmerID = splitcookie[1];
  console.log(document.cookie);
    firebase.database().ref("Farmer/" + farmerID).set({
        email: document.getElementById("email").value,
        farm: document.getElementById("farm").value,
        password: document.getElementById("password").value,
        confirm: document.getElementById("confirm").value
    });

    farmerRef.child("Farmer/" + farmerID).push({
        email: document.getElementById("email").value,
        farm: document.getElementById("farm").value,
        password: document.getElementById("password").value,
        confirm: document.getElementById("confirm").value
    }).then(function() {
        document.location.href = "new-farmer2.html";
    });
}

function writeData2(){
  //makes 2 element array [0] is farmerRef [1] is farmerID
  var splitcookie = document.cookie.split("=");
  var farmerRef = splitcookie[0];
  var farmerID = splitcookie[1];
    console.log(farmerRef)
    // console.log(document.cookie);
    firebase.database().ref("Farmer/" + farmerID + "/NewProduct").set({
        Product: document.getElementById("product").value,
        Units: document.getElementById("units").value,
        Quantity: document.getElementById("quantity").value,
        Price: document.getElementById("price").value
    });

    farmerRef.child("Farmer/" + farmerID + "/NewProduct").push({
        Product: document.getElementById("product").value,
        Units: document.getElementById("units").value,
        Quantity: document.getElementById("quantity").value,
        Price: document.getElementById("price").value
    }).then(function() {
        document.location.href = "__PLACEHOLDER___";
    });

}


// user stuff

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    firebase.database().ref("User").set({
        Distance: document.getElementById("distance").value,
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude,
    });
    firebase.database().ref().child("User").push({
        Distance: document.getElementById("distance").value,
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude,
    }).then(function() {
        document.location.href = "user-main.html";
    });
}


var map;

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34, lng: 150},
        zoom: 12
    });
}

var global = "help"
console.log(global)

firebase.database().ref('User/Latitude').on('value', function(snapshot) {
    getLat(snapshot.val());
    console.log("data: " + snapshot.val())
});

function getLat(input){
    global = input;
    console.log("function: " + global)
}

console.log("should be updated: " + global)


// firebase.database().ref('User/Longitude').on('value', function(snapshot) {
//     getLong(snapshot.val)
// });

// function getLong(long){
//     return long
// }
