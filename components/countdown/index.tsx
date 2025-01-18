"use client";
import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import "./index.scss";

interface CountdownProps {
  eventDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const eventTime = new Date(eventDate).getTime();
      const distance = eventTime - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div 
        className="container countdown text-center py-5">
      <h2 className="display-4 mb-4">Hafızlık Merasimine kalan süre</h2>
      <div className="row justify-content-center">
        {['Gün', 'Saat', 'Dakika', 'Saniye'].map((unit, index) => (
          <motion.div key={unit} className="col-6 p-2 col-md-2 mx-md-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}>
            <div className="card text-white">
              <div className="card-body">
                <h3 className="card-title">
                  {Object.values(timeLeft)[index].toString().padStart(2, '0')}
                </h3>
                <p className="card-text">{unit}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;