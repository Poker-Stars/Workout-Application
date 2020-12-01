class util {
    static trps(prop) {
        if (prop == null || prop == 'undefined')
            return null;
        return Object.assign(prop);
    }

    static daysDB_Arr(chld) {
        var workoutDays = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
        var dayCount = 0;
        var i = 0;
        chld.forEach(function(daybool) {
            if (daybool.val()) {
                workoutDays[dayCount] = workoutDays[i];
                dayCount++;
            }
            i++;
        });
        return workoutDays.slice(0, dayCount);
    }
}