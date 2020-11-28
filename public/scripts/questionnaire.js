function questionnaire(){
    var days = new Array(7);
    let daysIn = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var score = 0;
    var goal = 0;

    var ele = document.getElementByName('goal');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        goal = i;
    }

    for(i = 0; i < 7; i++) {
        days[i] = document.getElementByName(daysIn[i]);
    }
    
    var ele = document.getElementsByName('shoulder');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        score = score + parseInt(ele[i].value);
    } 

    var ele = document.getElementsByName('jeans');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        score = score + parseInt(ele[i].value);
    } 
    
    var ele = document.getElementsByName('forearms');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        score = score + parseInt(ele[i].value);
    } 

    var ele = document.getElementsByName('body');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        score = score + parseInt(ele[i].value);
    } 

    var ele = document.getElementsByName('bodyis');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        score = score + parseInt(ele[i].value);
    } 

    var ele = document.getElementsByName('finger');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        score = score + parseInt(ele[i].value);
    } 

    var ele = document.getElementsByName('myweight');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        score = score + parseInt(ele[i].value);
    } 

    var ele = document.getElementsByName('range');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        score = score + parseInt(ele[i].value);
    } 

    console.log(score);

    var bodytype = null;
    if(score <= 9){
        bodytype = "ectomorph";
    }
    else if(score >= 18){
        bodytype = "endomorph";
    }
    else {
        bodytype = "mesomorph";
    }

    const database = firebase.database();
    const ref = database.ref('users');
    const auth = firebase.auth();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var useruid = user.uid;
            console.log(useruid);
        } 
        else {
            window.alert("No user is signed in");
        }
  
        firebase.database().ref('users/'+useruid).once('value').then(function (snapshot){
            ref.child(useruid).set({
              username: snapshot.val().username,
              email: snapshot.val().email,
              weight: snapshot.val().weight,
              height: snapshot.val().height,
              age: snapshot.val().age,
              gender: snapshot.val().gender,
              first : false,
              bodytype: bodytype
            });
            location.replace("welcome.html");
        })
      });

}