import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countDownSlice } from "../../../redux/reducers/quickTest/countDownSlice";
import { statusCountDownSelector } from "../../../redux/selector/selectors";

const CountDownTimer = () => {
  const [isDeadTime, setIsDeadTime] = useState<boolean>(false);
  const { statusCountDown } = useSelector(statusCountDownSelector);
  const dispatch = useDispatch();

  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef<any>(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(new Date().toISOString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }

    if (hours === 0 && minutes === 0 && seconds === 0) {
      setIsDeadTime(!isDeadTime);
      console.log("Het time");
      dispatch(
        countDownSlice.actions.updateStatusCountDown({
          status: !statusCountDown.status,
        })
      );
    }
  };

  const clearTimer = (e: any) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next

    // setTimer(`00:${quickTest?.time}:00`);
    setTimer(`00:00:10`);

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <div>
      <h1 className="font-bold text-[20px]">Time: {timer}</h1>
      <button onClick={onClickReset}>Reset</button>
    </div>
  );
};

export default CountDownTimer;
