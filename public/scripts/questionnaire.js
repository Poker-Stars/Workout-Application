function questionnaire(){
    var height;
    var weight;
    var goal = 1;
    var days = new Array(7);
    var time = 45;
    var body_fat = 1;
    var shoulders = 1;
    var legs = 1;
    var arms = 1;
    var chest = 1;

    var heightfeet = parseInt(document.getElementById('height-feet').value);
    var heightinches = parseInt(document.getElementById('height-inches').value);
    
    height = ((12*heightfeet) + heightinches) * 2.54 // conversion to cm

    weight = parseInt(document.getElementById('weight').value);

    var ele = document.getElementsByName('goal');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        goal = i;
    }

    var ele = document.getElementsByName('day');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
            days[i] = true;
        else
            days[i] = false;
    }

    var ele = document.getElementsByName('time');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            time = parseInt(ele[i].value);
        }
    }
    
    var ele = document.getElementsByName('body_fat');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            body_fat = i;
        }
    }

    var ele = document.getElementsByName('shoulder');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            shoulders = i;
        }
    }

    var ele = document.getElementsByName('legs');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            wrist = i;
        }
    }

    var ele = document.getElementsByName('arms');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            wrist = i;
        }
    }

    var ele = document.getElementsByName('chest');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            chest = i;
        }
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
              weight: weight,
              height: height,
              time : time,
              goal : goal,
              days : days,
              body_fat : body_fat,
              shoulders : shoulders,
              legs : legs,
              arms : arms,
              chest : chest,
              first : false
            });
            location.replace("welcome.html");
        })
      });

}