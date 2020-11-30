/*
* For each of the fitness goals, the workout session is separated into blocks
* the length of the block is dependent on the time a user wants to spend exercising
* the format of the block is <type>Block[minutes, exercises]
* Cardio exercises will generally take either 10 for 15 minutes, while bodyweight and strength exercises will take 5 minutes
*/

/*
* The weightloss goal is split between cardio and bodyweight
*/
function weightloss(exerciseTime, dayCount) {

    var cardioBlock = new Array();
    var bodyweightBlock = new Array();

    switch(exerciseTime) {

        case 30:
            for(i = 0; i < dayCount; i++) {
                cardioBlock.push([15, 1]);
                bodyweightBlock.push([15, 3]);
            }
            break;

        case 45:
            for(i = 0; i < dayCount; i++) {
                cardioBlock.push([20, 2]);
                bodyweightBlock.push([25, 5]);
            }
            break;

        case 60:
            for(i = 0; i < dayCount; i++) {
                cardioBlock.push([30, 3]);
                bodyweightBlock.push([30, 6]);
            }
            break;
    }
}


/*
* The tone goal is split between cardio, bodyweight, and strength
*/
function tone(exerciseTime, dayCount) {

    var cardioBlock = new Array();
    var bodyweightBlock = new Array();
    var strengthBlock = new Array();

    switch(exerciseTime) {

        case 30:
            for(i = 0; i < dayCount; i++) {
                cardioBlock.push([10, 1]);
                bodyweightBlock.push([10, 2]);
                strengthBlock.push([10, 2]);
            }
            break;

        case 45:
            for(i = 0; i < dayCount; i++) {
                cardioBlock.push([15, 1]);
                bodyweightBlock.push([15, 3]);
                strengthBlock.push([15, 3]);
            }
            break;

        case 60:
            for(i = 0; i < dayCount; i++) {
                cardioBlock.push([20, 1]);
                bodyweightBlock.push([20, 4]);
                strengthBlock.push([20, 4]);
            }
            break;
    }
    
    return [cardioBlock, bodyweightBlock, strengthBlock];
}

/*
* The gain muscle mass goal is split between bodyweight and strength exercises; cardio kills gainz
*/
function gainmass(dayCount, exerciseTime) {

    var bodyweightBlock = new Array();
    var strengthBlock = new Array();

    switch(exerciseTime) {

        case 30:
            for(i = 0; i < dayCount; i++) {
                bodyweightBlock.push([15, 3]);
                strengthBlock.push([15, 3]);
            }
            break;

        case 45:
            for(i = 0; i < dayCount; i++) {
                bodyweightBlock.push([20, 4]);
                strengthBlock.push([25, 5]);
            }
            break;
            
        case 60:
            for(i = 0; i < dayCount; i++) {
                
                bodyweightBlock.push([30, 6]);
                strengthBlock.push([30, 6]);
            }
            break;
    }
    return [bodyweightBlock, strengthBlock];
}