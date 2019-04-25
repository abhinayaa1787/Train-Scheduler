  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBZdEdCURkXooshuJLeR19VMQhAv0xFLJw",
    authDomain: "train-scheduler-bcc55.firebaseapp.com",
    databaseURL: "https://train-scheduler-bcc55.firebaseio.com",
    projectId: "train-scheduler-bcc55",
    storageBucket: "train-scheduler-bcc55.appspot.com",
    messagingSenderId: "406539077138"
  };
  firebase.initializeApp(config);

var db = firebase.database();

$("#submitButton").on("click",function(event){
    event.preventDefault();

    var trainName=$("#trainName").val().trim();
    var destination=$("#destination").val().trim();

    var firstTrainTime=$("#firstTrainTime").val().trim();
    var frequency=$("#frequency").val().trim();

    var startTime=moment(firstTrainTime, "HH:mm:ss a");
    console.log(startTime);
    // const endTime = moment(startTime, 'HH:mm:ss').add(durationInMinutes, 'minutes').format('HH:mm');

    var nextTime = moment(firstTrainTime,"HH:mm").add(moment.duration(frequency,"minutes"));
    console.log(nextTime);

// var duration = moment.duration(nextTime.diff(startTime));
// var hours = parseInt(duration.asHours());
// var minutes = parseInt(duration.asMinutes())%60;
// alert (hours + ' hour and '+ minutes+' minutes.');



var newTrain={
    name:trainName,
    dest:destination,
    trainTime:firstTrainTime,
    frequency:frequency
}
db.ref().push(newTrain);
$("#trainName").val("");
$("#destination").val("");
$("#firstTrainTime").val("");
$("#frequency").val("");
});


db.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var frequency = childSnapshot.val().frequency;
    var newRow=$("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(dest),
        $("<td>").text(frequency)
    );
    $("#trainTable > tbody").append(newRow);
    });


  
