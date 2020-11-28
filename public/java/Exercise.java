public class Exercise() {
    public String name;
    public int type;
    public int duration;
    public int distance;
    public int repitions;
    public int sets;

    public boolean favorite = false;
    public boolean liked = true;

    public Exercise(int _type, String _name) {
        type = _type;
        name = "" + _name;
    }
}