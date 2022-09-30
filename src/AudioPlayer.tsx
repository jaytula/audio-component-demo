import { MouseEventHandler, useEffect, useRef, useState } from "react";
import classes from "./AudioPlayer.module.css";

// Obtain blue color light #3982F7
// Obtain blue color dark #2D68C5
// Play icon as svg
// Pause icon as svg
// On timeupdate, update remaining time

const PlaySVG = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 485 485"
    >
      <g>
        <path
          d="M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5
       s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026
       C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5
       S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z"
        />
        <polygon points="181.062,336.575 343.938,242.5 181.062,148.425 	" />
      </g>
    </svg>
  );
};

const PauseSVG = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 60 60"
    >
      <g>
        <path
          d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
       S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"
        />
        <path d="M33,46h8V14h-8V46z M35,16h4v28h-4V16z" />
        <path d="M19,46h8V14h-8V46z M21,16h4v28h-4V16z" />
      </g>
    </svg>
  );
};

const formatTime = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({ src }: { src: string }) => {
  const audioContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const playSVGClasses = [classes.playButton];
  const pauseSVGClasses = [classes.pauseButton];

  useEffect(() => {
    const audio = audioRef.current;
    const audioContainer = audioContainerRef.current;

    const onLoadedData = () => {
      if (!audio || !audioContainer) return;

      setDuration(audio.duration);
      console.log("adsf");
      audioContainer.style.setProperty("--position", "0");
    };
    const onTimeUpdate = () => {
      const audioContainer = audioContainerRef.current;

      if (!audio || !audioContainer) return;

      setTimeRemaining(Math.ceil(audio.duration - audio.currentTime));
      const percent = audio.currentTime / audio.duration;
      audioContainer.style.setProperty("--position", "" + percent);
    };
    const onPlay = () => {
      setIsPaused(false);
    };
    const onPause = () => {
      setIsPaused(true);
    };

    if (!audio) return;

    audio.addEventListener("loadeddata", onLoadedData);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("loadeddata", onLoadedData);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef]);

  const onPlayPause: MouseEventHandler<HTMLDivElement> = (event) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };
  return (
    <div className={classes.audioContainer} ref={audioContainerRef}>
      <audio src={src} ref={audioRef} />
      <div onClick={onPlayPause}>
        {isPaused ? (
          <PlaySVG className={playSVGClasses.join(" ")} />
        ) : (
          <PauseSVG className={pauseSVGClasses.join(" ")} />
        )}
      </div>
      <div className={classes.timeRemaining}>
        {formatTime(timeRemaining || duration)}
      </div>
    </div>
  );
};

export default AudioPlayer;
