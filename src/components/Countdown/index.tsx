import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import classes from "./Countdown.module.css";

const Countdown: React.FC<{stopDate: string}> = ({stopDate}) => {
  const future = dayjs(stopDate);
  const [timeLeft, setTimeLeft] = useState("");

  const updateCountdown = () => {
    const diff = future.diff(dayjs());
    setTimeLeft(dayjs.duration(diff).format("mm:ss"));
  };

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className={classes.gradientBackground}>{timeLeft}</p>
    </div>
  );
}

export default Countdown;
