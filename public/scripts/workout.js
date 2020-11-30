
function calculateWorkout() {
    const database = firebase.database();
    const ref = database.ref('users');
    const auth = firebase.auth();
    let workoutDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayCount = 0;
    var goal;
    var shoulders;
    var legs;
    var arms;
    var bodyFat;
    var chest;
    var userExercises = new Array();
    var exerciseSpecifics = new Array();
    var exerciseTime;
    var schedule = null;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var useruid = user.uid;
            console.log(useruid);
        } 
        else {
            window.alert("No user is signed in");
        }
        firebase.database().ref('users/'+useruid).once('value').then(function (snapshot){

            goal = snapshot.val().goal;

            if(snapshot.hasChild('user_exercises')) {
                snapshot.child('user_exercises').forEach(function(child) {
                    child.forEach(function(child) {
                        exercise_specifics.push(child.val());
                    })
                    user_exercises.push(exercise_specifics);
                });
            }
            var i = 0;
            snapshot.child('days').forEach(function(daybool) {
                if (daybool.val()) {
                    workoutDays[dayCount] = workoutDays[i];
                    dayCount++;
                }
                i++;
            });
            workoutDays = workoutDays.slice(0, dayCount);
            exerciseTime = snapshot.val().time;
            bodyFat = snapshot.val().bodyfat;
            shoulders = snapshot.val().shoulders;
            legs = snapshot.val().legs;
            arms = snapshot.val().arms;
            back = snapshot.val().back;
            chest = snapshot.val().chest;
            
            switch(goal) {
                case 0:
                    schedule = weightloss(exerciseTime, dayCount);
                    break;
                case 1:
                    schedule = tone(exerciseTime, dayCount);
                    break;
                case 2:
                    schedule = gainmass(exerciseTime, dayCount);
                    break;
            }
        });
    });
}

