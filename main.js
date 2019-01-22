//initialize firebase 
let config = {
    apiKey: "AIzaSyBF6olD4Lwihm2KACy5W9HXwWh-krgde_o",
    authDomain: "train-scheduler-eb28f.firebaseapp.com",
    databaseURL: "https://train-scheduler-eb28f.firebaseio.com",
    projectId: "train-scheduler-eb28f",
    storageBucket: "train-scheduler-eb28f.appspot.com",
    messagingSenderId: "165809562132"
};
firebase.initializeApp(config);

let database = firebase.database();
//click event for scheduling a train 
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    let trainName = $("#train-name-input").val().trim();
    let trainDest = $("#destination").val().trim();
    let firstTime = "3:00";
    let trainFreq =  $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    let newTrain = {
        name: trainName,
        destination: trainDest,
        time: firstTime,
        frequency: trainFreq
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency-input").val("");




database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    // Store everything into a variable.

    let trainName = childSnapshot.val().name;
    let trainDest = childSnapshot.val().destination;
    let firstTime = childSnapshot.val().time;
    let trainFreq = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDest);
    console.log(firstTime);
    console.log(trainFreq);

  
   
    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var time = moment();
    console.log("CURRENT TIME: " + moment(time).format("hh:mm"));

    // Difference between the times
    var difference = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + difference);

    // Time apart (remainder)
    var remainder = difference % trainFreq;
    console.log(remainder);

    // Minute Until Train
    var minutesAway = trainFreq - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Create a new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

});