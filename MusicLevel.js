// a class to load the music level
class MusicLevelGenerator {


}

//the following will load individual notes to their positions on the grids
//position_offset is the number of half grid squares away from 0,0 to position the note.
//up indicates up stem notation, and down the reverse
//notes are inserted from top to bottom, left to right
const musicLevel = {

    chords: [
        //1st chord
        {x: 0, y: 0, x_position_offset: 14, y_position_offset: 7, type: "quarter", position: "up"},
        {x: 0, Y: 0, x_position_offset: 14, y_position_offset: 12, type: "quarter", position: "down"},
        {x: 0, y: 0, x_position_offset: 14, y_position_offset: 14, type: "half", position: "up"},
        {x: 0, y: 0, x_position_offset: 14, y_position_offset: 19, type: "half", position: "down"},

        //2nd chord
        {x: 0, y: 0, x_position_offset: 22, y_position_offset: 5, type: "quarter", position: "up"},
        {x: 0, y: 0, x_position_offset: 22, y_position_offset: 9, type: "quarter", position: "down"},
        {x: 0, y: 0, x_position_offset: 22, y_position_offset: 20, type: "quarter", position: "up"},
        {x: 0, y: 0, x_position_offset: 22, y_position_offset: 25, type: "quarter", position: "down"},

        //etc
        {x: 0, y: 0, x_position_offset: 26, y_position_offset: 5, type: "quarter", position: "up"},
        {x: 0, y: 0, x_position_offset: 26, y_position_offset: 10, type: "quarter", position: "down"},
        {x: 0, y: 0, x_position_offset: 26, y_position_offset: 19, type: "quarter", position: "up"},
        {x: 0, y: 0, x_position_offset: 26, y_position_offset: 23, type: "quarter", position: "down"},

        {x: 0, y: 0, x_position_offset: 31, y_position_offset: 2.5, type: "half", position: "up"},
        {x: 0, y: 0, x_position_offset: 31, y_position_offset: 10, type: "half", position: "down"},
        {x: 0, y: 0, x_position_offset: 31, y_position_offset: 16, type: "half", position: "up"},
        {x: 0, y: 0, x_position_offset: 31, y_position_offset: 21, type: "half", position: "down"},

        {x: 0, y: 0, x_position_offset: 39, y_position_offset: 2, type: "half", position: "up"},
        {x: 0, y: 0, x_position_offset: 39, y_position_offset: 10, type: "half", position: "down"},
        {x: 0, y: 0, x_position_offset: 39, y_position_offset: 16, type: "half", position: "up"},
        {x: 0, y: 0, x_position_offset: 39, y_position_offset: 23, type: "half", position: "down"}
    ]};
