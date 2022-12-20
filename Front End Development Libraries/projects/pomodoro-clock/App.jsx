import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faArrowDown,
  faArrowUp,
  faArrowsRotate,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const RESET_BREAK = 5;
const RESET_WORK = 25;

const App = () => {
  const [breakTime, setBreakTime] = useState(RESET_BREAK);
  const [workTime, setWorkTime] = useState(RESET_WORK);
  const [label, setLabel] = useState("Work");
  const [duration, setDuration] = useState(workTime * 60);
  const [playing, setPlaying] = useState(false);

  const beepSound = new Audio(
    "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
  );

  const handleFinish = () => {
    const beep = document.getElementById("beep");
    beep.play();

    if (label === "Work") {
      setLabel("Break");
      setDuration(breakTime * 60);
    } else {
      setLabel("Work");
      setDuration(workTime * 60);
    }
  };

  const reset = () => {
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
    setPlaying(false);
    setBreakTime(RESET_BREAK);
    setWorkTime(RESET_WORK);
    setDuration(RESET_WORK * 60);
    setLabel("Work");
  };

  const increment = (workBreak) => {
    if (workBreak === "Work") {
      const num = workTime + 1;
      if (num <= 0 || num > 60) {
        return;
      }
      setWorkTime(num);
      return;
    } else {
      const num = breakTime + 1;
      if (num <= 0 || num > 60) {
        return;
      }
      setBreakTime(num);
      return;
    }
  };

  const decrement = (workBreak) => {
    if (workBreak === "Work") {
      const num = workTime - 1;
      if (num <= 0 || num > 60) {
        return;
      }
      setWorkTime(num);
      return;
    } else {
      const num = breakTime - 1;
      if (num <= 0 || num > 60) {
        return;
      }
      setBreakTime(num);
      return;
    }
  };

  useEffect(() => {
    if (playing) {
      if (duration === 0) return;

      const timerId = setInterval(() => {
        setDuration(duration - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      return;
    }
  }, [duration, playing]);

  useEffect(() => {
    if (duration === 0) {
      handleFinish();
    }
  }, [duration]);

  useEffect(() => {
    if (!playing && label != "Break") {
      setDuration(workTime * 60);
    }
  }, [workTime]);

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <div className="container">
      <audio
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        id="beep"
      ></audio>
      <div id="row">
        <div>25 + 5 Clock</div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-12 fs-3" id={"break-label"}>
              Break Length
            </div>
          </div>
          <div className="row">
            <div className="col-4" id={"break-decrement"}>
              <button
                disabled={playing}
                onClick={() => decrement("Break")}
                type="button"
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
            </div>
            <div className="col-4" id={"break-length"}>
              {breakTime}
            </div>
            <div className="col-4" id={"break-increment"}>
              <button
                disabled={playing}
                onClick={() => increment("Break")}
                type="button"
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-12 fs-3" id={"work-label"}>
              Work Length
            </div>
          </div>
          <div className="row">
            <div className="col-4" id={"work-decrement"}>
              <button
                disabled={playing}
                onClick={() => decrement("Work")}
                type="button"
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
            </div>
            <div className="col-4" id={"work-length"}>
              {workTime}
            </div>
            <div className="col-4" id={"work-increment"}>
              <button
                disabled={playing}
                onClick={() => increment("Work")}
                type="button"
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">{label}</div>
        <div className="col-12">
          <div>
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4" id="start_stop">
          <FontAwesomeIcon icon={faPlay} onClick={() => setPlaying(true)} />
        </div>
        <div className="col-4" id="start_stop">
          <FontAwesomeIcon icon={faPause} onClick={() => setPlaying(false)} />
        </div>
        <div className="col-4" id="reset">
          <FontAwesomeIcon icon={faArrowsRotate} onClick={() => reset()} />
        </div>
      </div>
    </div>
  );
};

export default App;
