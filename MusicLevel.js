/*

add a note to the grandstaff as follows:
{beat_offset: 0, note_value: "C3", type: "half", orientation: "down", clef: "treble"},

where:
beat offset is the note position in time
note_value is the specific note on the staff, i.e. A,B,C etc
type is refers to half, quarter, eighth, etc
orientation is the direction the note stem is pointing
clef is which clef to place the note on, either treble or bass

*/
const musicLevel = {

    chords: [

        // bar 1
        {beat_offset: 16, note_value: "D5", type: "quarter", orientation: "up", clef: "treble"},
        {beat_offset: 16, note_value: "F4", type: "quarter", orientation: "down", clef: "treble"},
        {beat_offset: 16, note_value: "D4", type: "half", orientation: "up", clef: "bass"},
        {beat_offset: 16, note_value: "B3", type: "half", orientation: "down", clef: "bass"},

        {beat_offset: 32, note_value: "F5", type: "quarter", orientation: "up", clef: "treble"},
        {beat_offset: 32, note_value: "B4", type: "quarter", orientation: "down", clef: "treble"},
        {beat_offset: 32, note_value: "B3", type: "quarter", orientation: "up", clef: "bass"},
        {beat_offset: 32, note_value: "D3", type: "quarter", orientation: "down", clef: "bass"},

        {beat_offset: 40, note_value: "F5", type: "quarter", orientation: "up", clef: "treble"},
        {beat_offset: 40, note_value: "A4", type: "quarter", orientation: "down", clef: "treble"},
        {beat_offset: 40, note_value: "C4", type: "quarter", orientation: "up", clef: "bass"},
        {beat_offset: 40, note_value: "F3", type: "quarter", orientation: "down", clef: "bass"},
        //end bar 1

        //bar 2
        {beat_offset: 48, note_value: "D5", type: "half", orientation: "up", clef: "treble"},
        {beat_offset: 48, note_value: "G4", type: "half", orientation: "down", clef: "treble"},
        {beat_offset: 48, note_value: "B3", type: "half", orientation: "up", clef: "bass"},
        {beat_offset: 48, note_value: "G3", type: "half", orientation: "down", clef: "bass"},

        {beat_offset: 64, note_value: "E5", type: "half", orientation: "up", clef: "treble"},
        {beat_offset: 64, note_value: "G4", type: "half", orientation: "down", clef: "treble"},
        {beat_offset: 64, note_value: "B3", type: "half", orientation: "up", clef: "bass"},
        {beat_offset: 64, note_value: "E3", type: "half", orientation: "down", clef: "bass"},


        //bar 3
        {beat_offset: 80, note_value: "F5", type: "quarter", orientation: "up", clef: "treble"},
        {beat_offset: 80, note_value: "A4", type: "quarter", orientation: "down", clef: "treble"},
        {beat_offset: 80, note_value: "D4", type: "half", orientation: "up", clef: "bass"},
        {beat_offset: 80, note_value: "B3", type: "half", orientation: "down", clef: "bass"},

        {beat_offset: 96, note_value: "E5", type: "quarter", orientation: "up", clef: "treble"},
        {beat_offset: 96, note_value: "A4", type: "quarter", orientation: "down", clef: "treble"},
        {beat_offset: 96, note_value: "C4", type: "quarter", orientation: "up", clef: "bass"},
        {beat_offset: 96, note_value: "F3", type: "quarter", orientation: "down", clef: "bass"},

        {beat_offset: 104, note_value: "G5", type: "quarter", orientation: "up", clef: "treble"},
        {beat_offset: 104, note_value: "B4", type: "quarter", orientation: "down", clef: "treble"},
        {beat_offset: 104, note_value: "D4", type: "quarter", orientation: "up", clef: "bass"},
        {beat_offset: 104, note_value: "G3", type: "quarter", orientation: "down", clef: "bass"},
        //end bar 3

        //bar 4
        {beat_offset: 112, note_value: "E5", type: "half", orientation: "up", clef: "treble"},
        {beat_offset: 112, note_value: "G4", type: "half", orientation: "down", clef: "treble"},
        {beat_offset: 112, note_value: "B3", type: "half", orientation: "up", clef: "bass"},
        {beat_offset: 112, note_value: "G3", type: "half", orientation: "down", clef: "bass"},

        {beat_offset: 128, note_value: "F5", type: "quarter", orientation: "up", clef: "treble"},
        {beat_offset: 128, note_value: "A4", type: "quarter", orientation: "down", clef: "treble"},
        {beat_offset: 128, note_value: "C4", type: "quarter", orientation: "up", clef: "bass"},
        {beat_offset: 128, note_value: "F3", type: "quarter", orientation: "down", clef: "bass"},

        {beat_offset: 136, note_value: "F5", type: "quarter", orientation: "up", clef: "treble"},
        {beat_offset: 136, note_value: "B4", type: "quarter", orientation: "down", clef: "treble"},
        {beat_offset: 136, note_value: "D4", type: "quarter", orientation: "up", clef: "bass"},
        {beat_offset: 136, note_value: "C4", type: "quarter", orientation: "down", clef: "bass"},
        //end bar 4







    ],

    barlines: [
        {position: 0},
        {position: 44},
        {position: 76},
        {position: 108},
        {position: 144},

    ],

    clefs: [

        {x_position: 2, y_position: 3, type: "treble"},
        {x_position: 2, y_position: 21, type: "bass"}


    ]
};
