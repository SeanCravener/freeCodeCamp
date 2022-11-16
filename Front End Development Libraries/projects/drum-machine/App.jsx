import React, { useState, useEffect } from "react";

import './style.css';

const drumSamples = [
    {key: 81, id: 'Q', label: 'Heater 1', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    {key: 87, id: 'W', label: 'Heater 2', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    {key: 69, id: 'E', label: 'Heater 3', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    {key: 65, id: 'A', label: 'Heater 4', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    {key: 83, id: 'S', label: 'Clap', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    {key: 68, id: 'D', label: 'Open-HH', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    {key: 90, id: 'Z', label: 'Kick-n-Hat', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    {key: 88, id: 'X', label: 'Kick', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    {key: 67, id: 'C', label: 'Closed-HH', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
]

// Need to create event listener, maybe custom hook

const App = () => {



    return (
        <div className='row d-flex justify-content-center align-items-center' id='drum-machine'>
            <div className='col-6'>
                <div id='display' className='bg-light'>
                    Snare Drum!
                </div>
                <label for="volume" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="1" id="volume"></input>
            </div>
            <div className='col-6'>
                <div className='row gap-2 d-flex justify-content-center align-items-center p-1'>
                    {drumSamples.map(item => {
                        return (<button className='drum-pad btn btn-primary col-3 p-2'  type='button' id={item.id}>
                            {item.id}
                        </button>);
                    })}
                </div>
            </div>
        </div>
    )
}

export default App



