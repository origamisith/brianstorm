/*

add a note to the grandstaff as follows:
{beat_offset: 0, note_value: "C3", type: "half", stem_direction: "down", clef: "treble"},

where:
beat offset is the note position in time
note_value is the specific note on the staff, i.e. A,B,C etc
type is refers to half, quarter, eighth, etc
stem_direction is the direction the note stem is pointing
clef is which clef to place the note on, either treble or bass

*/
const musicLevel = {

    chords: [

        // // bar 1
        {beat_offset: 16, note_value: "D5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 16, note_value: "F4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 16, note_value: "D4", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 16, note_value: "B3", type: "half", stem_direction: "down", clef: "bass"},


        {beat_offset: 24, note_value: "F5", type: "eighth", stem_direction: "down", clef: "treble"},
        {beat_offset: 28, note_value: "D5", type: "eighth", stem_direction: "down", clef: "treble"},



        {beat_offset: 32, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 32, note_value: "B4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 32, note_value: "B3", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 32, note_value: "D3", type: "quarter", stem_direction: "down", clef: "bass"},

        {beat_offset: 40, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 40, note_value: "A4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 40, note_value: "C4", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 40, note_value: "F3", type: "quarter", stem_direction: "down", clef: "bass"},
        //end bar 1

        //bar 2
        {beat_offset: 48, note_value: "D5", type: "half", stem_direction: "up", clef: "treble"},
        {beat_offset: 48, note_value: "G4", type: "half", stem_direction: "down", clef: "treble"},
        {beat_offset: 48, note_value: "B3", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 48, note_value: "G3", type: "half", stem_direction: "down", clef: "bass"},

        {beat_offset: 64, note_value: "E5", type: "half", stem_direction: "up", clef: "treble"},
        {beat_offset: 64, note_value: "G4", type: "half", stem_direction: "down", clef: "treble"},
        {beat_offset: 64, note_value: "B3", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 64, note_value: "E3", type: "half", stem_direction: "down", clef: "bass"},


        //bar 3
        {beat_offset: 80, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 80, note_value: "A4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 80, note_value: "D4", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 80, note_value: "B3", type: "half", stem_direction: "down", clef: "bass"},

        {beat_offset: 88, note_value: "D5", type: "eighth", stem_direction: "down", clef: "treble"},
        {beat_offset: 92, note_value: "F5", type: "eighth", stem_direction: "down", clef: "treble"},

        {beat_offset: 96, note_value: "E5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 96, note_value: "A4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 96, note_value: "C4", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 96, note_value: "F3", type: "quarter", stem_direction: "down", clef: "bass"},

        {beat_offset: 104, note_value: "G5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 104, note_value: "B4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 104, note_value: "D4", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 104, note_value: "G3", type: "quarter", stem_direction: "down", clef: "bass"},
        //end bar 3

        //bar 4
        {beat_offset: 112, note_value: "E5", type: "half", stem_direction: "up", clef: "treble"},
        {beat_offset: 112, note_value: "G4", type: "half", stem_direction: "down", clef: "treble"},
        {beat_offset: 112, note_value: "B3", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 112, note_value: "G3", type: "half", stem_direction: "down", clef: "bass"},

        {beat_offset: 128, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 128, note_value: "A4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 128, note_value: "C4", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 128, note_value: "F3", type: "quarter", stem_direction: "down", clef: "bass"},

        {beat_offset: 136, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 136, note_value: "B4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 136, note_value: "D4", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 136, note_value: "C4", type: "quarter", stem_direction: "down", clef: "bass"},
        // end bar 4

        //bar 5
        {beat_offset: 144, note_value: "D5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 144, note_value: "F4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 144, note_value: "D4", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 144, note_value: "B3", type: "half", stem_direction: "down", clef: "bass"},

        {beat_offset: 152, note_value: "F5", type: "eighth", stem_direction: "down", clef: "treble"},
        {beat_offset: 156, note_value: "D5", type: "eighth", stem_direction: "down", clef: "treble"},

        {beat_offset: 160, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 160, note_value: "B4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 160, note_value: "B3", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 160, note_value: "D3", type: "quarter", stem_direction: "down", clef: "bass"},

        {beat_offset: 168, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 168, note_value: "A4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 168, note_value: "C4", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 168, note_value: "C3", type: "quarter", stem_direction: "down", clef: "bass"},

        //end bar 5
        {beat_offset: 176, note_value: "D5", type: "eighth", stem_direction: "down", clef: "treble"},
        {beat_offset: 180, note_value: "F5", type: "eighth", stem_direction: "down", clef: "treble"},



        //bar 6
        //FILL ME IN
        //end bar 6

        //bar 7
        //FILL ME IN
        //end bar 7

        //bar 8

        {beat_offset: 240, note_value: "E5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 240, note_value: "G4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 240, note_value: "B3", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 240, note_value: "G3", type: "quarter", stem_direction: "down", clef: "bass"},

        {beat_offset: 248, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 248, note_value: "A4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 248, note_value: "C4", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 248, note_value: "F3", type: "quarter", stem_direction: "down", clef: "bass"},

        {beat_offset: 256, note_value: "D5", type: "half", stem_direction: "up", clef: "treble"},
        {beat_offset: 256, note_value: "G4", type: "half", stem_direction: "down", clef: "treble"},
        {beat_offset: 256, note_value: "B3", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 256, note_value: "G3", type: "half", stem_direction: "down", clef: "bass"},
        //end bar 8
        
        //bar 9
        {beat_offset: 272, note_value: "D5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 272, note_value: "F4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 272, note_value: "D4", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 272, note_value: "B3", type: "half", stem_direction: "down", clef: "bass"},

        {beat_offset: 288, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 288, note_value: "B4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 288, note_value: "B3", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 288, note_value: "D3", type: "quarter", stem_direction: "down", clef: "bass"},

        {beat_offset: 296, note_value: "F5", type: "quarter", stem_direction: "up", clef: "treble"},
        {beat_offset: 296, note_value: "A4", type: "quarter", stem_direction: "down", clef: "treble"},
        {beat_offset: 296, note_value: "C4", type: "quarter", stem_direction: "up", clef: "bass"},
        {beat_offset: 296, note_value: "F3", type: "quarter", stem_direction: "down", clef: "bass"},
        //end bar 9


        //bar 10
        {beat_offset: 304, note_value: "D5", type: "half", stem_direction: "up", clef: "treble"},
        {beat_offset: 304, note_value: "G4", type: "half", stem_direction: "down", clef: "treble"},
        {beat_offset: 304, note_value: "B3", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 304, note_value: "G3", type: "half", stem_direction: "down", clef: "bass"},

        {beat_offset: 320, note_value: "E5", type: "half", stem_direction: "up", clef: "treble"},
        {beat_offset: 320, note_value: "G4", type: "half", stem_direction: "down", clef: "treble"},
        {beat_offset: 320, note_value: "B3", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 320, note_value: "E3", type: "half", stem_direction: "down", clef: "bass"},

        //bar 11

        //FILL ME IN


        //end bar 11

        
        
        

        //bar 12
        {beat_offset: 368, note_value: "F5", type: "half", stem_direction: "up", clef: "treble"},
        {beat_offset: 368, note_value: "A4", type: "half", stem_direction: "down", clef: "treble"},
        {beat_offset: 368, note_value: "C4", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 368, note_value: "F3", type: "half", stem_direction: "down", clef: "bass"},

        {beat_offset: 384, note_value: "D5", type: "half", stem_direction: "up", clef: "treble"},
        {beat_offset: 384, note_value: "F4", type: "half", stem_direction: "down", clef: "treble"},
        {beat_offset: 384, note_value: "D4", type: "half", stem_direction: "up", clef: "bass"},
        {beat_offset: 384, note_value: "B3", type: "half", stem_direction: "down", clef: "bass"},
        //end bar 12

    ],


    sounds: [

        {position: 16, sound_path: "./assets/music/song/1.mp3"},
        {position: 24, sound_path: "./assets/music/song/17-1.mp3"},
        {position: 28, sound_path: "./assets/music/song/17-2.mp3"},
        {position: 32, sound_path: "./assets/music/song/4.mp3"},
        {position: 40, sound_path: "./assets/music/song/5.mp3"},
        {position: 48, sound_path: "./assets/music/song/6.mp3"},
        {position: 64, sound_path: "./assets/music/song/7.mp3"},
        {position: 80, sound_path: "./assets/music/song/8.mp3"},
        {position: 88, sound_path: "./assets/music/song/17-2.mp3"},
        {position: 92, sound_path: "./assets/music/song/17-1.mp3"},
        {position: 96, sound_path: "./assets/music/song/11.mp3"},
        {position: 104, sound_path: "./assets/music/song/12.mp3"},
        {position: 112, sound_path: "./assets/music/song/13.mp3"},
        {position: 128, sound_path: "./assets/music/song/14.mp3"},
        {position: 136, sound_path: "./assets/music/song/15.mp3"},
        {position: 144, sound_path: "./assets/music/song/16.mp3"},
        {position: 152, sound_path: "./assets/music/song/17-1.mp3"},
        {position: 156, sound_path: "./assets/music/song/17-2.mp3"},
        {position: 160, sound_path: "./assets/music/song/18.mp3"},
        {position: 168, sound_path: "./assets/music/song/19.mp3"},
        {position: 296, sound_path: "./assets/music/song/20.mp3"},
        {position: 304, sound_path: "./assets/music/song/21.mp3"},
        {position: 320, sound_path: "./assets/music/song/22.mp3"},
        {position: 368, sound_path: "./assets/music/song/23.mp3"},
        {position: 384, sound_path: "./assets/music/song/24.mp3"},
        // {position: 80, sound_path: "./assets/music/song/25.mp3"},
        // {position: 80, sound_path: "./assets/music/song/26.mp3"},
        // {position: 80, sound_path: "./assets/music/song/27.mp3"},
        // {position: 80, sound_path: "./assets/music/song/28.mp3"},
        // {position: 80, sound_path: "./assets/music/song/29.mp3"},
        // {position: 80, sound_path: "./assets/music/song/30.mp3"},
        // {position: 80, sound_path: "./assets/music/song/31.mp3"},
        // {position: 80, sound_path: "./assets/music/song/32.mp3"},
        // {position: 80, sound_path: "./assets/music/song/33.mp3"},
        // {position: 80, sound_path: "./assets/music/song/34.mp3"},
        // {position: 80, sound_path: "./assets/music/song/35.mp3"},
        // {position: 80, sound_path: "./assets/music/song/36.mp3"},
        // {position: 80, sound_path: "./assets/music/song/37.mp3"},
        // {position: 80, sound_path: "./assets/music/song/38.mp3"},
        // {position: 80, sound_path: "./assets/music/song/39.mp3"},
        // {position: 80, sound_path: "./assets/music/song/40.mp3"},
        // {position: 80, sound_path: "./assets/music/song/41.mp3"},

    ],


    barlines: [
        {position: 44},
        {position: 76},
        {position: 108},
        {position: 140},
        {position: 172},
        {position: 204},
        {position: 236},
        {position: 268},
        {position: 300},
        {position: 332},
        {position: 332},
        {position: 364},
        {position: 399.8},
        {position: 400.2},



    ],

    clefs: [
        {x_position: 2, y_position: 3, type: "treble"},
        {x_position: 2, y_position: 21, type: "bass"}
    ],
    powerUps: [{x: 9000, y: 700}]
};
