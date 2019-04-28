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

$("#submitButton").on("click", function (event) 
{
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = $("#firstTrainTime").val().trim();
  var firstTrainTime = moment(firstTrainTime, ["hh:mm A"]).format("HH:mm");
  var frequency = $("#frequency").val().trim();


  var newTrain = {
    name: trainName,
    dest: destination,
    trainTime: firstTrainTime,
    frequency: frequency

  }

  db.ref().push(newTrain);
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});



db.ref().on("child_added", function (childSnapshot) {

  var name = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var frequency = childSnapshot.val().frequency;
  var firstTrainTime = childSnapshot.val().trainTime;
  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var minutesTillTrain = frequency - tRemainder;
  var train = moment().add(minutesTillTrain, "minutes");
  var train = moment(train).format("hh:mm");

  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(dest),
    $("<td>").text(frequency),
    $("<td>").text(train),
    $("<td>").text(minutesTillTrain),
    // $("<button>").text("Update").attr('trainUpdateId', childSnapshot.key),

    $("<button>").text("Delete").addClass("btn").attr('id', childSnapshot.key)
  );

  $("#trainTable > tbody").append(newRow);
  $(".btn").on('click', function () {
    db.ref().child($(this).attr('id')).remove();
    var row = $(this).closest('tr');
    row.remove();
  });

});


