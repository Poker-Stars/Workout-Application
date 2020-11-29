
class Exercise {
    constructor(name, type) {
        this._name = name;
        this._type = type;
        this._record = [];
        this._completions = 0;
        this._disliked = false;
    }

    set name(name) { this._name = name; }
    set type(type) { this._type = type; }
    set procedure(procedure) { this._procedure = procedure; }
    set speed(speed) { this._speed = speed; }
    set reps(reps) { this._reps = reps; }
    set sets(sets) { this._sets = sets; }
    set time(time) { this._time = time; }
    
    get name() { return this._name; }
    get type() { return this._type; }
    get procedure() { return this._procedure; }
    get speed() { return this._speed; }
    get reps() { return this._reps; }
    get sets() { return this._sets; }
    get time() { return this._time; }

    dislike() { this._disliked = true; }
    disliked() { return this._disliked; }

    complete() {
        var date = new Date();
        var session = new Array();
        session.push([date.getMonth(), date.getDate(), date.getFullYear()]);

        if(typeof this._speed !== 'undefined') session.push(this._speed);
        if(typeof this._reps !== 'undefined') session.push(this._reps);
        if(typeof this._sets !== 'undefined') session.push(this._sets);
        if(typeof this._time !== 'undefined') session.push(this._sets);

        this._record.push([this.completions, session]);
        this._completions++;
    }
}