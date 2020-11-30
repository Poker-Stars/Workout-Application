
class Exercise {

    constructor(name, type) {
        this._name = name;
        this._type = type;
        this._record = null;
        this._completions = 0;
        this._disliked = false;
        this._procedure = null;
        this._muscles = null;
        this._weight = null;
        this._speed = null;
        this._reps = null;
        this._sets = null;
        this._time = null;
    }

    set record(record) { this._record = record; }
    set name(name) { this._name = name; }
    set type(type) { this._type = type; }
    set procedure(procedure) { this._procedure = procedure; }
    set speed(speed) { this._speed = speed; }
    set muscles(muscles) { this._muscles = muscles; }
    set reps(reps) { this._reps = reps; }
    set sets(sets) { this._sets = sets; }
    set time(time) { this._time = time; }
    set weight(weight) { this._weight = weight; }
    
    get record() {return this._record; }
    get name() { return this._name; }
    get type() { return this._type; }
    get procedure() { return this._procedure; }
    get muscles() { return this._muscles; }
    get speed() { return this._speed; }
    get reps() { return this._reps; }
    get sets() { return this._sets; }
    get time() { return this._time; }
    get weight() { return this._weight; }

    dislike() { this._disliked = true; }
    undisliked() { this._disliked = false; }
    disliked() { return this._disliked; }

    complete() {
        var date = new Date();
        var session = new Array();
        session.push([date.getMonth(), date.getDate(), date.getFullYear()]);

        if(this._speed != 'null') session.push(this._speed);
        if(this._reps != 'null') session.push(this._reps);
        if(this._sets != 'null') session.push(this._sets);
        if(this._time != 'null') session.push(this._sets);

        this._completions++;
        this._record.push([this._completions, session]);
    }

    static copy(orig) {
        var nuevo = new Exercise(Object.assign(orig.name), Object.assign(orig.type));
        nuevo.procedure = trps(orig.procedure);
        nuevo.muscles = trps(orig.muscles);
        nuevo.record = trps(orig.record);
        nuevo.reps = trps(orig.reps);
        nuevo.sets = trps(orig.speed);
        nuevo.time = trps(orig.time);
        nuevo.record = trps(orig.record);
        nuevo.weight = trps(orig.weight);
        nuevo.completions = trps(orig.completions);
        nuevo.disliked = trps(orig.disliked);
        function trps(prop) {
            if (prop == null || prop == 'undefined')
                return null;
            else
                return Object.assign(prop);
        }
        return nuevo;
    }
}