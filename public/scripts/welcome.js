function gotData() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var useruid = user.uid;
            //console.log(useruid);
        } 
        else {
            // window.alert("No user is signed in");
        }

        firebase.database().ref('users/'+useruid).once('value').then(function (snapshot){
            document.getElementById("user_param").innerHTML = "Name : " + snapshot.val().username;
            document.getElementById("email_param").innerHTML = "Email : " + snapshot.val().email;
            document.getElementById("weight_param").innerHTML = "Weight : " + snapshot.val().weight + " lbs";
            document.getElementById("height_param").innerHTML = "Height : " + snapshot.val().height_ft + "\'" + snapshot.val().height_in + "\"";
            
            /* convert database days to day array */
            var workoutDays = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
            var dayCount = 0;
            var i = 0;
            snapshot.child('days').forEach(function(daybool) {
                if (daybool.val()) {
                    workoutDays[dayCount] = workoutDays[i];
                    dayCount++;
                }
                i++;
            });

            document.getElementById("time_param").innerHTML = "I work out for " + snapshot.child('time').val() + " minutes a day.";

            var str = "";
            workoutDays = workoutDays.slice(0, dayCount);
            for(i = 0; i < dayCount; i++) {
                if(dayCount >= 1 && i == dayCount - 1) str = str + "and ";
                str = str + workoutDays[i];
                if(dayCount - i > 1) { if(dayCount > 2) str = str + ","; str = str + " "; }
                if(dayCount - i == 1) str = str + ".";
            }
            document.getElementById("day_param").innerHTML = "I work out on " + str;

            str = "I am working out to ";
            switch(snapshot.child('goal').val()) {
                case 0:
                    str = str + "burn fat and lose weight!";
                    break;
                case 1:
                    str = str + "tone my body and look great!";
                    break;
                case 2:
                    str = str + "get some GAINS!!";
                    break;
            }
            document.getElementById("goal_param").innerHTML = str;
        })
    });
}

function logout(){
    firebase.auth().signOut();
    window.location.href = "index.html";
}