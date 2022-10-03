import { MouseEventHandler, useEffect, useRef, useState } from "react";
import classes from "./AudioPlayer.module.css";
import PauseIcon from "./components/PauseIcon";
import PlayIcon from "./components/PlayIcon";

const formatTime = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({ src }: { src: string }) => {
  const audioContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timelineDotRef = useRef<HTMLDivElement>(null);
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
      audioContainer.style.setProperty("--position", "0");
    };
    const onTimeUpdate = () => {
      const audioContainer = audioContainerRef.current;
      const timelineDot = timelineDotRef.current;

      if (!audio || !audioContainer || !timelineDot) return;

      setTimeRemaining(Math.ceil(audio.duration - audio.currentTime));
      const percent = audio.currentTime / audio.duration;
      audioContainer.style.setProperty("--position", "" + percent);
      timelineDot.style.setProperty("--position", "" + percent)
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
          <PlayIcon className={playSVGClasses.join(" ")} />
        ) : (
          <PauseIcon className={pauseSVGClasses.join(" ")} />
        )}
      </div>
      <div className={classes.timelineContainer}>
        <div className={classes.timeline}></div>
        <div className={classes.timelineDot} ref={timelineDotRef} />
      </div>
      <div className={classes.timeRemaining}>
        {formatTime(timeRemaining || duration)}
      </div>
    </div>
  );
};

export default AudioPlayer;
