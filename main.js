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

var farmName = "";
function writeData1(){
    farmerRef = firebase.database().ref();
    newFarmerRef = farmerRef.push();
    farmerID = newFarmerRef.key;
    farmName = document.getElementById("farm").value;
    firebase.database().ref("Farmer/" + document.getElementById("farm").value).set({
        email: document.getElementById("email").value,
        farm: document.getElementById("farm").value,
        password: document.getElementById("password").value,
        confirm: document.getElementById("confirm").value
    });

    farmerRef.child("Farmer/" + farmName).push({
        email: document.getElementById("email").value,
        farm: document.getElementById("farm").value,
        password: document.getElementById("password").value,
        confirm: document.getElementById("confirm").value
    }).then(function() {
        document.location.href = "new-farmer2.html";
    });
}

function writeData2(){
    farmerRef = firebase.database().ref();
    newFarmerRef = farmerRef.push();
    farmerID = newFarmerRef.key;
    firebase.database().ref("Farmer/" + farmName).update({
        Product: document.getElementById("product").value,
        Units: document.getElementById("units").value,
        Quantity: document.getElementById("quantity").value,
        Price: document.getElementById("price").value
    });

    farmerRef.child("Farmer/" + farmName).push({
        Product: document.getElementById("product").value,
        Units: document.getElementById("units").value,
        Quantity: document.getElementById("quantity").value,
        Price: document.getElementById("price").value
    }).then(function() {
        // document.location.href = "__PLACEHOLDER___";
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

function initMap(){
    firebase.database().ref('User/Longitude').on('value', function(snapshot) {
        longitude = snapshot.val();

        firebase.database().ref('User/Latitude').on('value', function(snapshot) {
            latitude = snapshot.val();

            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: latitude, lng: longitude},
                zoom: 12
            });

            function addMarker(coords){
                var marker = new google.maps.Marker({position: coords, map: map});

                var infoWindow = new google.maps.InfoWindow({
                    content: "Test"
                });
            }

            addMarker({lat: latitude, lng: longitude});

        });
    });
}
