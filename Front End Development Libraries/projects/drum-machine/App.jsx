import React, { useState, useEffect } from "react";

const drumSamples = [
    {key: 'Q', label: 'Heater 1', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    {key: 'W', label: 'Heater 2', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    {key: 'E', label: 'Heater 3', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    {key: 'A', label: 'Heater 4', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    {key: 'S', label: 'Clap', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    {key: 'D', label: 'Open-HH', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    {key: 'Z', label: 'Kick-n-Hat', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    {key: 'X', label: 'Kick', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    {key: 'C', label: 'Closed-HH', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
]

const App = () => {
    const [volume, setVolume] = useState(0.50)
    const [label, setLabel] = useState('Play Something!')
    
    return (
        <div className='row d-flex justify-content-center align-items-center' id='drum-machine'>
            <div className='col-6'>
                <Display label={label} volume={volume} setVolume={setVolume}/>
            </div>
            <div className='col-6'>
                <div className='row gap-2 p-1'>
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

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        };
      }, [volume])
    
    const handleKeyPress = (event) => {
        const key = event.key.toUpperCase()
        playAudio(key);
      }

    const playAudio = (key) => {
        const audioDOM = document.getElementById(key)
        setLabel(audioDOM.getAttribute('label'))
        audioDOM.volume = volume;
        audioDOM.play()
    }

    return (
        <button className='drum-pad btn btn-primary col-3 p-2' type='button' onClick={() => playAudio(drumSound.key)}>
            {drumSound.key}
            <audio className='clip' src={drumSound.fileURL} id={drumSound.key} volume={volume} label={drumSound.label}/>
        </button>
    )
}