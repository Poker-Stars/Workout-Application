
function calculateWorkout() {
    const database = firebase.database();
    const ref = database.ref('users');
    const auth = firebase.auth();
    let workoutDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

            var i = 0;
            snapshot.child('days').forEach(function(daybool) {
                if (daybool.val()) {
                    workoutDays[dayCount] = workoutDays[i];
                    dayCount++;
                }
                i++;
            });
            workoutDays = workoutDays.slice(0, dayCount);
            exerciseTime = snapshot.child('time').val();
            height = snapshot.child('height').val();
            bodyFat = snapshot.child('body_fat').val();
            weight = snapshot.child('body_fat').val() * 0.4536;
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

            schedule1 = weightloss(exerciseTime, dayCount);
            schedule2 = tone(exerciseTime, dayCount);
            schedule3 = gainmass(exerciseTime, dayCount);
            
            var toneList = {cardio: new Array(), bodyweight: new Array(), strength: new Array() };
            fillToneSchedule(schedule2, dayCount, bodyFat, shoulders, legs, arms, back, chest, userExercises, bodyShapeModifier); 

            setTimeout( function() {
                var str = "";
                for(i = 0; i < toneList.cardio.length; i++) {
                    str = str + toneList.cardio[i].name + ", ";
                }
                document.getElementById("cardio_param").innerHTML = "Cardio Exercises: " + str;
                str = "";
                for(i = 0; i < toneList.bodyweight.length; i++) {
                    str = str + toneList.bodyweight[i].name + ", ";
                }
                document.getElementById("bodyweight_param").innerHTML = "Bodyweight Exercises: " + str;
                str = "";
                for(i = 0; i < toneList.strength.length; i++) {
                    str = str + toneList.strength[i].name + ", ";
                }
                document.getElementById("strength_param").innerHTML = "Strength Exercises: " + str;
                window.alert("\"I still need to do stuff\" - Alex");
            }, 4000);

            /*
            fillToneSchedule(schedule2, dayCount, bodyFat, shoulders, legs, arms, back, chest, userExercises);
            fillStrengthSchedule(schedule3, dayCount, bodyFat, shoulders, legs, arms, back, chest, userExercises);
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
            window.alert("hey hey hey");
            */
        });
    });
}

