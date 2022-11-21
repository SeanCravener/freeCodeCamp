import React, { useState, useEffect, useRef, useCallback } from "react";
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

const App = () => {
    const [volume, setVolume] = React.useState(0.50)
    const [label, setLabel] = React.useState('Play Something!')
    

    return (
        <div className='row d-flex justify-content-center align-items-center' id='drum-machine'>
            <div className='col-6'>
                <Display label={label} volume={volume} setVolume={setVolume}/>
            </div>
            <div className='col-6'>
                <div className='row gap-2 d-flex justify-content-center align-items-center p-1'>
                {drumSamples.map((item) => (
                      <Drumpad drumSound={item} volume={volume} setLabel={setLabel} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App

const Display = ({ label, volume, setVolume }) => {
    return (
        <div>
            <div id='display' className='bg-light'>
              {label}
            </div>
            <div id='volume'>
                <br></br>Volume<br></br>
                <input type="range" label='Volume' min="0" max="1.0" step='0.02' id="volume" value={volume} onChange={event => setVolume(event.target.value)}/>
            </div>
        </div>
    )
}

const Drumpad = ({ drumSound, volume, setLabel }) => {
    const ref = React.useRef();
    const handleClick = (audioRef) => {
        setLabel(audioRef.current.id);
        audioRef.current.volume = volume;
        audioRef.current.play();
    }

    return (
        <button className='drum-pad btn btn-primary col-3 p-2' type='button' id={drumSound.label} onClick={() => handleClick(ref)}>
            {drumSound.id}
            <audio src={drumSound.fileURL} ref={ref} volume={volume} id={drumSound.label}/>
        </button>
    )
}



