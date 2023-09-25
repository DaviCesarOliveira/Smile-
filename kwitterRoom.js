var firebaseConfig = {
    apiKey: "AIzaSyBaqbQg0K0NXDLG8XJu2n5iy80VKHoHdu0", authDomain: "bancodedados-eca8c.firebaseapp.com", databaseURL:
    "https://bancodedados-eca8c-default-rtdb.firebaseio.com",
    projectId: "bancodedados-eca8c", storageBucket: "bancodedados-eca8c.appspot.com", messagingSenderId: "878156217881", appId: "1:878156217881:web:91398d83d8f5d52ffef488", measurementId: "G-98ZZ3WHYC0"
  };


firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}
function getData() { firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot){
        childKey = childSnapshot.key;
        Room_names = childKey;
        console.log("Room name - " + Room_names);
        row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div>"
        document.getElementById("output").innerHTML += row;        
    });
});
}
getData();

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function sair() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}