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
  document.cookie = "farmerRef.toString()"+"="+"farmerID.toString()";
}

function writeData1(){
  var splitcookie = document.cookie.split("=");
  var farmerRef = splitcookie[0];
  var farmerID = splitcookie[1];
  console.log(document.cookie);
  farmerRef = firebase.database().ref();
  newFarmerRef = farmerRef.push();
  farmerID = newFarmerRef.key;
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

    farmerRef.child("Sell").push({
        Product: document.getElementById("product").value,
        Units: document.getElementById("units").value,
        Quantity: document.getElementById("quantity").value,
        Price: document.getElementById("price").value
    }).then(function() {
        document.location.href = "__PLACEHOLDER___";
    });

}
