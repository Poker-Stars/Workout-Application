
function calculateWorkout() {
    const database = firebase.database();
    const ref = database.ref('users');
    const auth = firebase.auth();
    var workoutDays;
    var dayCount = 0;
    var goal;
    var height;
    var weight;
    var shoulders;
    var legs;
    var arms;
    var bodyFat;
    var chest;
    var userExercises = new Array();
    var exerciseTime;
    var schedule = null;
    var exOBJ;

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

            snapshot.child('user_exercises').forEach(function(exDB) {
                exOBJ = new Exercise(exDB.key, exDB.child('type').val());
                //exOBJ.record = exDB.child(record);
                exOBJ.procedure = exDB.child('procedure');
                exOBJ.speed = exDB.child('speed').val();
                exOBJ.muscles = exDB.child('muscles').val();
                exOBJ.reps = exDB.child('reps').val();
                exOBJ.sets = exDB.child('sets').val();
                exOBJ.time = exDB.child('time').val();
                userExercises.push(Exercise.copy(exOBJ));
                exOBJ = null;
            });

            workoutDays = util.daysDB_Arr(snapshot.child('days'));
            dayCount = workoutDays.length;

            exerciseTime = snapshot.child('time').val();
            height = snapshot.child('height').val();
            bodyFat = snapshot.child('body_fat').val();
            weight = snapshot.child('weight').val() * 0.4536;
            shoulders = snapshot.child('shoulders').val();
            legs = snapshot.child('legs').val();
            arms = snapshot.child('arms').val();
            back = snapshot.child('back').val();
            chest = snapshot.child('chest').val();
            var bodyShapeModifier = 0;
            var bodyTypeModifier = 0;
            var bmi = (weight)/(height * height);
            if(bmi < 18.5) bodyShapeModifier = -1;
            else if(bmi >= 18.5 && bmi < 25) bodyShapeModifier = 0;
            else if(bmi >= 25 && bmi < 30) bodyShapeModifier = 1;
            else if(bmi >= 30) bodyShapeModifier = 2;


            var schedule = new Array();

            var plan;

            switch(goal) {
                case 0:
                    plan = {cardioBlock: new Array(), bodyweightBlock: new Array()};
                    plan_weightloss(plan, exerciseTime, dayCount);
                    schedule_weightloss(schedule, plan, dayCount, bodyFat, shoulders, legs, arms, back, chest, userExercises, bodyShapeModifier);
                    break;
                case 1:
                    plan = {cardioBlock: new Array(), bodyweightBlock: new Array(), strengthBlock: new Array()};
                    plan_tone(plan, exerciseTime, dayCount);
                    schedule_tone(schedule, plan, dayCount, bodyFat, shoulders, legs, arms, back, chest, userExercises, bodyShapeModifier);
                    break;
                case 2:
                    plan = {bodyweightBlock: new Array(), strengthBlock: new Array()};
                    plan_gainmass(plan, exerciseTime, dayCount);
                    schedule_gainmass(schedule, plan, dayCount, bodyFat, shoulders, legs, arms, back, chest, userExercises, bodyShapeModifier);
                    break;
            }
            var str = "";
            setTimeout(function() {
                for(i = 0; i < dayCount; i++) {
                    console.log("" + workoutDays[i] + ":");
                    for(j = 0; j < schedule[i].length; j++) {
                        str = "\t" + schedule[i][j].name;
                        if(schedule[i][j].procedure == 'time-minutes') 
                            str = str + " for " + schedule[i][j].time + " minutes";
                        if(schedule[i][j].procedure == 'repitition')
                            str = str + "  " + schedule[i][j].sets + " x " + schedule[i][j].reps;
                        if(schedule[i][j].type == 'strength')
                            str = str + " @ " + schedule[i][j].weight + " lbs";
                        if(schedule[i][j].procedure == 'time-seconds')
                            str = str + "  " + schedule[i][j].sets + " x " + schedule[i][j].time + " seconds";
                        console.log("" + str);
                        str = "";
                    }
                }
            }, 2000);
        });
    });
}

