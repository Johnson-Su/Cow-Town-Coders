import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
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

        function writeData1(){
            firebase.database().ref("Farmer").set({
                email: document.getElementById("email").value,
                farm: document.getElementById("farm").value,
                password: document.getElementById("password").value,
                confirm: document.getElementById("confirm").value
            });

            var firebaseRef = firebase.database().ref();
                firebaseRef.child("Farmer").push({
                    email: document.getElementById("email").value,
                    farm: document.getElementById("farm").value,
                    password: document.getElementById("password").value,
                    confirm: document.getElementById("confirm").value
                }).then(function() {
                    document.location.href = "new-farmer2.html";
                });
        }


        function writeData2(){
              firebase.database().ref("Sell").set({
                  Product: document.getElementById("product").value,
                  Units: document.getElementById("units").value,
                  Quantity: document.getElementById("quantity").value,
                  Price: document.getElementById("price").value
              });

        // var firebaseRef = firebase.database().ref();
        //     firebaseRef.child("Sell").push({
        //         Product: document.getElementById("product").value,
        //         Units: document.getElementById("units").value,
        //         Quantity: document.getElementById("quantity").value,
        //         Price: document.getElementById("price").value
        //     }).then(function() {
        //         document.location.href = "__PLACEHOLDER___";
        //     });

        }
