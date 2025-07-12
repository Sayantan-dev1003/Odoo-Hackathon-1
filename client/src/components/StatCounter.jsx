'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMotionValue, animate } from 'framer-motion';

const StatCounter = ({
  from = 0,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const count = useMotionValue(from);
  const [display, setDisplay] = useState(from);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration,
        onUpdate: (latest) => {
          setDisplay(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [inView, count, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

export default StatCounter;
