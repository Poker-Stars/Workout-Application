function signUp(){

    const database = firebase.database();
    const ref = database.ref('users');
    const auth = firebase.auth();
  
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var username = document.getElementById("username");
    var weight = document.getElementById("weight");
    var height = document.getElementById("height");
    var age = document.getElementById("age");
    var ele = document.getElementsByName('gender');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        var gender = ele[i].value;
    } 

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((user) => {
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User logged in already or has just logged in.
            var useruid = user.uid;
            ref.child(useruid).set({
              username: username.value,
              email: email.value,
              weight: weight.value,
              height: height.value,
              age: age.value,
              gender: gender,
              first : true
            });
            location.replace("welcome.html");
          } else {
            window.alert('something went wrong');
          }
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(errorMessage);
    });
  
}