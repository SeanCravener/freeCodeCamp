// just a file to make some quick edits before deleting.


const Display = () => {
    return (
        <div>
            <div id='display' className='bg-light'>
            Snare Drum!
            </div>
            <label for="volume" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step='0.02' id="volume" value='volume' onChange={event => setVolume(event.target.value)}></input>
            <div>{volume}</div>
        </div>
    )
}

const Drumpad = ({ label, sound, volume }) => {
    const [playing, setPlaying] = React.useState(false);
    const [duration, setduration] = React.useState(0);
    const classes = classNames("key", playing && "key--playing");
    const ref = React.useRef();
    const handlePlayer = (current) => {
      if (!playing) {
        ref.current.play();
  
        setPlaying(true);
      } else {
        ref.current.pause();
  
        ref.current.currentTime = 0;
        setPlaying(false);
      }
    };
    React.useEffect(() => {
      if (ref && ref.current) {
        ref.current.volume = volume / 100;
      }
    }, [volume]);
    return (
      <button
        className={classes}
        onClick={() => handlePlayer(ref)}
      >
        {label}
        <audio src={sound} ref={ref} volume={volume} />
      </button>
    );
  };