"use client";
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ tilThisDate }: { tilThisDate: string }) => {
  const dater = new Date(tilThisDate);

  // Function to calculate the time left
  const calculateTimeLeft = () => {
    const time = dater.getTime() - Date.now();
    let timeLeft: {
      Months?: number;
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
    } = {};

    if (time > 0) {
      // Approximating months as 30.44 days (average considering leap years)
      timeLeft = {
        Months: Math.floor(time / (1000 * 60 * 60 * 24 * 30.44)),
        days: Math.floor((time / (1000 * 60 * 60 * 24)) % 30.44),
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Array to store timer components
  const timerComponents: React.ReactNode[] = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    const key = interval as keyof typeof timeLeft;

    if (timeLeft[key] !== undefined && timeLeft[key] !== 0) {
      timerComponents.push(
        <span className ="font-bold" key={key}>
          {timeLeft[key]}{interval[0]} {""}
        </span>
      );
    }
  });

  // Effect to update the time left every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer
  });

  return (
    <>
      {timerComponents.length ? timerComponents : <span className="font-bold text-red-800">It is Time.</span>}
    </>
  );
};

export default CountdownTimer;