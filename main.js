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

            function addMarker(coords, content){
                var marker = new google.maps.Marker({position: coords, map: map});
            
                var infowindow = new google.maps.InfoWindow({
                    content: content
                });

                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                  });
            }
            addMarker({lat: latitude, lng: longitude}, "<h1>You!</h1>");
            addMarker({lat: 51.162477, lng: -114.254331}, "<h1><a href=''>Smith Family Farm</a></h1><h2>254 Range Rd 25</h2><h3>(403) 234-1987</h3><p>- Potatoes $0.45/kg<br>- Corn $0.50/ea<br>- Cabbage $1.98/ea</p>");
            addMarker({lat: 51.166832, lng: -114.232411}, "<h1><a href=\"profile.html\">Juneberry Farm</a></h1><h2>Calgary, AB T3R 1J3</h2><h3>(403) 123-4567</h3><p>- Juneberries $24.24/kg</p>");
            addMarker({lat: 51.160651, lng: -114.218519}, "<h1><a href=''>Steward Farms</a></h1><h2>30034 Township Rd 254B</h2><h3>(403) 519-9941</h3><p>- Beets $3.24/kg<br>- Carrots $2.80/kg<br>- Potatoes $0.49/kg</p>");
            addMarker({lat: 51.165166, lng: -114.264684}, "<h1><a href=''>Cattle Ranch</a></h1><h2>Rocky View County, T3R 1A4</h2><h3>(403) 123-4567</h3><p>- Flour $0.80/kg<br>- Canola Oil $1.80/L</p>");
            addMarker({lat: 51.139324, lng: -114.265629}, "<h1><a href=''>Blue Sprout Nursery</a></h1><h2>83-75 Blueridge Rise</h2><h3>(403) 234-1987</h3><p>- Bean sprouts $5.00/kg<br>- Cucumber $1.78/ea<br>- Snap peas $9.97/kg</p>");
            addMarker({lat: 51.182200, lng: -114.257417}, "<h1><a href=''>Silverwood Farm</a></h1><h2>32-60 Silverwoods Dr</h2><h3>(403) 932-5112</h3><p>- Beets $3.24/kg<br>- Broccoli $2.97/ea<br>- Lettuce $2.18/ea</p>");

        });
    });  
}
