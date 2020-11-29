function calculateWorkout() {
    const database = firebase.database();
    const ref = database.ref('users');
    const auth = firebase.auth();
    let _workoutDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var bodytype;
    var dayCount = 0;
    var days;
    var goal;
    var shoulders;
    var legs;
    var forearms;
    var body_fat;
    var body_shape;
    var wrist;
    var weight_gain;
    var chest;
    var user_exercises = new Array();
    var exercise_specifics = new Array();

    firebase.auth().onAuthStateChanged((user) => {
        window.alert("Hiya1");
        if (user) {
            var useruid = user.uid;
            console.log(useruid);
        } 
        else {
            window.alert("No user is signed in");
        }
        firebase.database().ref('users/'+useruid).once('value').then(function (snapshot){
            window.alert("Hiya2");

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
                    _workoutDays[dayCount] = _workoutDays[i];
                    dayCount++;
                }
                i++;
            });
            var workoutDays = _workoutDays.slice(0, dayCount);
            body_fat = snapshot.val().bodyfat;
            shoulders = snapshot.val().shoulders;
            legs = snapshot.val().legs;
            arms = snapshot.val().arms; 
            chest = snapshot.val().chest;
            window.alert("dayCount: " + dayCount);
            window.alert("days: " + workoutDays);
        });
    });
}

