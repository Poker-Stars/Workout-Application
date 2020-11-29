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

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var useruid = user.uid;
            console.log(useruid);
        } 
        else {
            window.alert("No user is signed in");
        }
        firebase.database().ref('users/'+useruid).once('value').then(function (snapshot){
            bodytype = snapshot.val().bodytype;
            for(i = 0; i < 7; i++)
                if(snapshot.child(days).child(i).val()) {
                    _workoutDays[dayCount] = _workoutDays[i];
                    dayCount++;
                }
            goal = snapshot.val().goal;
            shoulders = snapshot.val().shoulders;
            legs = snapshot.val().legs;
            forearms = snapshot.val().forearms;
            body_fat = snapshot.val().bodyfat;
            wrist = snapshot.val().wrist;
            body_shape = snapshot.val().body_shape;
            chest = snapshot.val().chest;
        })
    });
    console.log("Hiya"+days);
    var workoutDays = _workoutDays.slice(0, dayCount);
    window.alert("Successful");
    
}