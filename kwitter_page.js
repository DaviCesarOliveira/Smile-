var firebaseConfig = {
    apiKey: "AIzaSyBaqbQg0K0NXDLG8XJu2n5iy80VKHoHdu0", authDomain: "bancodedados-eca8c.firebaseapp.com", databaseURL:
    "https://bancodedados-eca8c-default-rtdb.firebaseio.com",
    projectId: "bancodedados-eca8c", storageBucket: "bancodedados-eca8c.appspot.com", messagingSenderId: "878156217881", appId: "1:878156217881:web:91398d83d8f5d52ffef488", measurementId: "G-98ZZ3WHYC0"
  };


firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("userName");
room_name = localStorage.getItem("room_name");


function send()
{
    msg= document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });

    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot)
{
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot)
    { childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if(childKey != "purpose") {
            firebase_message_id = childKey;
            message_data = childData;
            console.log(firebase_message_id);
            console.log(message_data);
            name = message_data['name'];
            message = message_data['message'];
            like = message_data['like'];
            name_with_tag = "<h4> "+ name +"<img class='user_tick' src='sorriso png.jpeg'></h4>";
            message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
            like_button ="<button class='btn bt' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
            span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
            row = name_with_tag + message_with_tag +like_button + span_with_tag;
            document.getElementById("output").innerHTML += row;
        }
    })
})}
getData();

function updateLike(message_id)
{
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes
    });
}

function sair() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location="index.html";
}